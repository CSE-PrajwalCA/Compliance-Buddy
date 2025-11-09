import { useState } from 'react'
import { Leaf, Activity, MessageSquare } from 'lucide-react'
import Header from './components/layout/Header'
import ComplianceChecklist from './components/compliance/ComplianceChecklist'
import ChatBot from './components/chat/ChatBot'
import SustainabilityMetrics from './components/metrics/SustainabilityMetrics'

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [showMetrics, setShowMetrics] = useState(false)

  return (
    <div className="min-h-screen bg-dark-bg">
      <Header 
        onToggleMetrics={() => setShowMetrics(!showMetrics)}
        showMetrics={showMetrics}
      />
      
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Hero Section */}
        <div className="mb-12 text-center animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect mb-4">
            <Leaf className="w-4 h-4 text-eco-400" />
            <span className="text-sm text-dark-muted">Powered by Sustainable AI</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-eco-400 to-eco-600 bg-clip-text text-transparent">
            Compliance Buddy
          </h1>
          <p className="text-dark-muted text-lg max-w-2xl mx-auto">
            AI-powered compliance verification with minimal environmental impact. 
            Upload documents, get instant verdicts, and ensure regulatory compliance.
          </p>
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

      {/* Floating Chat Button */}
      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 eco-gradient rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group z-50"
        aria-label="Toggle chat"
      >
        <MessageSquare className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
      </button>

      {/* Chat Interface */}
      {isChatOpen && (
        <ChatBot onClose={() => setIsChatOpen(false)} />
      )}
    </div>
  )
}

export default App
