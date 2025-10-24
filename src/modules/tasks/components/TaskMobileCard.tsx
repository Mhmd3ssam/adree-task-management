"use client"

import { Edit2, Trash2 } from "lucide-react"
import type { Task } from "../../../types"
import { getCategoryColor, getStatusColor } from "../../../utils/helpers"

interface TaskMobileCardProps {
  task: Task
  onEdit: (taskId: string) => void
  onDelete: (taskId: string) => void
}

export default function TaskMobileCard({ task, onEdit, onDelete }: TaskMobileCardProps) {
  return (
    <div className="p-4 border border-[var(--border)] rounded-lg hover:bg-[var(--surface)]">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium text-[var(--text-primary)]">{task.title}</h3>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(task.id)}
            className="p-1.5 text-[var(--primary)] hover:bg-[var(--surface)] rounded-lg transition-colors"
          >
            <Edit2 size={16} />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="p-1.5 text-[var(--danger)] hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-[var(--text-secondary)]">Assigned To:</span>
          <span className="text-[var(--text-primary)]">{task.assignedTo}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-[var(--text-secondary)]">Due Date:</span>
          <span className="text-[var(--text-primary)]">{task.dueDate}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-[var(--text-secondary)]">Hours:</span>
          <span className="text-[var(--text-primary)]">{task.estimatedHours}h</span>
        </div>
        <div className="flex justify-between items-center text-sm pt-2">
          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(task.category)}`}>
            {task.category}
          </span>
          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
            {task.status}
          </span>
        </div>
      </div>
    </div>
  )
}
