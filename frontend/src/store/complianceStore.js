import { create } from 'zustand'

const useComplianceStore = create((set) => ({
  controls: [
    {
      id: 'ctrl-001',
      name: 'Data Encryption at Rest',
      category: 'Security',
      description: 'All sensitive data must be encrypted when stored',
      status: 'pending', // pending, processing, compliant, non-compliant
      score: null,
      verdict: null,
      explanation: null,
      documents: [],
      timestamp: null,
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
      documents: [],
      timestamp: null,
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
      documents: [],
      timestamp: null,
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
      documents: [],
      timestamp: null,
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
      documents: [],
      timestamp: null,
    },
  ],

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
            documents: [],
            timestamp: null,
          }
        : ctrl
    ),
  })),
}))

export default useComplianceStore
