/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        }
      },
      animation: {
        wigglex: 'wiggle 1s ease-in-out infinite',
      },
      width: {
        '1/100': '1%',
        '0/100': '0.1%'
      },
      aspectRatio: {
        '4/16': '16 / 4',
      },
      colors: {
        'primary':'#0052CC',
        'purple': '#5243AA',
        'neutral-600': '#42526E',
      }
    },
  },
  plugins: [],
}
