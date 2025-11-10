# Compliance Buddy Dashboard - Sustainable AI Validation Engine

## 🎯 Overview

A modern, eco-friendly web dashboard for real-time compliance validation powered by Llama 3-8B. Built with React.js, TailwindCSS, and Recharts for a hackathon-ready sustainable AI solution.

## ✨ Features

### 1. **Dashboard View**
- **Summary Cards**: Average Compliance Score, Total Controls, CO₂ Emissions, Energy Saved
- **Compliance Distribution Chart**: Donut chart showing Pass/Partial/Fail breakdown
- **Emissions Timeline**: Line chart tracking CO₂ emissions over validation runs
- **Results Table**: Color-coded rows with verdicts, scores, explanations, and recommendations
- **Sustainability Indicator**: Green leaf badge with CodeCarbon tracking

### 2. **Checklist View**
- Interactive compliance control cards
- Document upload functionality
- Real-time validation status
- Category filtering and search

### 3. **Chat Interface**
- Llama 3-8B powered assistant
- Context-aware responses
- Backend API integration
- Example queries: "Why did encryption fail?", "How can I improve my score?"

### 4. **Design Theme**
- **Primary Color**: `#00A676` (Eco Green)
- **Background**: `#E8F5E9` (Mint)
- **Accent**: `#1B4332` (Deep Green)
- **Text**: `#0B3D2E`
- **Dark Mode**: Eco night theme with toggle
- **Typography**: System fonts (Inter/Poppins fallback)
- **Animations**: Smooth transitions with Framer Motion

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Start development server
npm run dev
```

The dashboard will be available at `http://localhost:5173`

## 🔌 Backend Integration

### API Endpoints

The dashboard connects to the following FastAPI endpoints:

#### 1. **GET /api/results**
Fetch compliance validation results

**Response Format:**
```json
{
  "controls": [
    {
      "control": "Data Encryption Policy",
      "verdict": "Pass",
      "score": 92,
      "explanation": "AES-256 encryption verified",
      "recommendation": "Rotate keys every 6 months",
      "emissions": 0.0021
    }
  ]
}
```

#### 2. **GET /api/emissions**
Fetch CodeCarbon emissions data

**Response Format:**
```json
{
  "total_emissions": 0.0033,
  "energy_saved": 18,
  "avg_per_run": 0.0011,
  "history": [
    { "timestamp": "Run 1", "emissions": 0.0021 },
    { "timestamp": "Run 2", "emissions": 0.0019 }
  ]
}
```

#### 3. **POST /api/chat**
Send messages to Llama 3-8B

**Request:**
```json
{
  "message": "Why did encryption fail?"
}
```

**Response:**
```json
{
  "response": "Based on the analysis, the encryption control failed because..."
}
```

#### 4. **GET /api/report/download**
Download compliance report as PDF

Returns a file download with the generated report.

### Environment Configuration

Update `.env` file with your backend URL:

```env
VITE_API_URL=http://localhost:8000/api
```

## 📊 Mock Data

The dashboard includes mock data for demo purposes when the backend is unavailable:

- **5 Sample Controls**: Data Encryption, Access Control, Data Retention, Incident Response, Security Audits
- **Mock Verdicts**: Pass (60%), Partial (20%), Fail (20%)
- **Mock Emissions**: 0.0033 kg CO₂ total, 18% energy saved
- **Mock Chat Responses**: Context-aware compliance assistance

## 🎨 Component Structure

```
src/
├── components/
│   ├── dashboard/
│   │   ├── ComplianceDashboard.jsx    # Main dashboard view
│   │   ├── ComplianceChart.jsx        # Donut chart component
│   │   └── EmissionsChart.jsx         # Line chart component
│   ├── compliance/
│   │   ├── ComplianceChecklist.jsx    # Checklist view
│   │   ├── ControlCard.jsx            # Individual control cards
│   │   └── ControlDetail.jsx          # Control detail panel
│   ├── chat/
│   │   └── ChatBot.jsx                # Chat interface
│   ├── metrics/
│   │   └── SustainabilityMetrics.jsx  # Metrics panel
│   └── layout/
│       └── Header.jsx                 # App header
├── store/
│   └── complianceStore.js             # Zustand state management
└── App.jsx                            # Main app component
```

## 🌱 Sustainability Features

1. **Energy-Efficient Model**: Llama 3-8B uses 70% less compute than larger alternatives
2. **CodeCarbon Integration**: Real-time CO₂ tracking for all validations
3. **Optimized Rendering**: Lazy loading and efficient re-renders
4. **Dark Mode**: Reduces screen energy consumption
5. **Reduced Motion**: Accessibility and sustainability option

## 🎯 Hackathon Highlights

### Innovation
- ✅ Sustainable AI with Llama 3-8B
- ✅ Real-time emissions tracking
- ✅ Interactive compliance validation
- ✅ RAG-powered chat assistant

### Design
- ✅ Modern, eco-friendly aesthetic
- ✅ Responsive grid layout
- ✅ Smooth animations
- ✅ Dark/Light mode toggle
- ✅ Accessibility (WCAG 2.1 AA)

### Technical Stack
- ✅ React 18 with Hooks
- ✅ TailwindCSS for styling
- ✅ Recharts for visualizations
- ✅ Framer Motion for animations
- ✅ Zustand for state management
- ✅ Vite for fast builds

## 📱 Responsive Design

- **Mobile**: Optimized for 320px+
- **Tablet**: Enhanced layout for 768px+
- **Desktop**: Full experience at 1024px+

## 🔧 Build & Deploy

```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to Netlify/Vercel
# Connect your repo and deploy!
```

## 🐛 Troubleshooting

### Backend Connection Issues
- Ensure backend is running on `http://localhost:8000`
- Check CORS settings in FastAPI
- Verify API endpoints match the store configuration

### Chart Not Displaying
- Check if data format matches expected structure
- Ensure recharts is installed: `npm install recharts`

### Dark Mode Not Working
- Clear browser cache
- Check if `darkMode: 'class'` is set in tailwind.config.js

## 📄 License

MIT License - See LICENSE file for details

## 🤝 Contributing

This is a hackathon project. Feel free to fork and enhance!

## 📞 Support

For issues or questions, please open a GitHub issue.

---

**Built with 💚 for Sustainable AI**

Powered by Llama 3-8B • Tracked by CodeCarbon • Designed for the Future
