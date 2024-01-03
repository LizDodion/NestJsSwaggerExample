import { Expose } from "class-transformer";

/*
 * A shared Paginated Response DTO
 * This provides an extensible set of params for a paginated list response
 */

export class PaginatedResponse {
  @Expose()
  totalItems: number;

  @Expose()
  page: number;

  @Expose()
  totalPages: number;
}
