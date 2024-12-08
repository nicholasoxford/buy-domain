"use client";

import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Search,
  ArrowUpDown,
  ChevronDown,
  ExternalLink,
  ShoppingCart,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/utils/format";
import Link from "next/link";

export type Column<T> = {
  header: string;
  accessorKey: keyof T;
  cellType?: "link" | "status" | "number" | "currency" | "default" | "custom";
  sortable?: boolean;
  className?: string;
  render?: (row: T) => React.ReactNode;
};

interface AdminTableProps<T> {
  data: T[];
  columns: Column<T>[];
  searchable?: boolean;
  searchPlaceholder?: string;
  onSearch?: (query: string) => void;
  isLoading?: boolean;
  className?: string;
  emptyState?: React.ReactNode;

  onSort?: (column: keyof T, direction: "asc" | "desc") => void;
  actionLink?: {
    href: (row: T) => string;
    label: string;
    icon?: React.ReactNode;
  };
  buyButton?: {
    href: (row: T) => string;
    label: string;
    icon?: React.ReactNode;
  };
}

export function AdminTable<T extends Record<string, any>>({
  data,
  columns,
  searchable = false,
  searchPlaceholder = "Search...",
  onSearch,
  isLoading = false,
  className,

  onSort,
  emptyState,
  actionLink,
  buyButton,
}: AdminTableProps<T>) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [sortConfig, setSortConfig] = React.useState<{
    key: keyof T | null;
    direction: "asc" | "desc";
  }>({ key: null, direction: "asc" });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch?.(query);
  };

  const handleSort = (column: keyof T) => {
    if (!onSort) return;

    const newDirection =
      sortConfig.key === column && sortConfig.direction === "asc"
        ? "desc"
        : "asc";
    setSortConfig({ key: column, direction: newDirection });
    onSort(column, newDirection);
  };

  const renderCell = (row: T, column: Column<T>) => {
    const value = row[column.accessorKey];

    if (column.cellType === "custom" && column.render) {
      return column.render(row);
    }

    // Handle arrays (like offers)
    if (Array.isArray(value)) {
      return value.length;
    }

    switch (column.cellType) {
      case "link":
        return (
          <a
            href={`https://${value}`}
            className="text-purple-400 hover:text-purple-300 flex items-center gap-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            {value}
            <ExternalLink className="w-4 h-4 opacity-50" />
          </a>
        );
      case "status":
        return (
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              value?.verified
                ? "bg-green-500/10 text-green-400"
                : "bg-yellow-500/10 text-yellow-400"
            }`}
          >
            {value?.verified ? "Verified" : "Unverified"}
          </span>
        );
      case "number":
        return value;
      case "currency":
        return value > 0 ? formatCurrency(value) : "-";
      default:
        // Handle objects and other types
        if (value === null || value === undefined) return "-";
        if (typeof value === "object") return JSON.stringify(value);
        return value.toString();
    }
  };

  if (data.length === 0 && emptyState) {
    return emptyState;
  }

  return (
    <div className={cn("space-y-4", className)}>
      {searchable && (
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={handleSearch}
            className="pl-9 bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      )}

      <div className="rounded-xl border border-slate-700/50 overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-800/80">
            <TableRow>
              {columns.map((column, index) => (
                <TableHead
                  key={index}
                  className={cn(
                    "text-sm text-slate-300 font-medium px-4 py-3",
                    column.className
                  )}
                >
                  <div className="flex items-center space-x-2">
                    <span>{column.header}</span>
                    {column.sortable && onSort && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => handleSort(column.accessorKey)}
                      >
                        <ArrowUpDown className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </TableHead>
              ))}
              {(actionLink || buyButton) && (
                <TableHead className="text-xs text-slate-400 font-medium">
                  Actions
                </TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-slate-700/50">
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (actionLink ? 1 : 0)}
                  className="h-24 text-center"
                >
                  <div className="flex items-center justify-center text-slate-400">
                    Loading...
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              data.map((row, rowIndex) => (
                <TableRow
                  key={rowIndex}
                  className="hover:bg-slate-800/30 transition-colors"
                >
                  {columns.map((column, colIndex) => (
                    <TableCell
                      key={colIndex}
                      className={cn("text-slate-300", column.className)}
                    >
                      {renderCell(row, column)}
                    </TableCell>
                  ))}
                  {(actionLink || buyButton) && (
                    <TableCell className="text-right flex flex-col gap-2 justify-center items-end">
                      {buyButton && (
                        <Link
                          href={buyButton.href(row)}
                          className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-500/10 text-green-400 hover:text-green-300 rounded-md transition-colors"
                        >
                          {buyButton.icon}
                          {buyButton.label}
                        </Link>
                      )}
                      {actionLink && (
                        <Link
                          href={actionLink.href(row)}
                          className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 text-blue-400 hover:text-blue-300 rounded-md transition-colors"
                        >
                          {actionLink.icon}
                          {actionLink.label}
                        </Link>
                      )}
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
