"use client"

import { type ReactNode } from "react"
import Card from "./Card"

export interface Column<T> {
  header: string
  accessor: keyof T | ((item: T) => ReactNode)
  width?: string
  className?: string
}

interface TableProps<T> {
  data: T[]
  columns: Column<T>[]
  mobileCardContent?: (item: T) => ReactNode
  className?: string
}

export default function Table<T extends { id: string }>({ 
  data, 
  columns,
  mobileCardContent,
  className = ""
}: TableProps<T>) {
  return (
    <Card className={className}>
      {/* Desktop view */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[var(--border)]">
              {columns.map((column, index) => (
                <th
                  key={index}
                  className={`text-left py-3 px-4 font-semibold text-[var(--text-primary)] ${column.width || ""} ${
                    column.className || ""
                  }`}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="border-b border-[var(--border)] hover:bg-[var(--surface)]">
                {columns.map((column, index) => (
                  <td
                    key={index}
                    className={`py-3 px-4 ${column.className || ""}`}
                  >
                    {typeof column.accessor === "function"
                      ? column.accessor(item)
                      : (item[column.accessor] as ReactNode)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile view */}
      {mobileCardContent && (
        <div className="md:hidden space-y-4">
          {data.map((item) => mobileCardContent(item))}
        </div>
      )}
    </Card>
  )
}
