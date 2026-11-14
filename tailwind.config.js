/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        houzez: {
          primary: "#0054a6",      // Classic Houzez Blue
          primaryDark: "#003b75",
          primaryLight: "#eaf3ff",
          accent: "#ff5a5f",       // Houzez Coral Accent
          accentHover: "#e0484d",
          dark: "#0b132b",         // Deep Navy for headers
          surface: "#f7f8f9",      // Soft Gray Background
          border: "#e5e7eb",
          muted: "#6b7280",
          success: "#059669",
          warning: "#d97706"
        }
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
      },
      boxShadow: {
        'houzez': '0 4px 20px -2px rgba(0, 0, 0, 0.08)',
        'houzez-hover': '0 12px 30px -4px rgba(0, 0, 0, 0.12)',
        'card': '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
      }
    },
  },
  plugins: [],
};
