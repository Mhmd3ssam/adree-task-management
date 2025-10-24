import type { Task, TaskStatus, TaskCategory } from "../types"

export function getStatusColor(status: TaskStatus): string {
  const colors: Record<TaskStatus, string> = {
    New: "bg-blue-100 text-blue-800",
    Active: "bg-yellow-100 text-yellow-800",
    Closed: "bg-green-100 text-green-800",
  }
  return colors[status]
}

export function getCategoryColor(category: TaskCategory): string {
  const colors: Record<TaskCategory, string> = {
    Dev: "bg-purple-100 text-purple-800",
    Test: "bg-pink-100 text-pink-800",
    UI: "bg-indigo-100 text-indigo-800",
    Db: "bg-orange-100 text-orange-800",
  }
  return colors[category]
}

export function getTaskStats(tasks: Task[]) {
  return {
    total: tasks.length,
    active: tasks.filter((t) => t.status === "Active").length,
    completed: tasks.filter((t) => t.status === "Closed").length,
    new: tasks.filter((t) => t.status === "New").length,
    byCategory: {
      Dev: tasks.filter((t) => t.category === "Dev").length,
      Test: tasks.filter((t) => t.category === "Test").length,
      UI: tasks.filter((t) => t.category === "UI").length,
      Db: tasks.filter((t) => t.category === "Db").length,
    },
    byStatus: {
      New: tasks.filter((t) => t.status === "New").length,
      Active: tasks.filter((t) => t.status === "Active").length,
      Closed: tasks.filter((t) => t.status === "Closed").length,
    },
    totalHours: tasks.reduce((sum, t) => sum + t.estimatedHours, 0),
  }
}
