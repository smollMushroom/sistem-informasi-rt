export interface PaginationMeta {
  totalPages: number;
  totalItems: number;
  currentPage: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationMeta;
}