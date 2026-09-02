export type PaginationItem = number | "...";

export const getPaginationRange = (currentPage: number, totalPages: number, neighbors: number): PaginationItem[] => {
  const minPagesToShow = 2 * neighbors + 5;

  if (totalPages <= minPagesToShow) {
    const allPages: PaginationItem[] = [];
    for (let page = 1; page <= totalPages; page++) {
      allPages.push(page);
    }
    return allPages;
  }

  const isVisible = (page: number) => {
    if (page === 1 || page === totalPages) return true;
    if (page >= currentPage - neighbors && page <= currentPage + neighbors) return true;
    return false;
  };

  const result: PaginationItem[] = [];
  let lastPageWasHidden = false;

  for (let page = 1; page <= totalPages; page++) {
    if (isVisible(page)) {
      result.push(page);
      lastPageWasHidden = false;
    } else if (!lastPageWasHidden) {
      result.push("...");
      lastPageWasHidden = true;
    }
  }

  return result;
};