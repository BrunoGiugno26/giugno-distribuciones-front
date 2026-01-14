export type ResponseType = {
    result: unknown | null;
    loading: boolean;
    error: string | null;
}

export type PaginationMeta = {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
};
