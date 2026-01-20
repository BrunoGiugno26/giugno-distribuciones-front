"use client";
import React from "react";

interface PaginationProps {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  page,
  pageCount,
  onPageChange,
}: PaginationProps) {
  if (pageCount <= 1) return null;

  const goPrev = () => onPageChange(Math.max(1, page - 1));
  const goNext = () => onPageChange(Math.min(pageCount, page + 1));

  const getPages = () => {
    if (pageCount <= 7) {
      return Array.from({ length: pageCount }, (_, i) => i + 1);
    }

    const pages: number[] = [];
    if (page > 4) pages.push(1, -1);
    const start = Math.max(2, page - 2);
    const end = Math.min(pageCount - 1, page + 2);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (page < pageCount - 3) pages.push(-1, pageCount);
    else pages.push(pageCount);

    return pages;
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-10 flex-wrap">
      <button
        disabled={page === 1}
        onClick={goPrev}
        aria-label="Pagina anterior"
        className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50"
      >
        ←
      </button>

      {getPages().map((num, idx) =>
        num === -1 ? (
          <span key={`ellipsis-${idx}`} className="px-2">
            ...
          </span>
        ) : (
          <button
            key={num}
            onClick={() => onPageChange(num)}
            aria-label={`Ir a página ${num}`}
            className={`px-3 py-1 rounded ${
              page === num
                ? "bg-amber-500 text-black dark:bg-sky-600 dark:text-white"
                : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            {num}
          </button>
        ),
      )}

      <button
        disabled={page === pageCount}
        onClick={goNext}
        className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50"
      >
        →
      </button>
    </div>
  );
}
