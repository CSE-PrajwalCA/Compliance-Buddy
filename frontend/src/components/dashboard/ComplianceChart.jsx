import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'

export default function ComplianceChart({ data }) {
  const chartData = [
    { name: 'Pass', value: data.pass, color: '#22c55e' },
    { name: 'Partial', value: data.partial, color: '#eab308' },
    { name: 'Fail', value: data.fail, color: '#ef4444' },
  ].filter(item => item.value > 0)

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-effect rounded-lg p-3 border border-dark-border">
          <p className="text-sm text-dark-text font-medium">{payload[0].name}</p>
          <p className="text-xs text-dark-muted">
            {payload[0].value} control{payload[0].value !== 1 ? 's' : ''}
          </p>
        </div>
      )
    }
    return null
  }

  if (chartData.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center">
        <p className="text-dark-muted text-sm">No data available</p>
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          paddingAngle={5}
          dataKey="value"
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend
          verticalAlign="bottom"
          height={36}
          formatter={(value, entry) => (
            <span className="text-sm text-dark-text">{value}: {entry.payload.value}</span>
          )}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}
