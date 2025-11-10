import { useState, useEffect } from 'react'
import { Leaf, LayoutDashboard, CheckSquare, Moon, Sun } from 'lucide-react'
import Header from './components/layout/Header'
import ComplianceChecklist from './components/compliance/ComplianceChecklist'
import ComplianceDashboard from './components/dashboard/ComplianceDashboard'
import SustainabilityMetrics from './components/metrics/SustainabilityMetrics'

function App() {
  const [showMetrics, setShowMetrics] = useState(false)
  const [activeTab, setActiveTab] = useState('dashboard') // dashboard, checklist
  const [darkMode, setDarkMode] = useState(true)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-dark-bg' : 'bg-mint-50'}`}>
      <Header 
        onToggleMetrics={() => setShowMetrics(!showMetrics)}
        showMetrics={showMetrics}
      />
      
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Hero Section */}
        <div className="mb-8 text-center animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect mb-4">
            <Leaf className="w-4 h-4 text-eco-400" />
            <span className={`text-sm ${darkMode ? 'text-dark-muted' : 'text-eco-900'}`}>
              Powered by Sustainable AI
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-eco-400 to-eco-600 bg-clip-text text-transparent">
            Compliance Buddy Dashboard
          </h1>
          <p className={`text-lg max-w-2xl mx-auto ${darkMode ? 'text-dark-muted' : 'text-eco-900'}`}>
            Sustainable AI Validation Engine
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                activeTab === 'dashboard'
                  ? 'eco-gradient text-white shadow-lg'
                  : 'glass-effect text-dark-muted hover:text-dark-text'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('checklist')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                activeTab === 'checklist'
                  ? 'eco-gradient text-white shadow-lg'
                  : 'glass-effect text-dark-muted hover:text-dark-text'
              }`}
            >
              <CheckSquare className="w-4 h-4" />
              Checklist
            </button>
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="flex items-center gap-2 px-4 py-2 glass-effect rounded-lg hover:bg-dark-elevated transition-colors"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <>
                <Sun className="w-4 h-4 text-yellow-400" />
                <span className="text-sm text-dark-muted">Light</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-eco-400" />
                <span className="text-sm text-eco-900">Dark</span>
              </>
            )}
          </button>
        </div>

        {/* Sustainability Metrics Panel */}
        {showMetrics && (
          <div className="mb-8 animate-slide-up">
            <SustainabilityMetrics />
          </div>
        )}

        {/* Content based on active tab */}
        {activeTab === 'dashboard' ? (
          <ComplianceDashboard />
        ) : (
          <ComplianceChecklist />
        )}
      </main>
    </div>
  )
}

export default App
