/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Sustainable green palette - Hackathon Theme
        eco: {
          50: '#E8F5E9',
          100: '#C8E6C9',
          200: '#A5D6A7',
          300: '#81C784',
          400: '#00A676', // Primary eco green
          500: '#00A676',
          600: '#00926A',
          700: '#007D5C',
          800: '#1B4332', // Deep green accent
          900: '#0B3D2E', // Text color
          950: '#052e16',
        },
        // Mint background
        mint: {
          50: '#E8F5E9',
          100: '#E8F5E9',
          200: '#d4ede6',
          300: '#c0e5dd',
        },
        // Dark mode optimized colors
        dark: {
          bg: '#0a0f0d',
          surface: '#111816',
          elevated: '#1a221f',
          border: '#2d3935',
          text: '#e8f5e9',
          muted: '#8fa89a',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}
