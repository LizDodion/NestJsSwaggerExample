import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";
import { ConfigService } from "@api-core/modules/config/config.service";

/**
 * This guard is used to check if the incoming token matches the config token.
 * If the token matches, we allow the incoming request to complete
 */
@Injectable()
export class RestrictedByAdminToken implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const configToken = this.configService.variable.ELINKS_ADMIN_TOKEN;

    if (context.getType() === "http") {
      return this.authorizeHttpRequest(configToken, context);
    }

    return false;
  }

  private authorizeHttpRequest(
    configToken: string,
    context: ExecutionContext
  ): boolean {
    const httpContext = context.switchToHttp();
    const { adminToken } = httpContext.getRequest().query;

    if (configToken !== adminToken) {
      throw new UnauthorizedException("Token is invalid");
    }

    return true;
  }
}
