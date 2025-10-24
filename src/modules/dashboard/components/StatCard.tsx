interface StatCardProps {
  title: string
  value: number | string
  color: string
  icon: string
}

export default function StatCard({ title, value, color, icon }: StatCardProps) {
  return (
    <div className={`${color} rounded-lg p-6`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium opacity-75">{title}</p>
          <p className="text-3xl font-bold mt-2">{value}</p>
        </div>
        <span className="text-4xl">{icon}</span>
      </div>
    </div>
  )
}
