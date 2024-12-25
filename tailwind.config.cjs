// module.exports 
export default {
    content: [
      "./src/**/*.{js,ts,jsx,tsx}",
      "node_modules/flowbite/**/*.js",
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
            typing: "typing 3s steps(30, end) forwards, blink 0.5s step-end infinite",
          },
          keyframes: {
            slideDown: {
              '0%': { transform: 'translateY(-1000px)', opacity: '0' },
              '100%': { transform: 'translateY(0)', opacity: '1' },
            },
            typing: {
              "0%": { width: "0" },
              "100%": { width: "100%" },
            },
            blink: {
              "0%, 100%": { "border-color": "transparent" },
              "50%": { "border-color": "gray" },
            },    
          },
      },
    },
    corePlugins: {
        preflight: false, // This turns off Tailwind’s base styles
      },
    plugins: [
        require('@tailwindcss/aspect-ratio'),
        require('flowbite/plugin'),
        function({ addUtilities }) {
          addUtilities({
            '.scrollbar-none': {
              '-ms-overflow-style': 'none', /* Internet Explorer 10+ */
              'scrollbar-width': 'none', /* Firefox */
            },
            '.scrollbar-none::-webkit-scrollbar': {
              display: 'none', /* Safari and Chrome */
            },
          });}
    ],
  };