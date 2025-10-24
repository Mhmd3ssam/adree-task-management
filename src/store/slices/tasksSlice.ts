import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { Task } from "../../types"
import { generateMockTasks } from "../../utils/mockData"

interface TasksState {
  items: Task[]
  loading: boolean
  error: string | null
}

const initialState: TasksState = {
  items: generateMockTasks(),
  loading: false,
  error: null,
}

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.items.push(action.payload)
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.items.findIndex((task) => task.id === action.payload.id)
      if (index !== -1) {
        state.items[index] = action.payload
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((task) => task.id !== action.payload)
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
  },
})

export const { addTask, updateTask, deleteTask, setError } = tasksSlice.actions
export default tasksSlice.reducer
