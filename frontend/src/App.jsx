import { useState, useEffect } from 'react'
import { Leaf, Activity, Bot } from 'lucide-react'
import Header from './components/layout/Header'
import ComplianceChecklist from './components/compliance/ComplianceChecklist'
import ChatBot from './components/chat/ChatBot'
import SustainabilityMetrics from './components/metrics/SustainabilityMetrics'
import RotatingQuotes from './components/ui/RotatingQuotes'
import WelcomeSplash from './components/ui/WelcomeSplash'

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [showMetrics, setShowMetrics] = useState(false)
  const [showChatTooltip, setShowChatTooltip] = useState(true)
  const [showSplash, setShowSplash] = useState(true)
  
  useEffect(() => {
    // Hide tooltip after 5 seconds
    const timer = setTimeout(() => setShowChatTooltip(false), 5000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {/* Welcome Splash Screen */}
      {showSplash && <WelcomeSplash onComplete={() => setShowSplash(false)} />}
      
      {/* Main App */}
      <div className="min-h-screen bg-dark-bg">
      <Header 
        onToggleMetrics={() => setShowMetrics(!showMetrics)}
        showMetrics={showMetrics}
      />
      
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Hero Section */}
        <div className="mb-8 text-center animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect mb-6 backdrop-blur-sm hover:scale-105 transition-transform">
            <Leaf className="w-4 h-4 text-eco-400 animate-pulse" />
            <span className="text-sm text-dark-muted font-medium">Powered by Sustainable AI • 70% Less Energy</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-eco-400 via-eco-500 to-eco-600 bg-clip-text text-transparent leading-tight">
            Compliance Buddy
          </h1>
          <p className="text-dark-muted text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            AI-powered compliance verification with minimal environmental impact. 
            <span className="text-eco-400 font-semibold"> Upload documents</span>, get 
            <span className="text-eco-400 font-semibold"> instant verdicts</span>, and ensure regulatory compliance.
          </p>
        </div>

        {/* Rotating Compliance Quotes */}
        <div className="mb-8 animate-fade-in">
          <RotatingQuotes />
        </div>

        {/* Sustainability Metrics Panel */}
        {showMetrics && (
          <div className="mb-8 animate-slide-up">
            <SustainabilityMetrics />
          </div>
        )}

        {/* Main Compliance Checklist */}
        <ComplianceChecklist />
      </main>

      {/* Floating Chat Button with Tooltip */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Tooltip */}
        {showChatTooltip && !isChatOpen && (
          <div className="absolute -top-16 right-0 animate-bounce">
            <div className="bg-slate-900 text-white px-4 py-2 rounded-lg shadow-xl text-sm whitespace-nowrap border border-eco-500/20">
              🤖🎧 AI Assistant here! Need help?
              <div className="absolute bottom-0 right-4 transform translate-y-1/2 rotate-45 w-2 h-2 bg-slate-900 border-r border-b border-eco-500/20"></div>
            </div>
          </div>
        )}
        
        <button
          onClick={() => {
            setIsChatOpen(!isChatOpen)
            setShowChatTooltip(false)
          }}
          className="relative w-16 h-16 bg-white rounded-full shadow-2xl shadow-eco-500/30 hover:shadow-eco-500/50 transition-all duration-300 flex items-center justify-center group transform hover:scale-110 active:scale-95 border-2 border-eco-500"
          aria-label="Toggle AI chat assistant"
        >
          {/* Support Agent Illustration */}
          <img 
            src="/support-agent.svg" 
            alt="AI Support Agent"
            className="w-14 h-14 object-contain transition-transform group-hover:scale-110 p-1"
          />
          
          {/* Animated pulse ring */}
          <div className="absolute inset-0 rounded-full bg-eco-400/10 animate-ping pointer-events-none" style={{ animationDuration: '2s' }} />
          
          {/* Live indicator - bottom right */}
          <span className="absolute bottom-0 right-0 flex items-center justify-center z-10">
            <span className="absolute w-5 h-5 bg-green-400 rounded-full animate-ping opacity-75"></span>
            <span className="relative w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white shadow-lg"></span>
          </span>
        </button>
      </div>

      {/* Chat Interface */}
      {isChatOpen && (
        <ChatBot onClose={() => setIsChatOpen(false)} />
      )}
    </div>
    </>
  )
}

export default App
