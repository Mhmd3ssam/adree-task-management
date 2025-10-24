"use client"

import { useState, useEffect } from "react"
import EmojiPicker from "../../../components/shared/EmojiPicker"
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
  const [title, setTitle] = useState("Tasks Management")
  const [description, setDescription] = useState("Manage and track all your project tasks")
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [isEditingDescription, setIsEditingDescription] = useState(false)
  const [emoji, setEmoji] = useState("📋")

  // Update document title whenever title or emoji changes
  useEffect(() => {
    document.title = `${emoji} ${title}`
  }, [title, emoji])

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
          <div className="flex items-center gap-2">
            <EmojiPicker
              currentEmoji={emoji}
              onEmojiSelect={setEmoji}
            />
            <div className="relative flex-1">
              {isEditingTitle ? (
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  onBlur={() => setIsEditingTitle(false)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      setIsEditingTitle(false)
                    }
                  }}
                  autoFocus
                  className="w-full bg-transparent border-none text-3xl font-bold text-[var(--text-primary)] focus:outline-none hover:bg-[var(--surface)] focus:bg-[var(--surface)] rounded px-2 py-1 -mx-2"
                />
              ) : (
                <h1 
                  onClick={() => setIsEditingTitle(true)}
                  className="text-3xl font-bold text-[var(--text-primary)] cursor-text px-2 py-1 -mx-2 rounded hover:bg-[var(--surface)] transition-colors"
                >
                  {title}
                </h1>
              )}
            </div>
          </div>
          <div className="relative mt-2">
            {isEditingDescription ? (
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                onBlur={() => setIsEditingDescription(false)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setIsEditingDescription(false)
                  }
                }}
                autoFocus
                className="w-full bg-transparent border-none text-[var(--text-secondary)] focus:outline-none hover:bg-[var(--surface)] focus:bg-[var(--surface)] rounded px-2 py-1 -mx-2"
              />
            ) : (
              <p 
                onClick={() => setIsEditingDescription(true)}
                className="text-[var(--text-secondary)] cursor-text px-2 py-1 -mx-2 rounded hover:bg-[var(--surface)] transition-colors"
              >
                {description}
              </p>
            )}
          </div>
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

      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}
    </div>
  )
}
