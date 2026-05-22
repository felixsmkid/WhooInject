/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neon-cyan': '#00f5ff',
        'neon-purple': '#b347ea',
        'neon-pink': '#ff2d7b',
        'dark': {
          900: '#0a0a0f',
          800: '#12121a',
          700: '#1a1a2e',
          600: '#252540',
          500: '#2d2d4a',
        },
        'glass': {
          light: 'rgba(255, 255, 255, 0.05)',
          medium: 'rgba(255, 255, 255, 0.08)',
          heavy: 'rgba(255, 255, 255, 0.12)',
        }
      },
      boxShadow: {
        'neon-cyan': '0 0 20px rgba(0, 245, 255, 0.3)',
        'neon-purple': '0 0 20px rgba(179, 71, 234, 0.3)',
        'neon-pink': '0 0 20px rgba(255, 45, 123, 0.3)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.4)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite alternate',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        'glow-pulse': {
          '0%': { opacity: '0.5' },
          '100%': { opacity: '1' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
    },
  },
  plugins: [],
}
