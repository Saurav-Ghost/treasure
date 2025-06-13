export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
      },
      animation: {
        'pulse': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fadeIn': 'fadeIn 0.2s ease-out forwards',
        'gradient': 'gradient 8s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'bounce': 'bounce 1s infinite',
        'winReveal': 'winReveal 0.5s ease-out forwards',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        winReveal: {
          '0%': { 
            opacity: '0',
            transform: 'translate(-50%, -50%) scale(0.8)'
          },
          '50%': {
            opacity: '1',
            transform: 'translate(-50%, -50%) scale(1.1)'
          },
          '100%': {
            opacity: '1',
            transform: 'translate(-50%, -50%) scale(1)'
          }
        },
      },
    },
  },
  plugins: [],
}