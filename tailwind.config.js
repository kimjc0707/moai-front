/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "!./src/components/survey/ExpenseStep.js",
    "!./src/components/survey/IncomeStep.js",
    "!./src/components/survey/ItemListEditor.js",
    "!./src/pages/survey.js",
    "!./src/components/header.js",
    "!./src/components/survey/CategoryListEditor.js"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

