"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useSelector, useDispatch } from "react-redux"
import type { RootState, AppDispatch } from "../../../store"
import { addTask, updateTask } from "../../../store/slices/tasksSlice"
import type { Task, TaskFormData } from "../../../types"
import { validateTaskForm } from "../../../utils/validation"
import Button from "../../../components/shared/Button"
import { v4 as uuidv4 } from "uuid"

interface TaskFormProps {
  taskId: string | null
  onClose: () => void
  onShowToast: (message: string, type: "success" | "error") => void
}

export default function TaskForm({ taskId, onClose, onShowToast }: TaskFormProps) {
  const dispatch = useDispatch<AppDispatch>()
  const tasks = useSelector((state: RootState) => state.tasks.items)
  const [formData, setFormData] = useState<TaskFormData>({
    title: "",
    description: "",
    assignedTo: "",
    dueDate: "",
    estimatedHours: 1,
    category: "Dev",
    status: "New",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (taskId) {
      const task = tasks.find((t) => t.id === taskId)
      if (task) {
        setFormData({
          title: task.title,
          description: task.description,
          assignedTo: task.assignedTo,
          dueDate: task.dueDate,
          estimatedHours: task.estimatedHours,
          category: task.category,
          status: task.status,
        })
      }
    }
  }, [taskId, tasks])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "estimatedHours" ? Number.parseFloat(value) : value,
    }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const validationErrors = validateTaskForm(formData)

    if (validationErrors.length > 0) {
      const errorMap = validationErrors.reduce(
        (acc, err) => ({
          ...acc,
          [err.field]: err.message,
        }),
        {},
      )
      setErrors(errorMap)
      return
    }

    if (taskId) {
      const task = tasks.find((t) => t.id === taskId)
      if (task) {
        dispatch(
          updateTask({
            ...task,
            ...formData,
          }),
        )
        onShowToast("Task updated successfully", "success")
      }
    } else {
      const newTask: Task = {
        id: uuidv4(),
        ...formData,
        createdAt: new Date().toISOString().split("T")[0],
      }
      dispatch(addTask(newTask))
      onShowToast("Task created successfully", "success")
    }

    onClose()
  }

  const formVariants = {
    hidden: { 
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { 
      opacity: 0,
      x: -20
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 }
    }
  }

  return (
    <motion.form 
      initial="hidden"
      animate="visible"
      variants={formVariants}
      onSubmit={handleSubmit} 
      className="space-y-4">
      <motion.div variants={itemVariants}>
        <label className="block text-sm font-medium text-[var(--text-primary)] mb-1">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={`w-full px-4 py-3 border rounded-xl bg-[var(--background)] text-[var(--text-primary)] transition-all duration-200 focus:ring-2 focus:ring-primary/20 ${
            errors.title ? "border-[var(--danger)]" : "border-[var(--border)] hover:border-[var(--primary)]"
          }`}
          placeholder="Enter task title"
        />
        {errors.title && <p className="text-[var(--danger)] text-sm mt-1">{errors.title}</p>}
      </motion.div>

      <motion.div variants={itemVariants}>
        <label className="block text-sm font-medium text-[var(--text-primary)] mb-1">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className={`w-full px-4 py-2 border rounded-lg bg-[var(--background)] text-[var(--text-primary)] ${
            errors.description ? "border-[var(--danger)]" : "border-[var(--border)]"
          }`}
          placeholder="Enter task description"
        />
        {errors.description && <p className="text-[var(--danger)] text-sm mt-1">{errors.description}</p>}
      </motion.div>

      <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-4" variants={itemVariants}>
        <motion.div variants={itemVariants}>
          <label className="block text-sm font-medium text-[var(--text-primary)] mb-1">Assigned To</label>
          <input
            type="text"
            name="assignedTo"
            value={formData.assignedTo}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg bg-[var(--background)] text-[var(--text-primary)] ${
              errors.assignedTo ? "border-[var(--danger)]" : "border-[var(--border)]"
            }`}
            placeholder="Team member name"
          />
          {errors.assignedTo && <p className="text-[var(--danger)] text-sm mt-1">{errors.assignedTo}</p>}
        </motion.div>

        <motion.div variants={itemVariants}>
          <label className="block text-sm font-medium text-[var(--text-primary)] mb-1">Due Date</label>
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg bg-[var(--background)] text-[var(--text-primary)] ${
              errors.dueDate ? "border-[var(--danger)]" : "border-[var(--border)]"
            }`}
          />
          {errors.dueDate && <p className="text-[var(--danger)] text-sm mt-1">{errors.dueDate}</p>}
        </motion.div>
      </motion.div>

      <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-4" variants={itemVariants}>
        <motion.div variants={itemVariants}>
          <label className="block text-sm font-medium text-[var(--text-primary)] mb-1">Estimated Hours</label>
          <input
            type="number"
            name="estimatedHours"
            value={formData.estimatedHours}
            onChange={handleChange}
            min="1"
            className={`w-full px-4 py-2 border rounded-lg bg-[var(--background)] text-[var(--text-primary)] ${
              errors.estimatedHours ? "border-[var(--danger)]" : "border-[var(--border)]"
            }`}
          />
          {errors.estimatedHours && <p className="text-[var(--danger)] text-sm mt-1">{errors.estimatedHours}</p>}
        </motion.div>

        <motion.div variants={itemVariants}>
          <label className="block text-sm font-medium text-[var(--text-primary)] mb-1">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-[var(--border)] rounded-lg bg-[var(--background)] text-[var(--text-primary)]"
          >
            <option value="Dev">Dev</option>
            <option value="Test">Test</option>
            <option value="UI">UI</option>
            <option value="Db">Db</option>
          </select>
        </motion.div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <label className="block text-sm font-medium text-[var(--text-primary)] mb-1">Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-[var(--border)] rounded-lg bg-[var(--background)] text-[var(--text-primary)]"
        >
          <option value="New">New</option>
          <option value="Active">Active</option>
          <option value="Closed">Closed</option>
        </select>
      </motion.div>

      <motion.div 
        className="flex gap-3 pt-4" 
        variants={itemVariants}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Button type="submit" variant="primary">
          {taskId ? "Update Task" : "Create Task"}
        </Button>
        <Button type="button" variant="secondary" onClick={onClose}>
          Cancel
        </Button>
      </motion.div>
    </motion.form>
  )
}
