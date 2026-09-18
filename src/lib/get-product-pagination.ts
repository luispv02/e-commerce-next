interface PaginationParams {
  page?: number;
  limit?: number;
}

export const getPagination = ({ page = 1, limit = 10 }: PaginationParams) => {
  const currentPage = Math.max(page || 1, 1);
  const currentLimit = Math.min(limit || 10, 50);

  return {
    page: currentPage,
    limit: currentLimit,
    skip: (currentPage - 1) * currentLimit,
  };
}