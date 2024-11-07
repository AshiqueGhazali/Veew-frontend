module.exports = {
    content: [
      "./src/**/*.{js,ts,jsx,tsx}", 
    ],
    theme: {
      extend: {
        colors: {
            customPurple: '#640133',
            darkBlue: '#002e51',
            secondaryColor: '#937e54',
          },
          gridTemplateRows: {
            '[auto,auto,1fr]': 'auto auto 1fr',
          },
          animation: {
            'slide-down': 'slideDown 1s ease-out forwards',
          },
          keyframes: {
            slideDown: {
              '0%': { transform: 'translateY(-1000px)', opacity: '0' },
              '100%': { transform: 'translateY(0)', opacity: '1' },
            },
          },
      },
    },
    corePlugins: {
        preflight: false, // This turns off Tailwind’s base styles
      },
    plugins: [
        require('@tailwindcss/aspect-ratio'),
    ],
  };