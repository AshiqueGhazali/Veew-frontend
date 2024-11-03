module.exports = {
    content: [
      "./src/**/*.{js,ts,jsx,tsx}", // Include paths for your files
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
      },
    },
    corePlugins: {
        preflight: false, // This turns off Tailwind’s base styles
      },
    plugins: [
        require('@tailwindcss/aspect-ratio'),
    ],
  };