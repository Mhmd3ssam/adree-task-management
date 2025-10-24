"use client"

import { useEffect } from "react"
import { CheckCircle, AlertCircle, XCircle } from "lucide-react"

interface ToastProps {
  message: string
  type: "success" | "error" | "info"
  onClose: () => void
  duration?: number
}

export default function Toast({ message, type, onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration)
    return () => clearTimeout(timer)
  }, [onClose, duration])

  const icons = {
    success: <CheckCircle size={20} />,
    error: <XCircle size={20} />,
    info: <AlertCircle size={20} />,
  }

  const colors = {
    success: "bg-green-50 text-green-800 border-green-200",
    error: "bg-red-50 text-red-800 border-red-200",
    info: "bg-blue-50 text-blue-800 border-blue-200",
  }

  return (
    <div className={`fixed bottom-4 right-4 flex items-center gap-3 px-4 py-3 rounded-lg border ${colors[type]} z-50`}>
      {icons[type]}
      <span>{message}</span>
    </div>
  )
}
