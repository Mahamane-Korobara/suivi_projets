/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#0a0e1a',
          card: '#13182b',
          hover: '#1a2038',
        },
        primary: {
          blue: '#3b82f6',
          green: '#10b981',
          orange: '#f59e0b',
          pink: '#ec4899',
          purple: '#8b5cf6',
        }
      },
      boxShadow: {
        'glow-blue': '0 0 20px rgba(59, 130, 246, 0.3)',
        'glow-green': '0 0 20px rgba(16, 185, 129, 0.3)',
        'glow-orange': '0 0 20px rgba(245, 158, 11, 0.3)',
      }
    },
  },
  plugins: [],
}