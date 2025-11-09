import { useState } from 'react'
import { Upload, Sparkles, RefreshCw, AlertCircle } from 'lucide-react'
import useComplianceStore from '../../store/complianceStore'
import FileUpload from '../ui/FileUpload'
import Button from '../ui/Button'
import VerdictDisplay from './VerdictDisplay'

export default function ControlDetail({ controlId }) {
  const { controls, uploadDocuments, updateControlVerdict, resetControl } = useComplianceStore()
  const control = controls.find(c => c.id === controlId)
  const [isVerifying, setIsVerifying] = useState(false)

  if (!control) return null

  const handleFileSelect = (files) => {
    uploadDocuments(controlId, files)
  }

  const handleVerify = async () => {
    setIsVerifying(true)
    
    // Simulate API call to backend
    setTimeout(() => {
      // Mock verdict response
      const mockScore = Math.floor(Math.random() * 40) + 60 // 60-100
      const isCompliant = mockScore >= 70
      
      updateControlVerdict(controlId, {
        status: isCompliant ? 'compliant' : 'non-compliant',
        score: mockScore,
        verdict: isCompliant ? 'Compliant' : 'Non-Compliant',
        explanation: isCompliant 
          ? 'The provided documentation meets all required compliance criteria. Encryption protocols are properly documented and implemented according to industry standards.'
          : 'The documentation is incomplete. Missing evidence of encryption key management procedures and annual security audits. Please provide additional documentation.',
      })
      
      setIsVerifying(false)
    }, 3000)
  }

  const handleReset = () => {
    resetControl(controlId)
  }

  return (
    <div className="glass-effect rounded-xl p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <div className="flex items-start justify-between mb-2">
          <h2 className="text-xl font-bold text-dark-text">{control.name}</h2>
          <span className="text-xs px-2 py-1 rounded-full bg-eco-600/20 text-eco-400">
            {control.category}
          </span>
        </div>
        <p className="text-sm text-dark-muted">{control.description}</p>
      </div>

      {/* File Upload */}
      <div>
        <label className="block text-sm font-medium text-dark-text mb-3">
          Supporting Documents
        </label>
        <FileUpload onFileSelect={handleFileSelect} multiple />
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button
          variant="primary"
          icon={Sparkles}
          onClick={handleVerify}
          disabled={control.documents.length === 0 || isVerifying}
          loading={isVerifying}
          className="flex-1"
        >
          {isVerifying ? 'Verifying...' : 'Verify Compliance'}
        </Button>
        
        {control.status !== 'pending' && (
          <Button
            variant="ghost"
            icon={RefreshCw}
            onClick={handleReset}
          >
            Reset
          </Button>
        )}
      </div>

      {/* Verification Info */}
      {control.documents.length === 0 && (
        <div className="flex items-start gap-3 p-4 rounded-lg bg-yellow-400/10 border border-yellow-400/20">
          <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="text-yellow-400 font-medium mb-1">No documents uploaded</p>
            <p className="text-dark-muted">
              Upload supporting documents to verify compliance for this control.
            </p>
          </div>
        </div>
      )}

      {/* Verdict Display */}
      {control.verdict && (
        <VerdictDisplay
          verdict={control.verdict}
          score={control.score}
          explanation={control.explanation}
          timestamp={control.timestamp}
        />
      )}
    </div>
  )
}
