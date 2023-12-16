/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      
      backgroundColor: theme => ({
        ...theme('colors'),
      'primary': '#3490dc',
      'secondary': '#ffed4a',
      'danger': '#e3342f',
      'blackTheme': '#141414',
      "whiterBlack": '#2B2B2B' ,
      "purple": '#20124d',
      "purpleHover": '#674ea7',

      
       })
       
       
    }
    
    
  },
  plugins: []
}
