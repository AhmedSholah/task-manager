/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: 'preset' is required for NativeWind v4
  presets: [require("nativewind/preset")],
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#39E079",
        "background-light": "#f6f8f7",
        "background-dark": "#122017",
        "card-light": "#FFFFFF",
        "card-dark": "#1F2937",
        "priority-high": "#EF4444",
        "priority-medium": "#F59E0B",
        "priority-low": "#10B981",
      },
      fontFamily: {
        display: ["Inter"],
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px",
      },
    },
  },
  plugins: [],
};
