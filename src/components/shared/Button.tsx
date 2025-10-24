"use client"

import type { ReactNode } from "react"

interface ButtonProps {
  children: ReactNode
  onClick?: () => void
  variant?: "primary" | "secondary" | "danger"
  size?: "sm" | "md" | "lg"
  disabled?: boolean
  type?: "button" | "submit" | "reset"
  className?: string
}

export default function Button({
  children,
  onClick,
  variant = "primary",
  size = "md",
  disabled = false,
  type = "button",
  className = "",
}: ButtonProps) {
  const baseStyles = "font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"

  const variants = {
    primary: "bg-[var(--primary)] text-white hover:bg-[var(--primary-dark)]",
    secondary: "bg-[var(--surface)] text-[var(--text-primary)] border border-[var(--border)] hover:bg-[var(--border)]",
    danger: "bg-[var(--danger)] text-white hover:bg-red-600",
  }

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  )
}
