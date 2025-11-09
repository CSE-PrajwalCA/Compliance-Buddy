import { Leaf, Activity, Github } from 'lucide-react'

export default function Header({ onToggleMetrics, showMetrics }) {
  return (
    <header className="sticky top-0 z-40 glass-effect border-b border-dark-border">
      <div className="container mx-auto px-4 py-4 max-w-7xl">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 eco-gradient rounded-lg flex items-center justify-center">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-dark-text">Compliance Buddy</h1>
              <p className="text-xs text-dark-muted">Sustainable AI</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={onToggleMetrics}
              className={`px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 ${
                showMetrics 
                  ? 'bg-eco-600 text-white' 
                  : 'glass-effect hover:bg-dark-elevated text-dark-muted hover:text-dark-text'
              }`}
            >
              <Activity className="w-4 h-4" />
              <span className="hidden sm:inline text-sm">Metrics</span>
            </button>
            
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 glass-effect hover:bg-dark-elevated rounded-lg flex items-center justify-center transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5 text-dark-muted hover:text-dark-text" />
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
