/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: '#0a0a0f',
          card: '#12121a',
          accent: '#00ff88',       // Neon matrix green
          magenta: '#ff00ff',      // Neon magenta
          cyan: '#00d4ff',         // Neon cyan
          yellow: '#ffcc00',
          border: '#2a2a3a',
          text: '#e0e0e0',
        },
        vapor: {
          bg: '#090014',
          card: 'rgba(26, 16, 60, 0.85)',
          magenta: '#FF00FF',
          cyan: '#00FFFF',
          orange: '#FF9900',
          purple: '#2D1B4E',
          text: '#E0E0E0',
        },
        retro: {
          bg: '#C0C0C0',
          navy: '#000080',
          navyLight: '#1084D0',
          blue: '#0000FF',
          yellow: '#FFFFCC',
          darkGray: '#808080',
          lightGray: '#DFDFDF',
          red: '#FF0000',
          green: '#00AA00',
        }
      },
      fontFamily: {
        heading: ['Orbitron', 'sans-serif'],
        mono: ['Share Tech Mono', 'Courier New', 'monospace'],
        retro: ['"MS Sans Serif"', 'Segoe UI', 'Tahoma', 'sans-serif'],
        impact: ['"Arial Black"', 'Impact', 'sans-serif']
      },
      boxShadow: {
        'neon-green': '0 0 10px #00ff88, 0 0 20px rgba(0, 255, 136, 0.4)',
        'neon-magenta': '0 0 10px #ff00ff, 0 0 20px rgba(255, 0, 255, 0.4)',
        'neon-cyan': '0 0 10px #00ffff, 0 0 20px rgba(0, 255, 255, 0.4)',
        'win95-outset': 'inset -1px -1px 0 #404040, inset 1px 1px 0 #dfdfdf',
        'win95-inset': 'inset 1px 1px 0 #404040, inset -1px -1px 0 #dfdfdf',
      }
    },
  },
  plugins: [],
}
