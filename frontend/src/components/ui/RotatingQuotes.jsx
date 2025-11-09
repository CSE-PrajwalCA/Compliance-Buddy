import { useState, useEffect } from 'react'
import { Sparkles, Heart, Shield, Zap, Star, TrendingUp } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function RotatingQuotes() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const quotes = [
    {
      text: "Compliance isn't just a checkbox, it's a love language! 💚",
      icon: Heart,
      color: "from-pink-500 to-red-500"
    },
    {
      text: "Stay compliant, stay confident! Your data deserves the best date 😉",
      icon: Shield,
      color: "from-blue-500 to-cyan-500"
    },
    {
      text: "Regulations may be strict, but we make them look sexy! 🔥",
      icon: Sparkles,
      color: "from-purple-500 to-pink-500"
    },
    {
      text: "Compliance is our love language - let's make it official! 💍",
      icon: Star,
      color: "from-yellow-500 to-orange-500"
    },
    {
      text: "Swipe right on security, left on vulnerabilities! 📱✨",
      icon: Zap,
      color: "from-emerald-500 to-green-600"
    },
    {
      text: "Your compliance score is looking hot today! 🔥📈",
      icon: TrendingUp,
      color: "from-red-500 to-pink-500"
    },
    {
      text: "Audit-ready is the new sexy! Who knew compliance could be this fun? 😎",
      icon: Sparkles,
      color: "from-indigo-500 to-purple-500"
    },
    {
      text: "Falling in love with your compliance journey, one document at a time! 💕",
      icon: Heart,
      color: "from-pink-500 to-rose-500"
    },
    {
      text: "Compliance: Because your data deserves to be treated right! 💎",
      icon: Shield,
      color: "from-cyan-500 to-blue-500"
    },
    {
      text: "Let's get this compliance party started! 🎉 Regulations never looked so good!",
      icon: Star,
      color: "from-yellow-500 to-amber-500"
    },
    {
      text: "Sustainable AI + Compliance = A match made in heaven! 🌱💚",
      icon: Sparkles,
      color: "from-emerald-500 to-teal-500"
    },
    {
      text: "Your security posture is giving main character energy! ✨👑",
      icon: Zap,
      color: "from-purple-500 to-pink-500"
    },
    {
      text: "Compliance goals: Be so good they can't ignore you! 💪🔒",
      icon: TrendingUp,
      color: "from-orange-500 to-red-500"
    },
    {
      text: "Flirting with perfection, committed to compliance! 😘✅",
      icon: Heart,
      color: "from-rose-500 to-pink-500"
    },
    {
      text: "Your documents are safe with us - we're the ultimate wingman! 🦸‍♂️💼",
      icon: Shield,
      color: "from-blue-500 to-indigo-500"
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % quotes.length)
    }, 5000) // Change every 5 seconds

    return () => clearInterval(interval)
  }, [quotes.length])

  const currentQuote = quotes[currentIndex]
  const Icon = currentQuote.icon

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-slate-900/50 to-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 shadow-xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="p-5"
        >
          <div className="flex items-center gap-4">
            {/* Animated Icon */}
            <div className={`w-14 h-14 bg-gradient-to-br ${currentQuote.color} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-2xl`}>
              <Icon className="w-7 h-7 text-white animate-pulse" />
            </div>

            {/* Quote Text */}
            <div className="flex-1">
              <p className="text-slate-100 font-semibold text-lg md:text-xl leading-relaxed">
                {currentQuote.text}
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Animated Progress Bar at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-800/50">
        <motion.div
          key={currentIndex}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 5, ease: "linear" }}
          className={`h-full bg-gradient-to-r ${currentQuote.color} shadow-lg`}
        />
      </div>

      {/* Floating Sparkles */}
      <div className="absolute top-3 right-3 opacity-30">
        <Sparkles className="w-5 h-5 text-eco-400 animate-ping" />
      </div>
      <div className="absolute bottom-3 left-3 opacity-30">
        <Sparkles className="w-4 h-4 text-eco-400 animate-ping" style={{ animationDelay: '0.5s' }} />
      </div>
      
      {/* Subtle glow effect */}
      <div className={`absolute inset-0 bg-gradient-to-r ${currentQuote.color} opacity-5 pointer-events-none`} />
    </div>
  )
}
