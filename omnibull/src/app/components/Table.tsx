"use client";

import React, { useState } from "react";
import clsx from "clsx";

type Column<T> = {
  key: keyof T;
  label: string;
  render?: (value: any, row: T) => React.ReactNode;
  align?: "left" | "right" | "center";
};

type TableProps<T> = {
  columns: Column<T>[];
  data: T[];
  className?: string;
  emptyText?: string;
  rowsPerPage?: number;
};

export default function Table<T>({
  columns,
  data,
  className = "",
  emptyText = "No data found",
  rowsPerPage = 10,
}: TableProps<T>) {
  const [page, setPage] = useState(0);

  const totalPages = Math.ceil(data.length / rowsPerPage);
  const paginatedData = data.slice(page * rowsPerPage, (page + 1) * rowsPerPage);

  const nextPage = () => setPage((p) => Math.min(p + 1, totalPages - 1));
  const prevPage = () => setPage((p) => Math.max(p - 1, 0));

  return (
    <div className={clsx("overflow-x-auto rounded-xl bg-[#0D111C] border border-[#1A1F2E]", className)}>
      <table className="min-w-full text-sm text-white font-medium">
        <thead>
          <tr className="bg-[#151A28] text-[#9CA3AF] uppercase text-xs tracking-wider">
            {columns.map((col, index) => (
              <th
                key={index}
                className={clsx(
                  "px-4 py-3 whitespace-nowrap",
                  col.align === "right" ? "text-right" : "text-left"
                )}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-6 text-center text-gray-500">
                {emptyText}
              </td>
            </tr>
          ) : (
            paginatedData.map((row, idx) => (
              <tr
                key={idx}
                className="border-t border-[#1F2937] hover:bg-[#1B2332] transition-colors"
              >
                {columns.map((col, index) => (
                  <td
                    key={index}
                    className={clsx(
                      "px-4 py-3 whitespace-nowrap",
                      col.align === "right" ? "text-right" : "text-left",
                      "text-white font-medium"
                    )}
                  >
                    {col.render ? col.render(row[col.key], row) : String(row[col.key])}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-3 bg-[#0D111C] text-sm border-t border-[#1A1F2E]">
          <button
            onClick={prevPage}
            disabled={page === 0}
            className="text-gray-400 hover:text-white disabled:opacity-50 hover:cursor-pointer"
          >
            ⬅ Prev
          </button>
          <span className="text-gray-400">
            Page {page + 1} of {totalPages}
          </span>
          <button
            onClick={nextPage}
            disabled={page + 1 >= totalPages}
            className="text-gray-400 hover:text-white disabled:opacity-50 hover:cursor-pointer"
          >
            Next ➡
          </button>
        </div>
      )}
    </div>
  );
}
