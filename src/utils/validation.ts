import type { TaskFormData, ValidationError } from "../types"

export function validateTaskForm(data: TaskFormData): ValidationError[] {
  const errors: ValidationError[] = []

  if (!data.title.trim()) {
    errors.push({ field: "title", message: "Title is required" })
  } else if (data.title.length < 3) {
    errors.push({ field: "title", message: "Title must be at least 3 characters" })
  }

  if (!data.description.trim()) {
    errors.push({ field: "description", message: "Description is required" })
  }

  if (!data.assignedTo.trim()) {
    errors.push({ field: "assignedTo", message: "Assigned to is required" })
  }

  if (!data.dueDate) {
    errors.push({ field: "dueDate", message: "Due date is required" })
  }

  if (data.estimatedHours <= 0) {
    errors.push({ field: "estimatedHours", message: "Estimated hours must be greater than 0" })
  }

  return errors
}
