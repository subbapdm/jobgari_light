export interface ApiResponse<T = unknown> {
   success?: boolean;
   message?: string;
   data: T;
   pagination?: Pagination;
   error?: string;
}

export interface Pagination {
   total: number;
   page: number;
   limit: number;
   totalPages: number;
   hasNext: boolean;
   hasPrev: boolean;
}