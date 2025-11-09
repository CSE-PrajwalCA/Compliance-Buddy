import { CheckCircle2, XCircle, Clock, Loader2, FileText, Shield, Lock, FileCheck, TrendingUp } from 'lucide-react'

export default function ControlCard({ control, isSelected, onClick }) {
  // Category configuration
  const categoryConfig = {
    Security: { 
      icon: Shield, 
      color: 'from-blue-500 to-cyan-500',
      iconColor: 'text-blue-400',
      bgColor: 'bg-blue-500/10'
    },
    Privacy: { 
      icon: Lock, 
      color: 'from-purple-500 to-pink-500',
      iconColor: 'text-purple-400',
      bgColor: 'bg-purple-500/10'
    },
    Compliance: { 
      icon: FileCheck, 
      color: 'from-emerald-500 to-green-600',
      iconColor: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10'
    },
  }
  
  const categoryInfo = categoryConfig[control.category] || categoryConfig.Compliance
  const CategoryIcon = categoryInfo.icon
  
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
      className={`group glass-effect rounded-xl p-5 cursor-pointer transition-all duration-300 transform hover:-translate-y-1 ${
        isSelected 
          ? 'ring-2 ring-eco-600 bg-dark-elevated shadow-xl shadow-eco-500/20 scale-102' 
          : 'hover:bg-dark-elevated hover:shadow-lg hover:shadow-eco-500/10'
      }`}
    >
      <div className="flex items-start gap-4 mb-4">
        {/* Category Icon */}
        <div className={`w-12 h-12 bg-gradient-to-br ${categoryInfo.color} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform`}>
          <CategoryIcon className="w-6 h-6 text-white" />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-semibold text-dark-text group-hover:text-white transition-colors truncate">{control.name}</h3>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <span className={`text-xs px-2.5 py-1 rounded-full ${categoryInfo.bgColor} ${categoryInfo.iconColor} font-medium border border-current/20`}>
              {control.category}
            </span>
          </div>
          <p className="text-sm text-dark-muted group-hover:text-slate-300 line-clamp-2 transition-colors">
            {control.description}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3">
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${config.bg} border border-current/20`}>
          <StatusIcon className={`w-4 h-4 ${config.color} ${config.animate || ''}`} />
          <span className={`text-xs font-medium ${config.color}`}>{config.label}</span>
        </div>

        <div className="flex items-center gap-3">
          {control.score !== null && (
            <div className="flex items-center gap-1.5">
              <TrendingUp className={`w-4 h-4 ${
                control.score >= 80 ? 'text-eco-400' : 
                control.score >= 60 ? 'text-yellow-400' : 
                'text-red-400'
              }`} />
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
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-eco-600/10 border border-eco-600/20">
              <FileText className="w-4 h-4 text-eco-400" />
              <span className="text-sm font-medium text-eco-400">{control.documents.length}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
