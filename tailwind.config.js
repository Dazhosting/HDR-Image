/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // Sertakan ini jika Anda menggunakan App Router
  ],
  theme: {
    extend: {
      // Anda bisa menambahkan ekstensi tema di sini
    },
  },
  plugins: [],
};
