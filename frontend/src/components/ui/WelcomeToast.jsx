import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, X, Zap, Heart } from 'lucide-react'

export default function WelcomeToast() {
  const [isVisible, setIsVisible] = useState(false)
  const [hasShown, setHasShown] = useState(false)

  useEffect(() => {
    // Show after a brief delay for dramatic entrance
    setTimeout(() => setIsVisible(true), 800)
    
    // Auto-hide after 8 seconds
    setTimeout(() => {
      setIsVisible(false)
    }, 8000)
    
    setHasShown(true)
  }, [])

  const handleDismiss = () => {
    setIsVisible(false)
    localStorage.setItem('compliance-buddy-welcomed', 'true')
  }

  if (!hasShown) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -100, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.9 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="fixed top-6 left-1/2 -translate-x-1/2 z-[9999] max-w-md w-full mx-4"
        >
          <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-2 border-eco-500/30 rounded-2xl shadow-2xl shadow-eco-500/20 backdrop-blur-xl">
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-eco-500/10 via-purple-500/10 to-pink-500/10 animate-pulse" />
            
            {/* Floating sparkles */}
            <div className="absolute top-2 right-2 animate-ping">
              <Sparkles className="w-4 h-4 text-eco-400" />
            </div>
            <div className="absolute bottom-2 left-2 animate-ping" style={{ animationDelay: '0.3s' }}>
              <Sparkles className="w-3 h-3 text-purple-400" />
            </div>
            <div className="absolute top-1/2 left-4 animate-ping" style={{ animationDelay: '0.6s' }}>
              <Sparkles className="w-3 h-3 text-pink-400" />
            </div>

            {/* Content */}
            <div className="relative p-6">
              {/* Close button */}
              <button
                onClick={handleDismiss}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-800/50 hover:bg-slate-700 border border-slate-600/50 flex items-center justify-center transition-all hover:scale-110 active:scale-95 group"
                aria-label="Dismiss welcome message"
              >
                <X className="w-4 h-4 text-slate-400 group-hover:text-eco-400 transition-colors" />
              </button>

              {/* Icon */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-eco-500 to-eco-600 rounded-2xl flex items-center justify-center shadow-lg shadow-eco-500/50 animate-pulse">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold bg-gradient-to-r from-eco-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Hey there, Compliance Rockstar! 🚀
                  </h3>
                  <p className="text-xs text-slate-400">Let's make compliance fun (yes, really!)</p>
                </div>
              </div>

              {/* Message */}
              <div className="space-y-3">
                <p className="text-slate-200 text-sm leading-relaxed">
                  Welcome to your <span className="text-eco-400 font-semibold">AI-powered compliance playground</span>! 
                  We're here to make regulatory stuff actually enjoyable. 
                </p>
                
                <div className="flex items-start gap-2 p-3 bg-eco-500/10 border border-eco-500/20 rounded-xl">
                  <Heart className="w-5 h-5 text-eco-400 flex-shrink-0 mt-0.5 animate-pulse" />
                  <p className="text-sm text-eco-300">
                    <span className="font-semibold">Pro tip:</span> Start with "Data Encryption at Rest" for a quick win! 
                    Upload a doc, watch the AI magic happen, and get that sweet compliance score. ✨
                  </p>
                </div>

                <p className="text-xs text-slate-400 italic">
                  P.S. We're 70% more energy-efficient than traditional AI. Mother Earth says thanks! 🌱
                </p>
              </div>

              {/* Action button */}
              <button
                onClick={handleDismiss}
                className="mt-4 w-full px-4 py-2.5 bg-gradient-to-r from-eco-500 to-eco-600 hover:from-eco-600 hover:to-eco-700 text-white font-semibold rounded-xl shadow-lg shadow-eco-500/30 transition-all hover:scale-105 active:scale-95"
              >
                Let's Go! 🎯
              </button>
            </div>

            {/* Animated border glow */}
            <div className="absolute inset-0 rounded-2xl border-2 border-eco-500/0 animate-pulse" 
                 style={{ 
                   boxShadow: '0 0 20px rgba(16, 185, 129, 0.3), inset 0 0 20px rgba(16, 185, 129, 0.1)' 
                 }} 
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
