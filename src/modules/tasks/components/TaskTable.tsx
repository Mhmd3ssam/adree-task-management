"use client"

import { useDispatch } from "react-redux"
import type { AppDispatch } from "../../../store"
import { deleteTask } from "../../../store/slices/tasksSlice"
import type { Task } from "../../../types"
import { getStatusColor, getCategoryColor } from "../../../utils/helpers"
import { Edit2, Trash2 } from "lucide-react"
import Table, { type Column } from "../../../components/shared/Table"
import TaskMobileCard from "./TaskMobileCard"

interface TaskTableProps {
  tasks: Task[]
  onEdit: (taskId: string) => void
  onShowToast: (message: string, type: "success" | "error") => void
}

export default function TaskTable({ tasks, onEdit, onShowToast }: TaskTableProps) {
  const dispatch = useDispatch<AppDispatch>()

  const handleDelete = (taskId: string) => {
    if (confirm("Are you sure you want to delete this task?")) {
      dispatch(deleteTask(taskId))
      onShowToast("Task deleted successfully", "success")
    }
  }

  const columns: Column<Task>[] = [
    { 
      header: "Title", 
      accessor: "title",
      className: "text-[var(--text-primary)]"
    },
    { 
      header: "Assigned To", 
      accessor: "assignedTo",
      className: "text-[var(--text-secondary)]"
    },
    { 
      header: "Category", 
      accessor: (task: Task) => (
        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(task.category)}`}>
          {task.category}
        </span>
      )
    },
    { 
      header: "Status", 
      accessor: (task: Task) => (
        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(task.status)}`}>
          {task.status}
        </span>
      )
    },
    { 
      header: "Due Date", 
      accessor: "dueDate",
      className: "text-[var(--text-secondary)]"
    },
    { 
      header: "Hours", 
      accessor: (task: Task) => `${task.estimatedHours}h`,
      className: "text-[var(--text-secondary)]"
    },
    { 
      header: "Actions", 
      accessor: (task: Task) => (
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(task.id)}
            className="p-2 text-[var(--primary)] hover:bg-[var(--surface)] rounded-lg transition-colors"
          >
            <Edit2 size={18} />
          </button>
          <button
            onClick={() => handleDelete(task.id)}
            className="p-2 text-[var(--danger)] hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 size={18} />
          </button>
        </div>
      )
    }
  ]

  const renderMobileCard = (task: Task) => (
    <TaskMobileCard
      key={task.id}
      task={task}
      onEdit={onEdit}
      onDelete={handleDelete}
    />
  )

  return (
    <Table
      data={tasks}
      columns={columns}
      mobileCardContent={renderMobileCard}
    />
  )
}
