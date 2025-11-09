import { CheckCircle2, XCircle, TrendingUp, Clock } from 'lucide-react'
import { motion } from 'framer-motion'

export default function VerdictDisplay({ verdict, score, explanation, timestamp }) {
  const isCompliant = verdict === 'Compliant'
  
  const scoreColor = score >= 80 ? 'text-eco-400' : score >= 60 ? 'text-yellow-400' : 'text-red-400'
  const scoreBg = score >= 80 ? 'bg-eco-400/10' : score >= 60 ? 'bg-yellow-400/10' : 'bg-red-400/10'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      {/* Verdict Header */}
      <div className={`p-4 rounded-xl border ${
        isCompliant 
          ? 'bg-eco-400/10 border-eco-400/20' 
          : 'bg-red-400/10 border-red-400/20'
      }`}>
        <div className="flex items-center gap-3 mb-2">
          {isCompliant ? (
            <CheckCircle2 className="w-6 h-6 text-eco-400" />
          ) : (
            <XCircle className="w-6 h-6 text-red-400" />
          )}
          <div className="flex-1">
            <h3 className={`font-bold ${isCompliant ? 'text-eco-400' : 'text-red-400'}`}>
              {verdict}
            </h3>
            {timestamp && (
              <p className="text-xs text-dark-muted flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {new Date(timestamp).toLocaleString()}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Score Display */}
      <div className={`p-4 rounded-xl ${scoreBg}`}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-dark-text">Compliance Score</span>
          <div className="flex items-center gap-2">
            <TrendingUp className={`w-4 h-4 ${scoreColor}`} />
            <span className={`text-2xl font-bold ${scoreColor}`}>{score}%</span>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full h-2 bg-dark-border rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${score}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={`h-full ${
              score >= 80 ? 'bg-eco-400' : 
              score >= 60 ? 'bg-yellow-400' : 
              'bg-red-400'
            }`}
          />
        </div>
      </div>

      {/* Explanation */}
      <div className="p-4 glass-effect rounded-xl">
        <h4 className="text-sm font-medium text-dark-text mb-2">AI Analysis</h4>
        <p className="text-sm text-dark-muted leading-relaxed">{explanation}</p>
      </div>

      {/* Sustainability Badge */}
      <div className="flex items-center gap-2 text-xs text-dark-muted">
        <div className="w-2 h-2 bg-eco-400 rounded-full animate-pulse-slow" />
        <span>Verified using energy-efficient Llama 3.1 8B model</span>
      </div>
    </motion.div>
  )
}
