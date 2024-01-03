import { Prisma } from '@api-core/generated/prisma-client';
import { PaginatedInput } from '../../common/dto/paginated.input';

export async function findAllPaginated<Model, Result>(
  this: Model,
  { offset, limit }: PaginatedInput,
  options?: Prisma.Args<Model, 'findMany'>,
): Promise<{
  entities: Result[];
  totalEntities: number;
  page: number;
  totalPages: number;
}> {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const _model: any = this;

  const skip = offset || 0;
  const take = limit || 10;

  const [entities, totalEntities] = await Promise.all([
    _model.findMany({
      ...options,
      skip,
      take,
    }),
    _model.count(),
  ]);

  const page: number =
    totalEntities && skip ? Math.ceil(skip / totalEntities) : 0;
  const totalPages: number = totalEntities
    ? Math.ceil(totalEntities / take)
    : 0;

  const entityResult = entities as Result[];

  return { entities: entityResult, totalEntities, page, totalPages };
}
