/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import Loading from './Loading';
import useBreakpoint from '@/hooks/useBreakpoint';

export interface Column<T> {
  key: keyof T | string;
  label: string;
  render?: (value: any, row: T) => React.ReactNode;
  tdClassName?: string;
}

interface PaginatedTableProps<T> {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PaginatedTable = <T,>({
  columns,
  data,
  loading,
  currentPage,
  totalPages,
  onPageChange,
}: PaginatedTableProps<T>) => {
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === 'mobile';

  const getVisiblePages = (): (number | string)[] => {
    const pages: (number | string)[] = [];

    if (totalPages <= 3) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }

    if (totalPages <= 4) {
      if (currentPage <= 2) pages.push(1, 2, 3, '...', totalPages);
      else if (currentPage === totalPages)
        pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
      else pages.push(1, '...', currentPage, '...', totalPages);
      return [...new Set(pages)];
    }

    const left = Math.max(2, currentPage - 1);
    const right = Math.min(totalPages - 1, currentPage + 1);

    pages.push(1);
    if (left > 2) pages.push('...');
    for (let i = left; i <= right; i++) pages.push(i);
    if (right < totalPages - 1) pages.push('...');
    pages.push(totalPages);

    return pages;
  };

  return (
    <div className="space-y-4 w-full">
      {loading ? (
        <Loading isVisible />
      ) : (
        <div className="w-full">
          <div className="w-full border md:border-0 overflow-x-auto">
            <div className="min-w-[1100px] md:min-w-[700px]">
              <table className="table-auto w-full border-collapse border border-gray-300">
                <thead className="bg-gray-100">
                  <tr>
                    {columns.map((col, i) => (
                      <th key={i} className="border text-center px-4 py-2">
                        {col.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      {columns.map((col, j) => (
                        <td
                          key={j}
                          className={`border px-4 py-2 ${
                            col.tdClassName ?? ''
                          }`}
                        >
                          {col.render
                            ? col.render((row as any)[col.key], row)
                            : (row as any)[col.key]}
                        </td>
                      ))}
                    </tr>
                  ))}
                  {data.length === 0 && (
                    <tr>
                      <td colSpan={columns.length} className="text-center py-4">
                        Tidak ada data.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex justify-center items-center space-x-2 mt-4">
            {isMobile ? null : (
              <button
                onClick={() => onPageChange(1)}
                disabled={currentPage === 1}
                className="px-3 py-1 border rounded bg-white disabled:opacity-50 shadow-md"
              >
                First
              </button>
            )}
            {isMobile ? null : (
              <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 border rounded bg-white disabled:opacity-50 shadow-md"
              >
                Prev
              </button>
            )}

            {getVisiblePages().map((page, index) =>
              typeof page === 'number' ? (
                <button
                  key={index}
                  onClick={() => onPageChange(page)}
                  className={`px-3 py-1 border rounded shadow-md ${
                    currentPage === page ? 'bg-blue-500 text-white' : 'bg-white'
                  }`}
                >
                  {page}
                </button>
              ) : (
                <span
                  key={index}
                  className="px-3 py-1 text-gray-500 select-none"
                >
                  ...
                </span>
              )
            )}
            {isMobile ? (
              false
            ) : (
              <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border rounded bg-white disabled:opacity-50 shadow-md"
              >
                Next
              </button>
            )}
            {isMobile ? (
              false
            ) : (
              <button
                onClick={() => onPageChange(totalPages)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border rounded bg-white disabled:opacity-50 shadow-md"
              >
                Last
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PaginatedTable;
