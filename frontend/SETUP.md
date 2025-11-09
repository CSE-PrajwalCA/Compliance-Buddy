# Quick Setup Guide

## Prerequisites
- Node.js 18+ and npm

## Installation Steps

```bash
# 1. Navigate to frontend directory
cd frontend

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

The application will be available at `http://localhost:3000`

## First Time Setup

### 1. Install Dependencies
```bash
npm install
```

This installs:
- React 18.2.0
- Vite 5.0.8
- TailwindCSS 3.4.0
- Framer Motion 10.16.4
- Zustand 4.4.7
- Lucide React 0.294.0

### 2. Environment Configuration (Optional)
Create a `.env` file in the frontend directory:

```env
VITE_API_URL=http://localhost:8000
VITE_WS_URL=ws://localhost:8000
```

### 3. Run Development Server
```bash
npm run dev
```

The dev server includes:
- Hot Module Replacement (HMR)
- Fast refresh for React components
- Instant updates on file changes

### 4. Build for Production
```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

### 5. Preview Production Build
```bash
npm run preview
```

## Troubleshooting

### Port Already in Use
If port 3000 is occupied, Vite will automatically use the next available port.

### Dependencies Installation Issues
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Build Errors
Ensure you're using Node.js 18 or higher:
```bash
node --version
```

## Development Tips

### Hot Reload
Save any file to see changes instantly in the browser.

### Component Development
- All components are in `src/components/`
- Use existing components as templates
- Follow the established naming conventions

### State Management
- Global state is managed with Zustand in `src/store/`
- Keep state minimal and focused

### Styling
- Use TailwindCSS utility classes
- Custom colors are defined in `tailwind.config.js`
- Dark mode is enabled by default

## Next Steps

1. **Customize Controls**: Edit `src/store/complianceStore.js` to add your compliance controls
2. **Connect Backend**: Update API endpoints in your components
3. **Add Features**: Build on the modular component structure
4. **Deploy**: Use `npm run build` and deploy the `dist` folder

## Performance Optimization

The app is already optimized with:
- Code splitting
- Tree shaking
- Lazy loading
- Optimized bundle size
- GPU-accelerated animations

## Accessibility

All components include:
- ARIA labels
- Keyboard navigation
- Screen reader support
- Focus management

## Browser Support

Tested on:
- Chrome 120+
- Firefox 120+
- Safari 17+
- Edge 120+

Enjoy building with Compliance Buddy! 🌱
