import { Routes, Route, Navigate } from "react-router-dom"
import Layout from "./components/layout/Layout"
import DashboardPage from "./modules/dashboard/views/DashboardPage"
import TasksPage from "./modules/tasks/views/TasksPage"

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/tasks" element={<TasksPage />} />
      </Route>
    </Routes>
  )
}
