import { useState, useEffect } from 'react'
import { Download, TrendingUp, CheckCircle, AlertTriangle, XCircle, Leaf, Zap, Cloud } from 'lucide-react'
import { motion } from 'framer-motion'
import useComplianceStore from '../../store/complianceStore'
import ComplianceChart from './ComplianceChart'
import EmissionsChart from './EmissionsChart'
import ChatSection from '../chat/ChatSection'

export default function ComplianceDashboard() {
  const { controls, emissions, fetchResults, fetchEmissions } = useComplianceStore()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Fetch data on mount
    const loadData = async () => {
      setIsLoading(true)
      try {
        await Promise.all([fetchResults(), fetchEmissions()])
      } catch (error) {
        console.error('Failed to load dashboard data:', error)
      } finally {
        setIsLoading(false)
      }
    }
    loadData()
  }, [fetchResults, fetchEmissions])

  // Calculate statistics
  const stats = {
    total: controls.length,
    pass: controls.filter(c => c.verdict === 'Pass').length,
    partial: controls.filter(c => c.verdict === 'Partial').length,
    fail: controls.filter(c => c.verdict === 'Fail').length,
    avgScore: controls.length > 0 
      ? Math.round(controls.reduce((acc, c) => acc + (c.score || 0), 0) / controls.length)
      : 0,
  }

  const handleDownloadReport = async () => {
    try {
      const response = await fetch('/api/report/download')
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `compliance-report-${new Date().toISOString().split('T')[0]}.pdf`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error('Failed to download report:', error)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-dark-text mb-2">Compliance Buddy Dashboard</h1>
          <p className="text-dark-muted">Sustainable AI Validation Engine</p>
        </div>
        <button
          onClick={handleDownloadReport}
          className="flex items-center gap-2 px-4 py-2 eco-gradient text-white rounded-lg hover:shadow-lg transition-all duration-300"
        >
          <Download className="w-4 h-4" />
          Download Report
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-effect rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-eco-400/20 rounded-full flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-eco-400" />
            </div>
            <span className="text-xs text-dark-muted">Average</span>
          </div>
          <h3 className="text-3xl font-bold text-dark-text mb-1">{stats.avgScore}%</h3>
          <p className="text-sm text-dark-muted">Compliance Score</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-effect rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-blue-400/20 rounded-full flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-blue-400" />
            </div>
            <span className="text-xs text-dark-muted">Total</span>
          </div>
          <h3 className="text-3xl font-bold text-dark-text mb-1">{stats.total}</h3>
          <p className="text-sm text-dark-muted">Controls Validated</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-effect rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-green-400/20 rounded-full flex items-center justify-center">
              <Cloud className="w-6 h-6 text-green-400" />
            </div>
            <span className="text-xs text-dark-muted">Total</span>
          </div>
          <h3 className="text-3xl font-bold text-dark-text mb-1">
            {emissions?.total_emissions 
              ? emissions.total_emissions < 1 
                ? `${(emissions.total_emissions * 1000).toFixed(1)}g`
                : `${emissions.total_emissions.toFixed(2)}kg`
              : '0g'}
          </h3>
          <p className="text-sm text-dark-muted">CO₂ Emissions</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-effect rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-yellow-400/20 rounded-full flex items-center justify-center">
              <Zap className="w-6 h-6 text-yellow-400" />
            </div>
            <span className="text-xs text-dark-muted">Saved</span>
          </div>
          <h3 className="text-3xl font-bold text-dark-text mb-1">
            {emissions?.energy_saved || 0}%
          </h3>
          <p className="text-sm text-dark-muted">Energy Saved</p>
        </motion.div>
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-effect rounded-xl p-6"
        >
          <h3 className="text-lg font-semibold text-dark-text mb-4">Compliance Distribution</h3>
          <ComplianceChart data={stats} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="glass-effect rounded-xl p-6"
        >
          <h3 className="text-lg font-semibold text-dark-text mb-4">Emissions Over Time</h3>
          <EmissionsChart data={emissions?.history || []} />
        </motion.div>
      </div>

      {/* Results Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="glass-effect rounded-xl overflow-hidden"
      >
        <div className="p-6 border-b border-dark-border">
          <h3 className="text-lg font-semibold text-dark-text">Validation Results</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-dark-elevated">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-dark-muted uppercase tracking-wider">
                  Control Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-dark-muted uppercase tracking-wider">
                  Verdict
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-dark-muted uppercase tracking-wider">
                  Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-dark-muted uppercase tracking-wider">
                  Explanation
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-dark-muted uppercase tracking-wider">
                  Recommendation
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-border">
              {controls.map((control, index) => (
                <motion.tr
                  key={control.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 + index * 0.05 }}
                  className={`hover:bg-dark-elevated transition-colors ${
                    control.verdict === 'Pass' ? 'bg-green-500/5' :
                    control.verdict === 'Partial' ? 'bg-yellow-500/5' :
                    control.verdict === 'Fail' ? 'bg-red-500/5' : ''
                  }`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-dark-text">{control.name}</div>
                    <div className="text-xs text-dark-muted">{control.category}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {control.verdict ? (
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                        control.verdict === 'Pass' ? 'bg-green-500/20 text-green-400' :
                        control.verdict === 'Partial' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {control.verdict === 'Pass' && <CheckCircle className="w-3 h-3" />}
                        {control.verdict === 'Partial' && <AlertTriangle className="w-3 h-3" />}
                        {control.verdict === 'Fail' && <XCircle className="w-3 h-3" />}
                        {control.verdict}
                      </span>
                    ) : (
                      <span className="text-xs text-dark-muted">Pending</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {control.score !== null ? (
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-dark-elevated rounded-full h-2 w-16">
                          <div
                            className={`h-2 rounded-full ${
                              control.score >= 80 ? 'bg-green-400' :
                              control.score >= 60 ? 'bg-yellow-400' :
                              'bg-red-400'
                            }`}
                            style={{ width: `${control.score}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-dark-text">{control.score}%</span>
                      </div>
                    ) : (
                      <span className="text-xs text-dark-muted">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-dark-text max-w-md line-clamp-2">
                      {control.explanation || 'No explanation available'}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-dark-muted max-w-md line-clamp-2">
                      {control.recommendation || 'No recommendation'}
                    </p>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Chat Section */}
      <ChatSection />

      {/* Sustainability Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
        className="glass-effect rounded-xl p-6"
      >
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 eco-gradient rounded-full flex items-center justify-center">
            <Leaf className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-dark-text mb-1">Sustainable AI Impact</h3>
            <p className="text-sm text-dark-muted">
              Powered by Llama 3-8B • {emissions?.energy_saved || 0}% energy efficiency • 
              {emissions?.total_emissions 
                ? ` ${emissions.total_emissions < 1 
                  ? `${(emissions.total_emissions * 1000).toFixed(1)}g`
                  : `${emissions.total_emissions.toFixed(2)}kg`} CO₂ total`
                : ' 0g CO₂ total'}
            </p>
          </div>
          <div className="text-right">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-eco-400/20 rounded-full">
              <Leaf className="w-4 h-4 text-eco-400" />
              <span className="text-sm font-medium text-eco-400">CodeCarbon Tracked</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
