import { CheckCircle2, XCircle, TrendingUp, Clock, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { celebrateCompliance } from '../../utils/confetti'

export default function VerdictDisplay({ verdict, score, explanation, timestamp }) {
  const isCompliant = verdict === 'Compliant'
  
  const scoreColor = score >= 80 ? 'text-eco-400' : score >= 60 ? 'text-yellow-400' : 'text-red-400'
  const scoreBg = score >= 80 ? 'bg-eco-400/10' : score >= 60 ? 'bg-yellow-400/10' : 'bg-red-400/10'
  
  // Trigger confetti on compliant verdict
  useEffect(() => {
    if (isCompliant) {
      // Small delay for dramatic effect
      setTimeout(() => celebrateCompliance(), 300)
    }
  }, [isCompliant])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      {/* Verdict Header */}
      <div className={`relative overflow-hidden p-5 rounded-2xl border-2 shadow-lg ${
        isCompliant 
          ? 'bg-gradient-to-br from-eco-400/10 to-eco-600/10 border-eco-400/30 shadow-eco-400/20' 
          : 'bg-gradient-to-br from-red-400/10 to-red-600/10 border-red-400/30 shadow-red-400/20'
      }`}>
        {/* Celebration sparkles for compliant */}
        {isCompliant && (
          <div className="absolute inset-0 pointer-events-none">
            <Sparkles className="absolute top-2 right-2 w-6 h-6 text-eco-400 animate-ping" />
            <Sparkles className="absolute top-4 left-4 w-4 h-4 text-eco-400 animate-ping" style={{ animationDelay: '0.2s' }} />
            <Sparkles className="absolute bottom-4 right-8 w-5 h-5 text-eco-400 animate-ping" style={{ animationDelay: '0.4s' }} />
          </div>
        )}
        
        <div className="relative flex items-center gap-3 mb-2">
          {isCompliant ? (
            <CheckCircle2 className="w-7 h-7 text-eco-400" />
          ) : (
            <XCircle className="w-7 h-7 text-red-400" />
          )}
          <div className="flex-1">
            <h3 className={`text-lg font-bold ${isCompliant ? 'text-eco-400' : 'text-red-400'}`}>
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
      <div className={`p-5 rounded-2xl border ${scoreBg} ${
        score >= 80 ? 'border-eco-400/20' : 
        score >= 60 ? 'border-yellow-400/20' : 
        'border-red-400/20'
      }`}>
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-dark-text">Compliance Score</span>
          <div className="flex items-center gap-2">
            <TrendingUp className={`w-5 h-5 ${scoreColor}`} />
            <span className={`text-3xl font-bold ${scoreColor}`}>{score}%</span>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full h-3 bg-dark-border rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${score}%` }}
            transition={{ duration: 2, ease: "easeOut" }}
            className={`h-full rounded-full ${
              score >= 80 ? 'bg-gradient-to-r from-eco-400 to-eco-600' : 
              score >= 60 ? 'bg-gradient-to-r from-yellow-400 to-orange-400' : 
              'bg-gradient-to-r from-red-400 to-red-600'
            }`}
          />
        </div>
      </div>

      {/* Explanation */}
      <div className="p-5 glass-effect rounded-2xl border border-dark-border">
        <h4 className="text-sm font-medium text-dark-text mb-3 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-eco-400" />
          AI Analysis
        </h4>
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
