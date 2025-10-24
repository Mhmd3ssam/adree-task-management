import { Menu } from "lucide-react"

interface HeaderProps {
  onMenuClick: () => void
}

export default function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="bg-[var(--surface)] border-b border-[var(--border)] px-4 sm:px-6 md:px-8 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="md:hidden p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          >
            <Menu size={24} />
          </button>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-[var(--primary)] flex items-center justify-center text-white font-semibold">
            AD
          </div>
        </div>
      </div>
    </header>
  )
}
