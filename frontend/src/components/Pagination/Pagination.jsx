import { FaChevronLeft, FaChevronRight } from "@/components/shared/icons";
import css from "./Pagination.module.css";

const Pagination = ({
  currentPage,
  totalPages,
  hasNextPage,
  hasPreviousPage,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className={css.pagination}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!hasPreviousPage}
        className={`${css.pageBtn} ${css.navBtn}`}
        title="Previous page"
      >
        <FaChevronLeft />
      </button>

      {currentPage > 3 && (
        <>
          <button onClick={() => onPageChange(1)} className={css.pageBtn}>
            1
          </button>
          {currentPage > 4 && <span className={css.ellipsis}>...</span>}
        </>
      )}

      {getPageNumbers().map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`${css.pageBtn} ${page === currentPage ? css.active : ""}`}
        >
          {page}
        </button>
      ))}

      {currentPage < totalPages - 2 && (
        <>
          {currentPage < totalPages - 3 && (
            <span className={css.ellipsis}>...</span>
          )}
          <button
            onClick={() => onPageChange(totalPages)}
            className={css.pageBtn}
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasNextPage}
        className={`${css.pageBtn} ${css.navBtn}`}
        title="Next page"
      >
        <FaChevronRight />
      </button>
    </div>
  );
};

export default Pagination;
