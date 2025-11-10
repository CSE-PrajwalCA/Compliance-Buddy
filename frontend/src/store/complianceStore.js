import { create } from 'zustand'

// API Base URL - update this to match your backend
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

const useComplianceStore = create((set, get) => ({
  controls: [
    {
      id: 'ctrl-001',
      name: 'Data Encryption Policy',
      category: 'Security',
      description: 'All sensitive data must be encrypted when stored',
      status: 'pending', // pending, processing, compliant, non-compliant
      score: null,
      verdict: null,
      explanation: null,
      recommendation: null,
      documents: [],
      timestamp: null,
      emissions: null,
    },
    {
      id: 'ctrl-002',
      name: 'Access Control Policy',
      category: 'Security',
      description: 'Role-based access control must be implemented',
      status: 'pending',
      score: null,
      verdict: null,
      explanation: null,
      recommendation: null,
      documents: [],
      timestamp: null,
      emissions: null,
    },
    {
      id: 'ctrl-003',
      name: 'Data Retention Policy',
      category: 'Privacy',
      description: 'Clear data retention and deletion policies must exist',
      status: 'pending',
      score: null,
      verdict: null,
      explanation: null,
      recommendation: null,
      documents: [],
      timestamp: null,
      emissions: null,
    },
    {
      id: 'ctrl-004',
      name: 'Incident Response Plan',
      category: 'Security',
      description: 'Documented incident response procedures',
      status: 'pending',
      score: null,
      verdict: null,
      explanation: null,
      recommendation: null,
      documents: [],
      timestamp: null,
      emissions: null,
    },
    {
      id: 'ctrl-005',
      name: 'Regular Security Audits',
      category: 'Compliance',
      description: 'Quarterly security audits and assessments',
      status: 'pending',
      score: null,
      verdict: null,
      explanation: null,
      recommendation: null,
      documents: [],
      timestamp: null,
      emissions: null,
    },
  ],

  emissions: {
    total_emissions: 0,
    energy_saved: 0,
    avg_per_run: 0,
    history: [],
  },

  selectedControl: null,
  
  setSelectedControl: (controlId) => set({ selectedControl: controlId }),
  
  uploadDocuments: (controlId, files) => set((state) => ({
    controls: state.controls.map((ctrl) =>
      ctrl.id === controlId
        ? { ...ctrl, documents: [...ctrl.documents, ...files], status: 'processing' }
        : ctrl
    ),
  })),

  updateControlVerdict: (controlId, verdict) => set((state) => ({
    controls: state.controls.map((ctrl) =>
      ctrl.id === controlId
        ? { 
            ...ctrl, 
            status: verdict.status,
            score: verdict.score,
            verdict: verdict.verdict,
            explanation: verdict.explanation,
            timestamp: new Date().toISOString(),
          }
        : ctrl
    ),
  })),

  resetControl: (controlId) => set((state) => ({
    controls: state.controls.map((ctrl) =>
      ctrl.id === controlId
        ? { 
            ...ctrl, 
            status: 'pending',
            score: null,
            verdict: null,
            explanation: null,
            recommendation: null,
            documents: [],
            timestamp: null,
            emissions: null,
          }
        : ctrl
    ),
  })),

  // Fetch compliance results from backend
  fetchResults: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/results`)
      if (!response.ok) throw new Error('Failed to fetch results')
      
      const data = await response.json()
      
      // Update controls with backend data
      if (data.controls && Array.isArray(data.controls)) {
        set((state) => ({
          controls: state.controls.map((ctrl) => {
            const backendControl = data.controls.find(
              bc => bc.control.toLowerCase() === ctrl.name.toLowerCase()
            )
            if (backendControl) {
              return {
                ...ctrl,
                verdict: backendControl.verdict,
                score: backendControl.score,
                explanation: backendControl.explanation,
                recommendation: backendControl.recommendation,
                emissions: backendControl.emissions,
                status: backendControl.verdict === 'Pass' ? 'compliant' : 
                        backendControl.verdict === 'Fail' ? 'non-compliant' : 'pending',
                timestamp: new Date().toISOString(),
              }
            }
            return ctrl
          })
        }))
      }
      
      return data
    } catch (error) {
      console.error('Error fetching results:', error)
      // Use mock data for demo
      set((state) => ({
        controls: state.controls.map((ctrl, index) => {
          const mockVerdicts = ['Pass', 'Pass', 'Partial', 'Pass', 'Fail']
          const mockScores = [92, 88, 75, 95, 45]
          return {
            ...ctrl,
            verdict: mockVerdicts[index],
            score: mockScores[index],
            explanation: `${ctrl.name} has been validated. ${mockVerdicts[index] === 'Pass' ? 'All requirements met.' : 'Some improvements needed.'}`,
            recommendation: mockVerdicts[index] === 'Pass' ? 'Maintain current standards' : 'Review and update documentation',
            emissions: 0.0021,
            status: mockVerdicts[index] === 'Pass' ? 'compliant' : 
                   mockVerdicts[index] === 'Fail' ? 'non-compliant' : 'pending',
            timestamp: new Date().toISOString(),
          }
        })
      }))
    }
  },

  // Fetch emissions data from backend
  fetchEmissions: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/emissions`)
      if (!response.ok) throw new Error('Failed to fetch emissions')
      
      const data = await response.json()
      set({ emissions: data })
      return data
    } catch (error) {
      console.error('Error fetching emissions:', error)
      // Use mock data for demo
      set({
        emissions: {
          total_emissions: 0.0033,
          energy_saved: 18,
          avg_per_run: 0.0011,
          history: [
            { timestamp: 'Run 1', emissions: 0.0021 },
            { timestamp: 'Run 2', emissions: 0.0019 },
            { timestamp: 'Run 3', emissions: 0.0023 },
            { timestamp: 'Run 4', emissions: 0.0018 },
            { timestamp: 'Run 5', emissions: 0.0020 },
          ]
        }
      })
    }
  },

  // Send chat message to backend
  sendChatMessage: async (message) => {
    try {
      const response = await fetch(`${API_BASE_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      })
      
      if (!response.ok) throw new Error('Failed to send message')
      
      const data = await response.json()
      return data.response || data.message
    } catch (error) {
      console.error('Error sending chat message:', error)
      // Return mock response
      return "I'm your Compliance Assistant powered by Llama 3-8B. I can help explain verdicts and provide recommendations based on your compliance data."
    }
  },
}))

export default useComplianceStore
