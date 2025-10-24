import type { ReactNode } from "react"

interface CardProps {
  children: ReactNode
  className?: string
}

export default function Card({ children, className = "" }: CardProps) {
  return (
    <div className={`bg-[var(--background)] border border-[var(--border)] rounded-lg p-6 ${className}`}>{children}</div>
  )
}
