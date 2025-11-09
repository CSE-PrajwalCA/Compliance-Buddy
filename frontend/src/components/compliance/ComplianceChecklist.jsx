import { useState } from 'react'
import { Filter, Search, X, Sparkles, TrendingUp, CheckCircle2, XCircle, Clock, FileText } from 'lucide-react'
import useComplianceStore from '../../store/complianceStore'
import ControlCard from './ControlCard'
import ControlDetail from './ControlDetail'
import CountingNumber from '../ui/CountingNumber'

export default function ComplianceChecklist() {
  const { controls, selectedControl, setSelectedControl } = useComplianceStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')

  const categories = ['all', ...new Set(controls.map(c => c.category))]

  const filteredControls = controls.filter(control => {
    const matchesSearch = control.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         control.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = filterCategory === 'all' || control.category === filterCategory
    return matchesSearch && matchesCategory
  })

  const stats = {
    total: controls.length,
    compliant: controls.filter(c => c.status === 'compliant').length,
    nonCompliant: controls.filter(c => c.status === 'non-compliant').length,
    pending: controls.filter(c => c.status === 'pending').length,
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-effect rounded-xl p-4 hover:scale-105 transition-all duration-300 cursor-pointer group">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-dark-muted">Total Controls</p>
            <div className="w-8 h-8 bg-slate-600/20 rounded-lg flex items-center justify-center">
              <FileText className="w-4 h-4 text-slate-400" />
            </div>
          </div>
          <CountingNumber end={stats.total} className="text-3xl font-bold text-dark-text group-hover:scale-110 transition-transform" />
        </div>
        <div className="glass-effect rounded-xl p-4 hover:scale-105 transition-all duration-300 cursor-pointer group">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-dark-muted">Compliant</p>
            <div className="w-8 h-8 bg-eco-600/20 rounded-lg flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4 text-eco-400" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <CountingNumber end={stats.compliant} className="text-3xl font-bold text-eco-400 group-hover:scale-110 transition-transform" />
            {stats.compliant > 0 && (
              <TrendingUp className="w-5 h-5 text-eco-400 animate-bounce" />
            )}
          </div>
        </div>
        <div className="glass-effect rounded-xl p-4 hover:scale-105 transition-all duration-300 cursor-pointer group">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-dark-muted">Non-Compliant</p>
            <div className="w-8 h-8 bg-red-600/20 rounded-lg flex items-center justify-center">
              <XCircle className="w-4 h-4 text-red-400" />
            </div>
          </div>
          <CountingNumber end={stats.nonCompliant} className="text-3xl font-bold text-red-400 group-hover:scale-110 transition-transform" />
        </div>
        <div className="glass-effect rounded-xl p-4 hover:scale-105 transition-all duration-300 cursor-pointer group">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-dark-muted">Pending</p>
            <div className="w-8 h-8 bg-yellow-600/20 rounded-lg flex items-center justify-center">
              <Clock className="w-4 h-4 text-yellow-400" />
            </div>
          </div>
          <CountingNumber end={stats.pending} className="text-3xl font-bold text-yellow-400 group-hover:scale-110 transition-transform" />
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-muted" />
          <input
            type="text"
            placeholder="Try 'encryption', 'security', or 'audit'..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-3 glass-effect rounded-lg text-dark-text placeholder-dark-muted focus:outline-none focus:ring-2 focus:ring-eco-600 focus:ring-offset-2 focus:ring-offset-dark-bg transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full hover:bg-dark-elevated flex items-center justify-center transition-colors group"
              aria-label="Clear search"
            >
              <X className="w-4 h-4 text-dark-muted group-hover:text-dark-text" />
            </button>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-dark-muted" />
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-3 glass-effect rounded-lg text-dark-text focus:outline-none focus:ring-2 focus:ring-eco-600 cursor-pointer"
          >
            {categories.map(cat => (
              <option key={cat} value={cat} className="bg-dark-surface">
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Controls Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          {filteredControls.map((control) => (
            <ControlCard
              key={control.id}
              control={control}
              isSelected={selectedControl === control.id}
              onClick={() => setSelectedControl(control.id)}
            />
          ))}
        </div>

        {/* Detail Panel */}
        <div className="lg:sticky lg:top-24 h-fit">
          {selectedControl ? (
            <ControlDetail controlId={selectedControl} />
          ) : (
            <div className="glass-effect rounded-xl p-12 text-center animate-fade-in">
              <div className="w-20 h-20 bg-gradient-to-br from-eco-600/20 to-eco-400/20 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-pulse">
                <Sparkles className="w-10 h-10 text-eco-400" />
              </div>
              <h3 className="text-2xl font-bold text-dark-text mb-3">
                Get Started
              </h3>
              <p className="text-dark-muted mb-8 text-lg">
                Select a control from the left to begin compliance verification
              </p>
              
              {/* Step-by-step guide */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-eco-600/20 flex items-center justify-center border-2 border-eco-600/40">
                    <span className="text-eco-400 font-bold">1</span>
                  </div>
                  <span className="text-dark-muted">Select Control</span>
                </div>
                
                <div className="hidden sm:block text-dark-border">→</div>
                <div className="sm:hidden text-dark-border rotate-90">→</div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-eco-600/20 flex items-center justify-center border-2 border-eco-600/40">
                    <span className="text-eco-400 font-bold">2</span>
                  </div>
                  <span className="text-dark-muted">Upload Documents</span>
                </div>
                
                <div className="hidden sm:block text-dark-border">→</div>
                <div className="sm:hidden text-dark-border rotate-90">→</div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-eco-600/20 flex items-center justify-center border-2 border-eco-600/40">
                    <span className="text-eco-400 font-bold">3</span>
                  </div>
                  <span className="text-dark-muted">Verify & Review</span>
                </div>
              </div>
              
              {/* Helpful tip */}
              <div className="mt-8 p-4 bg-eco-600/10 border border-eco-600/20 rounded-lg">
                <p className="text-sm text-eco-400 flex items-center justify-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  <span>Tip: Start with "Data Encryption at Rest" for a quick demo</span>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
