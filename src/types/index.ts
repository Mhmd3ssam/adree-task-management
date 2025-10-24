export type TaskStatus = "New" | "Active" | "Closed"
export type TaskCategory = "Dev" | "Test" | "UI" | "Db"

export interface Task {
  id: string
  title: string
  description: string
  assignedTo: string
  dueDate: string
  estimatedHours: number
  category: TaskCategory
  status: TaskStatus
  createdAt: string
}

export interface TaskFormData {
  title: string
  description: string
  assignedTo: string
  dueDate: string
  estimatedHours: number
  category: TaskCategory
  status: TaskStatus
}

export interface ValidationError {
  field: string
  message: string
}
