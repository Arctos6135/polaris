/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    colors: {
      primary: "rgb(var(--color-primary) / <alpha-value>)",
      secondary: "rgb(var(--color-secondary) / <alpha-value>)",
      text: "rgb(var(--color-text) / <alpha-value>)",
      success: "rgb(var(--color-success) / <alpha-value>)",
      error: "rgb(var(--color-error) / <alpha-value>)",
      background: "rgb(var(--color-background) / <alpha-value>)",
      white: "rgb(255 255 255 / <alpha-value>)",
      black: "rgb(0 0 0 / <alpha-value>)",
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
