"use client"

import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import type { RootState, AppDispatch } from "../../../store"
import { Plus } from "lucide-react"
import Button from "../../../components/shared/Button"
import Modal from "../../../components/shared/Modal"
import Toast from "../../../components/shared/Toast"
import TaskForm from "../components/TaskForm"
import TaskTable from "../components/TaskTable"

export default function TasksPage() {
  const dispatch = useDispatch<AppDispatch>()
  const tasks = useSelector((state: RootState) => state.tasks.items)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<string | null>(null)
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null)

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingTask(null)
  }

  const handleShowToast = (message: string, type: "success" | "error") => {
    setToast({ message, type })
  }

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[var(--text-primary)]">Tasks Management</h1>
          <p className="text-[var(--text-secondary)] mt-2">Manage and track all your project tasks</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2">
          <Plus size={20} />
          New Task
        </Button>
      </div>

      <TaskTable
        tasks={tasks}
        onEdit={(taskId) => {
          setEditingTask(taskId)
          setIsModalOpen(true)
        }}
        onShowToast={handleShowToast}
      />

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={editingTask ? "Edit Task" : "Create New Task"}>
        <TaskForm taskId={editingTask} onClose={handleCloseModal} onShowToast={handleShowToast} />
      </Modal>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  )
}
