/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'neon-blue': '#00ffff',
        'neon-purple': '#8b5cf6',
        'neon-pink': '#ff00ff',
        'dark-bg': '#0a0a0a',
      },
      fontFamily: {
        'space': ['Space Grotesk', 'sans-serif'],
      },
      animation: {
        'pulse-glow': 'pulse-glow 0.3s ease-in-out',
        'attack-flash': 'attack-flash 0.5s ease-in-out',
        'float-up': 'float-up 1s ease-out forwards',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(139, 92, 246, 0.5)' },
          '50%': { boxShadow: '0 0 40px rgba(139, 92, 246, 1)' },
        },
        'attack-flash': {
          '0%': { backgroundColor: 'transparent' },
          '50%': { backgroundColor: 'rgba(239, 68, 68, 0.8)' },
          '100%': { backgroundColor: 'transparent' },
        },
        'float-up': {
          '0%': { opacity: 1, transform: 'translateY(0px)' },
          '100%': { opacity: 0, transform: 'translateY(-100px)' },
        },
      },
    },
  },
  plugins: [],
}
