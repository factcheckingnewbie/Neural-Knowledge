const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./public/index.html",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: colors.blue,
        secondary: colors.green,
        accent: colors.purple,
        muted: colors.gray,
        destructive: colors.red,
        background: colors.white,
        "background-dark": colors.gray[900],
        foreground: colors.black,
        "foreground-dark": colors.gray[100],
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
