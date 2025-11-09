import { CheckCircle2, XCircle, Clock, Loader2, FileText } from 'lucide-react'

export default function ControlCard({ control, isSelected, onClick }) {
  const statusConfig = {
    pending: {
      icon: Clock,
      color: 'text-yellow-400',
      bg: 'bg-yellow-400/10',
      label: 'Pending',
    },
    processing: {
      icon: Loader2,
      color: 'text-blue-400',
      bg: 'bg-blue-400/10',
      label: 'Processing',
      animate: 'animate-spin',
    },
    compliant: {
      icon: CheckCircle2,
      color: 'text-eco-400',
      bg: 'bg-eco-400/10',
      label: 'Compliant',
    },
    'non-compliant': {
      icon: XCircle,
      color: 'text-red-400',
      bg: 'bg-red-400/10',
      label: 'Non-Compliant',
    },
  }

  const config = statusConfig[control.status]
  const StatusIcon = config.icon

  return (
    <div
      onClick={onClick}
      className={`glass-effect rounded-xl p-5 cursor-pointer transition-all duration-200 ${
        isSelected 
          ? 'ring-2 ring-eco-600 bg-dark-elevated' 
          : 'hover:bg-dark-elevated'
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-dark-text">{control.name}</h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-dark-border text-dark-muted">
              {control.category}
            </span>
          </div>
          <p className="text-sm text-dark-muted line-clamp-2">
            {control.description}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className={`status-badge ${config.bg} ${config.color}`}>
          <StatusIcon className={`w-4 h-4 ${config.animate || ''}`} />
          <span>{config.label}</span>
        </div>

        {control.score !== null && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-dark-muted">Score:</span>
            <span className={`text-lg font-bold ${
              control.score >= 80 ? 'text-eco-400' : 
              control.score >= 60 ? 'text-yellow-400' : 
              'text-red-400'
            }`}>
              {control.score}%
            </span>
          </div>
        )}

        {control.documents.length > 0 && (
          <div className="flex items-center gap-1 text-dark-muted">
            <FileText className="w-4 h-4" />
            <span className="text-sm">{control.documents.length}</span>
          </div>
        )}
      </div>
    </div>
  )
}
