import { Link, useLocation } from "react-router-dom"
import { LayoutDashboard, CheckSquare, X } from "lucide-react"

interface SidebarProps {
  isOpen?: boolean
  onClose?: () => void
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

  return (
    <aside className={`fixed md:static inset-y-0 left-0 w-64 bg-[var(--surface)] border-r border-[var(--border)] p-6 transform transition-transform duration-200 ease-in-out ${
      isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
    } z-30`}>
      {isOpen && (
        <button
          onClick={onClose}
          className="md:hidden absolute top-4 right-4 p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
        >
          <X size={20} />
        </button>
      )}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[var(--primary)]">Adree</h1>
        <p className="text-sm text-[var(--text-secondary)] mt-1">Project Management</p>
      </div>

      <nav className="space-y-2">
        <Link
          to="/dashboard"
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            isActive("/dashboard")
              ? "bg-[var(--primary)] text-white"
              : "text-[var(--text-secondary)] hover:bg-[var(--border)]"
          }`}
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </Link>

        <Link
          to="/tasks"
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            isActive("/tasks")
              ? "bg-[var(--primary)] text-white"
              : "text-[var(--text-secondary)] hover:bg-[var(--border)]"
          }`}
        >
          <CheckSquare size={20} />
          <span>Tasks</span>
        </Link>
      </nav>
    </aside>
  )
}
