/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        headerDark: "#1e293b",
        headerLight: "#334155",

        textPrimaryLight: "#f1f5f9",
        textPrimaryDark: "#0f172a",

        textSecondaryLight: "#94a3b8",
        textSecondaryDark: "#64748b",
      },
    },
    fontFamily: {
      sans: ["Inter", "sans-serif"],
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant("autofill", "&:-webkit-autofill");
    },
  ],
};
