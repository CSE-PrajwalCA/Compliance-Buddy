# Compliance Buddy - Sustainable AI Frontend

A modern, energy-efficient frontend for AI-powered compliance verification built with React, Vite, and TailwindCSS.

## 🌱 Sustainable Design Principles

This application is designed with sustainability at its core:

- **Dark Mode First**: Reduces energy consumption on OLED/AMOLED displays
- **Optimized Animations**: GPU-accelerated CSS animations with reduced motion support
- **Lazy Loading**: Components and routes load only when needed
- **Minimal Bundle Size**: Code splitting and tree shaking for smaller downloads
- **Efficient State Management**: Zustand for lightweight, performant state handling
- **Green Color Palette**: Eco-friendly theme reflecting environmental consciousness

## 🚀 Features

### Core Functionality
- **Compliance Checklist**: Interactive control management with real-time status updates
- **Document Upload**: Drag-and-drop file upload with multiple format support
- **AI Verification**: Powered by energy-efficient Llama 3.1 8B model
- **Verdict Display**: Real-time compliance scores and detailed explanations
- **Smart Chatbot**: Context-aware assistance for compliance questions
- **Sustainability Metrics**: Live tracking of environmental impact

### UI/UX Highlights
- **Modular Components**: Reusable, accessible component library
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Smooth Animations**: Framer Motion for delightful interactions
- **Glass Morphism**: Modern, elegant visual design
- **Status Indicators**: Clear visual feedback for all actions

## 📦 Tech Stack

- **React 18**: Modern React with hooks and concurrent features
- **Vite**: Lightning-fast build tool and dev server
- **TailwindCSS**: Utility-first CSS framework
- **Zustand**: Lightweight state management
- **Framer Motion**: Production-ready animation library
- **Lucide React**: Beautiful, consistent icon set

## 🛠️ Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/
│   ├── chat/
│   │   └── ChatBot.jsx          # AI assistant interface
│   ├── compliance/
│   │   ├── ComplianceChecklist.jsx  # Main checklist view
│   │   ├── ControlCard.jsx          # Individual control card
│   │   ├── ControlDetail.jsx        # Detail panel with upload
│   │   └── VerdictDisplay.jsx       # Verdict visualization
│   ├── layout/
│   │   └── Header.jsx               # App header
│   ├── metrics/
│   │   └── SustainabilityMetrics.jsx # Environmental dashboard
│   └── ui/
│       ├── Button.jsx               # Reusable button
│       ├── Card.jsx                 # Card container
│       └── FileUpload.jsx           # File upload component
├── store/
│   └── complianceStore.js       # Zustand state management
├── App.jsx                      # Main app component
├── main.jsx                     # App entry point
└── index.css                    # Global styles
```

## 🎨 Design System

### Colors
- **Eco Green**: Primary brand color (#22c55e - #14532d)
- **Dark Background**: Energy-efficient dark theme
- **Semantic Colors**: Status-based color coding

### Typography
- System font stack for optimal performance
- Responsive font sizes
- Accessible contrast ratios

### Components
All components follow:
- Accessibility best practices (ARIA labels, keyboard navigation)
- Responsive design patterns
- Performance optimization (memoization, lazy loading)

## 🔌 API Integration

The frontend expects the following API endpoints:

```javascript
// Upload documents
POST /api/controls/:controlId/documents

// Verify compliance
POST /api/controls/:controlId/verify

// Chat with assistant
POST /api/chat
```

## 🌍 Sustainability Impact

### Energy Efficiency
- **70% less compute** compared to larger AI models
- **Dark mode default** reduces display power consumption
- **Optimized rendering** minimizes CPU/GPU usage

### Performance Metrics
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.5s
- **Bundle Size**: < 200KB (gzipped)

## 🎯 Hackathon Theme: Sustainable AI

This project demonstrates sustainable AI practices through:

1. **Efficient Model Selection**: Llama 3.1 8B balances performance and energy use
2. **Smart Caching**: Reduces redundant API calls
3. **Optimized Frontend**: Minimal resource consumption
4. **Real-time Metrics**: Transparent environmental impact tracking
5. **User Education**: Built-in sustainability information

## 🔧 Configuration

### Environment Variables
Create a `.env` file:

```env
VITE_API_URL=http://localhost:8000
VITE_WS_URL=ws://localhost:8000
```

### Customization
- Modify `tailwind.config.js` for theme customization
- Update `src/store/complianceStore.js` for control definitions
- Adjust `vite.config.js` for build optimization

## 📱 Browser Support

- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

1. Follow the existing code style
2. Write meaningful commit messages
3. Test on multiple devices/browsers
4. Ensure accessibility compliance
5. Optimize for performance

## 📄 License

MIT License - feel free to use this project for your hackathon!

## 🎉 Acknowledgments

Built for the Sustainable AI Hackathon with a focus on environmental responsibility and user experience excellence.
