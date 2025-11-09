import { useState } from 'react'
import { Filter, Search } from 'lucide-react'
import useComplianceStore from '../../store/complianceStore'
import ControlCard from './ControlCard'
import ControlDetail from './ControlDetail'

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
        <div className="glass-effect rounded-xl p-4">
          <p className="text-sm text-dark-muted mb-1">Total Controls</p>
          <p className="text-2xl font-bold text-dark-text">{stats.total}</p>
        </div>
        <div className="glass-effect rounded-xl p-4">
          <p className="text-sm text-dark-muted mb-1">Compliant</p>
          <p className="text-2xl font-bold text-eco-400">{stats.compliant}</p>
        </div>
        <div className="glass-effect rounded-xl p-4">
          <p className="text-sm text-dark-muted mb-1">Non-Compliant</p>
          <p className="text-2xl font-bold text-red-400">{stats.nonCompliant}</p>
        </div>
        <div className="glass-effect rounded-xl p-4">
          <p className="text-sm text-dark-muted mb-1">Pending</p>
          <p className="text-2xl font-bold text-yellow-400">{stats.pending}</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-muted" />
          <input
            type="text"
            placeholder="Search controls..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 glass-effect rounded-lg text-dark-text placeholder-dark-muted focus:outline-none focus:ring-2 focus:ring-eco-600"
          />
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
            <div className="glass-effect rounded-xl p-12 text-center">
              <div className="w-16 h-16 bg-eco-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Filter className="w-8 h-8 text-eco-400" />
              </div>
              <p className="text-dark-muted">
                Select a control to view details and upload documents
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
