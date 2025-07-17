import * as React from "react"
import { cn } from "@/lib/utils"

export interface Column<T> {
  key: keyof T
  title: string
  render?: (value: T[keyof T], row: T) => React.ReactNode
  sortable?: boolean
  className?: string
}

export interface DataTableProps<T> extends React.HTMLAttributes<HTMLDivElement> {
  data: T[]
  columns: Column<T>[]
  loading?: boolean
  emptyMessage?: string
  onRowClick?: (row: T) => void
}

function DataTable<T extends Record<string, any>>({
  data,
  columns,
  loading = false,
  emptyMessage = "No data available",
  onRowClick,
  className,
  ...props
}: DataTableProps<T>) {
  const [sortConfig, setSortConfig] = React.useState<{
    key: keyof T | null
    direction: "asc" | "desc"
  }>({ key: null, direction: "asc" })

  const sortedData = React.useMemo(() => {
    if (!sortConfig.key) return data

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key!]
      const bValue = b[sortConfig.key!]

      if (aValue < bValue) {
        return sortConfig.direction === "asc" ? -1 : 1
      }
      if (aValue > bValue) {
        return sortConfig.direction === "asc" ? 1 : -1
      }
      return 0
    })
  }, [data, sortConfig])

  const handleSort = (key: keyof T) => {
    setSortConfig(current => ({
      key,
      direction: current.key === key && current.direction === "asc" ? "desc" : "asc",
    }))
  }

  if (loading) {
    return (
      <div className={cn("rounded-md border", className)} {...props}>
        <div className="p-8 text-center">
          <div className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          <p className="mt-2 text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div className={cn("rounded-md border", className)} {...props}>
        <div className="p-8 text-center">
          <p className="text-sm text-muted-foreground">{emptyMessage}</p>
        </div>
      </div>
    )
  }

  return (
    <div className={cn("rounded-md border", className)} {...props}>
      <table className="w-full">
        <thead>
          <tr className="border-b bg-muted/50">
            {columns.map(column => (
              <th
                key={String(column.key)}
                className={cn(
                  "px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground",
                  column.sortable && "cursor-pointer hover:text-foreground",
                  column.className
                )}
                onClick={() => column.sortable && handleSort(column.key)}
              >
                <div className="flex items-center space-x-1">
                  <span>{column.title}</span>
                  {column.sortable && sortConfig.key === column.key && (
                    <span className="text-xs">
                      {sortConfig.direction === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, index) => (
            <tr
              key={index}
              className={cn(
                "border-b transition-colors hover:bg-muted/50",
                onRowClick && "cursor-pointer"
              )}
              onClick={() => onRowClick?.(row)}
            >
              {columns.map(column => (
                <td key={String(column.key)} className="px-4 py-3">
                  {column.render ? column.render(row[column.key], row) : String(row[column.key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export { DataTable }