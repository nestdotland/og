const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");

const customColors = {
  transparent: "transparent",
  bg: "#111827",
  fg: "#F3F4F6",
  accent: "#7C3AED",
};

module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // 'media' or 'class'
  theme: {
    fontFamily: {
      mono: ["JetBrains Mono", ...defaultTheme.fontFamily.mono],
      sans: ["Inter", ...defaultTheme.fontFamily.sans],
      serif: ["Lora", ...defaultTheme.fontFamily.serif],
    },
    colors: {
      ...colors,
      ...customColors,
      gray: colors.coolGray,
      white: colors.white,
      black: colors.black,
    },
  },
  variants: {
    extend: {},
  },
};
