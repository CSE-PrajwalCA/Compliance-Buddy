import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function EmissionsChart({ data }) {
  // Transform data for the chart
  const chartData = data.length > 0 ? data : [
    { timestamp: 'Run 1', emissions: 0.0021 },
    { timestamp: 'Run 2', emissions: 0.0019 },
    { timestamp: 'Run 3', emissions: 0.0023 },
    { timestamp: 'Run 4', emissions: 0.0018 },
    { timestamp: 'Run 5', emissions: 0.0020 },
  ]

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-effect rounded-lg p-3 border border-dark-border">
          <p className="text-sm text-dark-text font-medium">{payload[0].payload.timestamp}</p>
          <p className="text-xs text-dark-muted">
            {(payload[0].value * 1000).toFixed(2)}g CO₂
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#2d3935" />
        <XAxis
          dataKey="timestamp"
          stroke="#8fa89a"
          style={{ fontSize: '12px' }}
        />
        <YAxis
          stroke="#8fa89a"
          style={{ fontSize: '12px' }}
          tickFormatter={(value) => `${(value * 1000).toFixed(1)}g`}
        />
        <Tooltip content={<CustomTooltip />} />
        <Line
          type="monotone"
          dataKey="emissions"
          stroke="#00A676"
          strokeWidth={2}
          dot={{ fill: '#00A676', r: 4 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
