interface BadgeProps {
  children: string
  variant?: "default" | "success" | "warning" | "danger"
}

export default function Badge({ children, variant = "default" }: BadgeProps) {
  const variants = {
    default: "bg-blue-100 text-blue-800",
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    danger: "bg-red-100 text-red-800",
  }

  return (
    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${variants[variant]}`}>{children}</span>
  )
}
