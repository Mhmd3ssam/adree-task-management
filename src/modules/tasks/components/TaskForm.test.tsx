import { describe, it, expect } from "vitest"
import { validateTaskForm } from "../../../utils/validation"

describe("Task Form Validation", () => {
  it("should validate required fields", () => {
    const errors = validateTaskForm({
      title: "",
      description: "",
      assignedTo: "",
      dueDate: "",
      estimatedHours: 0,
      category: "Dev",
      status: "New",
    })

    expect(errors.length).toBeGreaterThan(0)
  })

  it("should validate title length", () => {
    const errors = validateTaskForm({
      title: "ab",
      description: "Valid description",
      assignedTo: "John",
      dueDate: "2024-01-15",
      estimatedHours: 5,
      category: "Dev",
      status: "New",
    })

    expect(errors.some((e) => e.field === "title")).toBe(true)
  })

  it("should pass validation with valid data", () => {
    const errors = validateTaskForm({
      title: "Valid Task",
      description: "Valid description",
      assignedTo: "John",
      dueDate: "2024-01-15",
      estimatedHours: 5,
      category: "Dev",
      status: "New",
    })

    expect(errors.length).toBe(0)
  })
})
