/**
 * Util function for returning types for Mutation, Query and Field decorators as well as class validator.
 * Why? So that we aren't writing inline functions in files (e.g. resolvers) and created untested lines in cov. report.
 * @param object Generic Object type (typically a dto class)
 * @returns Same object as provided
 */
export function DecoratorType<T>(object: T) {
  return (): T => object;
}

export const filterChildren = <TParent, TChild>({
  parent,
  offset,
  limit,
  childVariable,
}: {
  parent: TParent;
  offset?: number;
  limit?: number;
  childVariable: keyof TParent;
}): TChild[] => {
  // use our existing parent and filter the children based on offset and limit
  // don't recall the database, but filter our existing data
  const filterLimit = limit ?? 20;
  const filterOffset = offset ?? 0;
  const children = parent[childVariable] as unknown as TChild[];
  // handle limit and offset optional
  // if (!limit && !offset) return children;
  // if (!limit) return children.slice(offset);
  return children.slice(filterOffset, filterOffset + filterLimit);
};
