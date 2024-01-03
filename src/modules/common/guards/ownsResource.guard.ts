import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  MethodNotAllowedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request } from "express";
import { PrismaResource, ResourceType } from "../utils/resourceType.utils";
import { PrismaService } from "@api-core/modules/prisma/prisma.service";

@Injectable()
export class OwnsResourceGuard implements CanActivate {
  constructor(
    private readonly prismaService: PrismaService,
    private reflector: Reflector
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    console.log("request", request);

    const userId = (request as any).user.userId;
    const args = request.body; // Modify this to match the request body structure

    const reflectorResources = this.reflector.get<ResourceType[]>(
      "resources",
      context.getHandler()
    );

    if (!userId) {
      throw new ForbiddenException(
        "You must be authenticated to perform this action"
      );
    }

    if (!reflectorResources || reflectorResources.length === 0) {
      throw new MethodNotAllowedException(
        "You must use the @ResourceType decorator to specify the resource type"
      );
    }

    const resourcePromises = reflectorResources.map(
      async (reflectorResource) => {
        const resourceId = args[reflectorResource.arg];

        const resourceType = PrismaResource[reflectorResource.type].type;
        const search = {
          where: {
            id: resourceId,
          },
          include: PrismaResource[reflectorResource.type].include,
        };

        const resource = await this.prismaService[resourceType].findUnique(
          search
        );

        return resource;
      }
    );

    try {
      const resources = await Promise.all(resourcePromises);
      return checkOwnership(resources, userId, 1);
    } catch (error) {
      // Handle errors from individual resource checks, if necessary
      throw error;
    }
  }
}

export const checkOwnership = (
  resources: any[],
  userId: string,
  minResources = 0
): true => {
  const resourcesFound = resources.filter((resource) => !!resource) ?? [];
  const resourcesOwned = resourcesFound.filter((resource) => {
    return (
      (resource.userId ??
        resource.authorId ??
        resource.createdById ??
        resource.fromUserId ??
        resource.id) === userId
    );
  });
  if (resourcesFound.length < minResources) {
    throw new ForbiddenException(
      `These resources do not exist, or resource type and argument are incorrect on the decorator. got ${JSON.stringify(
        resources
      )}`
    );
  }

  if (resourcesOwned.length === 0) {
    throw new ForbiddenException(
      "Only the user who created this resource can perform this action"
    );
  }

  return true;
};
