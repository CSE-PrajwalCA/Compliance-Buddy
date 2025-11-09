import { Leaf, Zap, Cloud, TrendingDown } from 'lucide-react'
import { motion } from 'framer-motion'

export default function SustainabilityMetrics() {
  const metrics = [
    {
      icon: Zap,
      label: 'Energy Saved',
      value: '2.4 kWh',
      change: '-35%',
      description: 'vs. traditional AI models',
      color: 'text-yellow-400',
      bg: 'bg-yellow-400/10',
    },
    {
      icon: Cloud,
      label: 'CO₂ Reduced',
      value: '1.2 kg',
      change: '-42%',
      description: 'carbon footprint',
      color: 'text-blue-400',
      bg: 'bg-blue-400/10',
    },
    {
      icon: Leaf,
      label: 'Efficiency Score',
      value: '94%',
      change: '+12%',
      description: 'model optimization',
      color: 'text-eco-400',
      bg: 'bg-eco-400/10',
    },
    {
      icon: TrendingDown,
      label: 'Compute Time',
      value: '1.2s',
      change: '-58%',
      description: 'avg. inference time',
      color: 'text-purple-400',
      bg: 'bg-purple-400/10',
    },
  ]

  return (
    <div className="glass-effect rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-dark-text mb-1">Sustainability Impact</h2>
          <p className="text-sm text-dark-muted">Real-time environmental metrics</p>
        </div>
        <div className="w-12 h-12 bg-eco-600/20 rounded-full flex items-center justify-center">
          <Leaf className="w-6 h-6 text-eco-400" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => {
          const Icon = metric.icon
          return (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`${metric.bg} rounded-xl p-4 border border-dark-border`}
            >
              <div className="flex items-start justify-between mb-3">
                <Icon className={`w-5 h-5 ${metric.color}`} />
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${metric.bg} ${metric.color}`}>
                  {metric.change}
                </span>
              </div>
              
              <div className="mb-1">
                <p className={`text-2xl font-bold ${metric.color}`}>{metric.value}</p>
                <p className="text-sm font-medium text-dark-text">{metric.label}</p>
              </div>
              
              <p className="text-xs text-dark-muted">{metric.description}</p>
            </motion.div>
          )
        })}
      </div>

      {/* Additional Info */}
      <div className="mt-6 p-4 bg-dark-elevated rounded-lg border border-dark-border">
        <div className="flex items-start gap-3">
          <Leaf className="w-5 h-5 text-eco-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="text-dark-text font-medium mb-1">Sustainable AI Architecture</p>
            <p className="text-dark-muted leading-relaxed">
              Our system uses Llama 3.1 8B, an energy-efficient model that requires 70% less compute 
              than larger alternatives while maintaining high accuracy. Combined with optimized inference 
              and smart caching, we minimize environmental impact without compromising performance.
            </p>
          </div>
        </div>
      </div>

      {/* Model Info */}
      <div className="mt-4 flex items-center justify-between text-xs text-dark-muted">
        <span>Model: Llama 3.1 8B</span>
        <span>•</span>
        <span>Parameters: 8 Billion</span>
        <span>•</span>
        <span>Inference: Optimized</span>
      </div>
    </div>
  )
}
