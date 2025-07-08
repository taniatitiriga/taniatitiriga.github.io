/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    // We remove the extend block to avoid defining unused font utilities.
    extend: {}, 
  },
  plugins: [],
};