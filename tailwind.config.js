module.exports = {
  purge: [
    // "./pages/**/*.{js,ts,jsx,tsx}",
  //  "./components/**/*.{js,ts,jsx,tsx}",
   "./src/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      height: {
        "30vw": "30vw",
        "20vw": "20vw",
        "8vw": "8vw",
      },
      fontSize: {
        "20vw": "20vw",
        "30vw": "30vw",
        "10vw": "10vw",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
