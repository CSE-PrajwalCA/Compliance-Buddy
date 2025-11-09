import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Zap, Heart, Shield, Leaf, TrendingUp } from 'lucide-react'

export default function WelcomeSplash({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Hide splash after 1.5 seconds
    const hideTimer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(() => onComplete?.(), 500) // Wait for exit animation
    }, 1500)

    return () => {
      clearTimeout(hideTimer)
    }
  }, [onComplete])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
        >
          {/* Animated background particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-eco-400/20 rounded-full"
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                }}
                animate={{
                  y: [null, Math.random() * window.innerHeight],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            ))}
          </div>

          {/* Main content */}
          <div className="relative z-10 text-center px-6 max-w-4xl">
            {/* Animated logo/icon */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                type: "spring", 
                stiffness: 200, 
                damping: 20,
                delay: 0.2 
              }}
              className="mb-8 flex justify-center"
            >
              <div className="w-24 h-24 bg-gradient-to-br from-eco-400 to-eco-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-eco-500/50 relative">
                <Leaf className="w-12 h-12 text-white animate-pulse" />
                <div className="absolute inset-0 bg-eco-400/20 rounded-3xl animate-ping" />
              </div>
            </motion.div>

            {/* Dynamic welcome text */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mb-6"
            >
              <h1 className="text-6xl md:text-8xl font-black mb-4">
                <span className="text-slate-400">Welcome to</span>
                <br />
                <span className="bg-gradient-to-r from-eco-400 via-eco-500 to-eco-600 bg-clip-text text-transparent">
                  Compliance Buddy
                </span>
              </h1>
            </motion.div>

            {/* Loading bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-12 max-w-md mx-auto"
            >
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.5, ease: "linear" }}
                  className="h-full bg-gradient-to-r from-eco-400 via-purple-500 to-pink-500 rounded-full shadow-lg"
                />
              </div>
              <p className="text-slate-500 text-sm mt-3">
                Preparing your compliance experience...
              </p>
            </motion.div>

            {/* Sparkles decoration */}
            <div className="absolute top-0 left-1/4 animate-ping">
              <Sparkles className="w-6 h-6 text-eco-400 opacity-50" />
            </div>
            <div className="absolute bottom-0 right-1/4 animate-ping" style={{ animationDelay: '0.5s' }}>
              <Sparkles className="w-8 h-8 text-purple-400 opacity-50" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
