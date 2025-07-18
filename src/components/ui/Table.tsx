import React, { useState } from "react";
import { ChevronUp, ChevronDown, Search } from "lucide-react";

export interface Column<T> {
  key: keyof T | "actions";
  title: string;
  className?: string;
  render?: (value: unknown, row: T) => React.ReactNode;
  sortable?: boolean; // Add optional sortable per column
}

interface ActionButtonProps {
  label: string;
  icon?: React.ElementType;
  onClick: () => void;
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  title?: string;
  searchable?: boolean;
  sortable?: boolean;
  pagination?: boolean;
  pageSize?: number;
  actionButton?: ActionButtonProps | null;
  className?: string;
}

const Table = <T extends object>({
  data = [],
  columns = [],

  searchable = true,
  sortable = true,
  pagination = true,
  pageSize = 10,
  actionButton = null,
  className = "",
}: TableProps<T>) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T | null;
    direction: "asc" | "desc";
  }>({ key: null, direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = data.filter((row) => {
    if (!searchTerm) return true;
    return Object.values(row).some((value: unknown) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortConfig.key) return 0;

    const aValue: unknown = a[sortConfig.key];
    const bValue: unknown = b[sortConfig.key];

    // Handle null/undefined values
    if (aValue == null && bValue == null) return 0;
    if (aValue == null) return sortConfig.direction === "asc" ? -1 : 1;
    if (bValue == null) return sortConfig.direction === "asc" ? 1 : -1;

    // Handle different data types
    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortConfig.direction === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortConfig.direction === "asc" ? aValue - bValue : bValue - aValue;
    }

    // Handle dates
    if (aValue instanceof Date && bValue instanceof Date) {
      return sortConfig.direction === "asc"
        ? aValue.getTime() - bValue.getTime()
        : bValue.getTime() - aValue.getTime();
    }

    // Fallback to string comparison
    const aStr = String(aValue);
    const bStr = String(bValue);

    if (aStr < bStr) return sortConfig.direction === "asc" ? -1 : 1;
    if (aStr > bStr) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const totalPages = Math.ceil(sortedData.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = pagination
    ? sortedData.slice(startIndex, startIndex + pageSize)
    : sortedData;

  const handleSort = (key: keyof T, column: Column<T>) => {
    if (!sortable || column.sortable === false) return;
    if (key === "actions") return; // Don't sort actions column

    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const getSortIcon = (key: keyof T, column: Column<T>) => {
    if (
      !sortable ||
      column.sortable === false ||
      sortConfig.key !== key ||
      key === "actions"
    ) {
      return null;
    }
    return sortConfig.direction === "asc" ? (
      <ChevronUp className="w-4 h-4 inline ml-1" />
    ) : (
      <ChevronDown className="w-4 h-4 inline ml-1" />
    );
  };

  const renderCell = (row: T, column: Column<T>) => {
    if (column.key === "actions") {
      return column.render ? column.render(null, row) : null;
    }

    const value = row[column.key as keyof T];
    return column.render ? column.render(value, row) : String(value ?? "");
  };

  // Reset to first page when search term changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  return (
    <div className={`bg-white ${className}`}>
      <div className="flex items-center justify-between mb-6">
        {actionButton && (
          <button
            onClick={actionButton.onClick}
            className="flex items-center gap-2 px-4 py-2 bg-sky-600 hover:bg-sky-700 rounded-lg font-medium text-white transition-colors"
          >
            {actionButton.icon && <actionButton.icon className="w-4 h-4" />}
            {actionButton.label}
          </button>
        )}
      </div>

      {searchable && (
        <div className="mb-4">
          <div className="relative max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-600 focus:border-transparent outline-none"
            />
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  onClick={() => handleSort(column.key as keyof T, column)}
                  className={`px-6 py-3 text-left text-sm font-medium text-slate-500 uppercase tracking-wider ${
                    sortable &&
                    column.sortable !== false &&
                    column.key !== "actions"
                      ? "cursor-pointer hover:bg-slate-100"
                      : ""
                  }`}
                >
                  <div className="flex items-center">
                    {column.title}
                    {getSortIcon(column.key as keyof T, column)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {paginatedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-8 text-center text-slate-500"
                >
                  No data available
                </td>
              </tr>
            ) : (
              paginatedData.map((row, index) => (
                <tr
                  key={String((row as Record<string, unknown>).id) || index}
                  className="hover:bg-slate-50 transition-colors"
                >
                  {columns.map((column) => (
                    <td
                      key={String(column.key)}
                      className={`px-6 py-4 text-sm ${column.className || ""}`}
                    >
                      {renderCell(row, column)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {pagination && totalPages > 1 && (
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-slate-500">
            Showing {startIndex + 1} to{" "}
            {Math.min(startIndex + pageSize, sortedData.length)} of{" "}
            {sortedData.length} results
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 text-sm bg-white border border-slate-300 text-slate-500 rounded hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 text-sm rounded ${
                  currentPage === page
                    ? "bg-primary-600 text-white"
                    : "bg-white border border-slate-300 text-slate-500 hover:bg-slate-50"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-3 py-1 text-sm bg-white border border-slate-300 text-slate-500 rounded hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
