"use client"

import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { MoreHorizontal, Palette } from "lucide-react"
import type { AppDispatch } from "../../../store"
import { deleteTask, updateTask } from "../../../store/slices/tasksSlice"

interface Option {
  label: string;
  value: string;
  color: string;
  bg: string;
}
import type { Task, TaskStatus, TaskCategory } from "../../../types"
import { getStatusColor, getCategoryColor } from "../../../utils/helpers"
import { Edit2, Trash2 } from "lucide-react"
import Table, { type Column } from "../../../components/shared/Table"
import TaskMobileCard from "./TaskMobileCard"

interface TaskTableProps {
  tasks: Task[]
  onEdit: (taskId: string) => void
  onShowToast: (message: string, type: "success" | "error") => void
}

interface Option {
  label: string;
  value: string;
  color: string;
  bg: string;
}

export default function TaskTable({ tasks, onEdit, onShowToast }: TaskTableProps) {
  const dispatch = useDispatch<AppDispatch>()
  const [categoryOptions, setCategoryOptions] = useState<Option[]>(() => {
    const savedOptions = localStorage.getItem('categoryOptions');
    const defaultOptions: Option[] = [
      { label: "Dev", value: "Dev", color: "#4DAB9A", bg: "#DCF5F0" },
      { label: "Test", value: "Test", color: "#9A6DD7", bg: "#EEE4F7" },
      { label: "UI", value: "UI", color: "#FF9D48", bg: "#FFE8D7" },
      { label: "Db", value: "Db", color: "#529CCA", bg: "#E4F0F7" }
    ];
    return savedOptions ? JSON.parse(savedOptions) : defaultOptions;
  });

  useEffect(() => {
    localStorage.setItem('categoryOptions', JSON.stringify(categoryOptions));
  }, [categoryOptions]);

  const [statusOptions, setStatusOptions] = useState<Option[]>(() => {
    const savedOptions = localStorage.getItem('statusOptions');
    const defaultOptions: Option[] = [
      { label: "New", value: "New", color: "#909090", bg: "#EAEAEA" },
      { label: "Active", value: "Active", color: "#4DAB9A", bg: "#DCF5F0" },
      { label: "Closed", value: "Closed", color: "#529CCA", bg: "#E4F0F7" }
    ];
    return savedOptions ? JSON.parse(savedOptions) : defaultOptions;
  });

  useEffect(() => {
    localStorage.setItem('statusOptions', JSON.stringify(statusOptions));
  }, [statusOptions]);

  // Save changes to localStorage and update tasks when options change
  useEffect(() => {
    localStorage.setItem('categoryOptions', JSON.stringify(categoryOptions));
    // Update tasks with new category colors
    tasks.forEach(task => {
      const category = categoryOptions.find(opt => opt.value === task.category);
      if (category) {
        dispatch(updateTask({ ...task }));
      }
    });
  }, [categoryOptions]);

  useEffect(() => {
    localStorage.setItem('statusOptions', JSON.stringify(statusOptions));
    // Update tasks with new status colors
    tasks.forEach(task => {
      const status = statusOptions.find(opt => opt.value === task.status);
      if (status) {
        dispatch(updateTask({ ...task }));
      }
    });
  }, [statusOptions]);

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
      className: "text-[var(--text-primary)]",
      editable: true,
      onChange: (value, task) => {
        dispatch(updateTask({ ...task, title: value }))
        onShowToast("Task updated successfully", "success")
      }
    },
    { 
      header: "Assigned To", 
      accessor: "assignedTo",
      className: "text-[var(--text-secondary)]",
      editable: true,
      onChange: (value, task) => {
        dispatch({
          type: 'tasks/updateTask',
          payload: { ...task, assignedTo: value }
        })
      }
    },
    { 
      header: "Category",
      accessor: "category",
      type: "select",
      editable: true,
      options: categoryOptions,
      onChange: (value, task) => {
        dispatch(updateTask({ ...task, category: value as TaskCategory }))
        onShowToast("Task updated successfully", "success")
      },
      onAddOption: (value) => {
        const newOption = {
          label: value,
          value: value,
          color: "#4DAB9A",
          bg: "#DCF5F0"
        };
        setCategoryOptions(prev => {
          const updatedOptions = [...prev, newOption];
          localStorage.setItem('categoryOptions', JSON.stringify(updatedOptions));
          return updatedOptions;
        });
        onShowToast(`Added new category: ${value}`, "success");
      },
      onEditOption: (oldValue, newValue, color, bg) => {
        setCategoryOptions(prev => {
          const updatedOptions = prev.map(opt => 
            opt.value === oldValue 
              ? { ...opt, label: newValue, value: newValue, color, bg }
              : opt
          );
          localStorage.setItem('categoryOptions', JSON.stringify(updatedOptions));
          return updatedOptions;
        });
        // Update all tasks with the old category to use the new one
        tasks.forEach(task => {
          if (task.category === oldValue) {
            dispatch(updateTask({ ...task, category: newValue as TaskCategory }));
          }
        });
        onShowToast(`Updated category: ${newValue}`, "success");
      },
      onDeleteOption: (value) => {
        if (tasks.some(task => task.category === value)) {
          onShowToast(`Cannot delete category: ${value} - it's being used by tasks`, "error");
          return;
        }
        setCategoryOptions(prev => {
          const updatedOptions = prev.filter(opt => opt.value !== value);
          localStorage.setItem('categoryOptions', JSON.stringify(updatedOptions));
          return updatedOptions;
        });
        onShowToast(`Deleted category: ${value}`, "success");
      }
    },
    { 
      header: "Status",
      accessor: "status",
      type: "select",
      editable: true,
      options: statusOptions,
      onChange: (value, task) => {
        dispatch(updateTask({ ...task, status: value as TaskStatus }))
        onShowToast("Task updated successfully", "success")
      },
      onAddOption: (value) => {
        const newOption = {
          label: value,
          value: value,
          color: "#4DAB9A",
          bg: "#DCF5F0"
        };
        setStatusOptions(prev => {
          const updatedOptions = [...prev, newOption];
          localStorage.setItem('statusOptions', JSON.stringify(updatedOptions));
          return updatedOptions;
        });
        onShowToast(`Added new status: ${value}`, "success");
      },
      onEditOption: (oldValue, newValue, color, bg) => {
        setStatusOptions(prev => {
          const updatedOptions = prev.map(opt => 
            opt.value === oldValue 
              ? { ...opt, label: newValue, value: newValue, color, bg }
              : opt
          );
          localStorage.setItem('statusOptions', JSON.stringify(updatedOptions));
          return updatedOptions;
        });
        // Update all tasks with the old status to use the new one
        tasks.forEach(task => {
          if (task.status === oldValue) {
            dispatch(updateTask({ ...task, status: newValue as TaskStatus }));
          }
        });
        onShowToast(`Updated status: ${newValue}`, "success");
      },
      onDeleteOption: (value) => {
        if (tasks.some(task => task.status === value)) {
          onShowToast(`Cannot delete status: ${value} - it's being used by tasks`, "error");
          return;
        }
        setStatusOptions(prev => {
          const updatedOptions = prev.filter(opt => opt.value !== value);
          localStorage.setItem('statusOptions', JSON.stringify(updatedOptions));
          return updatedOptions;
        });
        onShowToast(`Deleted status: ${value}`, "success");
      }
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
