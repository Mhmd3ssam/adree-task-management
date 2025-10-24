import { validateTaskForm, hasErrors } from "@/lib/validation"
import type { TaskFormData } from "@/lib/types"

describe("validateTaskForm", () => {
  describe("title validation", () => {
    it("should return error if title is empty", () => {
      const data: TaskFormData = {
        title: "",
        description: "",
        status: "todo",
        priority: "medium",
      }
      const errors = validateTaskForm(data)
      expect(errors.title).toBe("Title is required")
    })

    it("should return error if title is less than 3 characters", () => {
      const data: TaskFormData = {
        title: "ab",
        description: "",
        status: "todo",
        priority: "medium",
      }
      const errors = validateTaskForm(data)
      expect(errors.title).toBe("Title must be at least 3 characters")
    })

    it("should return error if title exceeds 100 characters", () => {
      const data: TaskFormData = {
        title: "a".repeat(101),
        description: "",
        status: "todo",
        priority: "medium",
      }
      const errors = validateTaskForm(data)
      expect(errors.title).toBe("Title must not exceed 100 characters")
    })

    it("should pass validation with valid title", () => {
      const data: TaskFormData = {
        title: "Valid Task Title",
        description: "",
        status: "todo",
        priority: "medium",
      }
      const errors = validateTaskForm(data)
      expect(errors.title).toBeUndefined()
    })
  })

  describe("description validation", () => {
    it("should return error if description exceeds 500 characters", () => {
      const data: TaskFormData = {
        title: "Valid Title",
        description: "a".repeat(501),
        status: "todo",
        priority: "medium",
      }
      const errors = validateTaskForm(data)
      expect(errors.description).toBe("Description must not exceed 500 characters")
    })

    it("should pass validation with valid description", () => {
      const data: TaskFormData = {
        title: "Valid Title",
        description: "This is a valid description",
        status: "todo",
        priority: "medium",
      }
      const errors = validateTaskForm(data)
      expect(errors.description).toBeUndefined()
    })
  })

  describe("dueDate validation", () => {
    it("should return error if due date is in the past", () => {
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      const data: TaskFormData = {
        title: "Valid Title",
        description: "",
        status: "todo",
        priority: "medium",
        dueDate: yesterday.toISOString().split("T")[0],
      }
      const errors = validateTaskForm(data)
      expect(errors.dueDate).toBe("Due date cannot be in the past")
    })

    it("should pass validation with future due date", () => {
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      const data: TaskFormData = {
        title: "Valid Title",
        description: "",
        status: "todo",
        priority: "medium",
        dueDate: tomorrow.toISOString().split("T")[0],
      }
      const errors = validateTaskForm(data)
      expect(errors.dueDate).toBeUndefined()
    })
  })

  describe("hasErrors", () => {
    it("should return true if there are errors", () => {
      const errors = { title: "Title is required" }
      expect(hasErrors(errors)).toBe(true)
    })

    it("should return false if there are no errors", () => {
      const errors = {}
      expect(hasErrors(errors)).toBe(false)
    })
  })
})
