import { useSelector } from "react-redux"
import type { RootState } from "../../../store"
import { getTaskStats } from "../../../utils/helpers"
import StatCard from "../components/StatCard"
import CategoryChart from "../components/CategoryChart"
import StatusChart from "../components/StatusChart"
import Card from "../../../components/shared/Card"

export default function DashboardPage() {
  const tasks = useSelector((state: RootState) => state.tasks.items)
  const stats = getTaskStats(tasks)

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--text-primary)]">Dashboard</h1>
        <p className="text-[var(--text-secondary)] mt-2">Overview of your project tasks and statistics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Tasks" value={stats.total} color="bg-blue-100 text-blue-800" icon="📋" />
        <StatCard title="Active Tasks" value={stats.active} color="bg-yellow-100 text-yellow-800" icon="⚡" />
        <StatCard title="Completed" value={stats.completed} color="bg-green-100 text-green-800" icon="✓" />
        <StatCard title="Total Hours" value={stats.totalHours} color="bg-purple-100 text-purple-800" icon="⏱️" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">Tasks by Category</h2>
          <CategoryChart data={stats.byCategory} />
        </Card>

        <Card>
          <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">Tasks by Status</h2>
          <StatusChart data={stats.byStatus} />
        </Card>
      </div>
    </div>
  )
}
