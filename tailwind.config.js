/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundColor: {
        profile: '#0B1B2B',
      },
      colors: {
        blue: '#3294F8',
        baseTitle: '#E7EDF4',
        baseSubtitle: '#C4D4E3',
        baseText: '#AFC2D4',
        baseSpan: '#7B96B2',
        baseLabel: '#3A536B',
        baseBorder: '#1C2F41',
        basePost: '#112131',
        baseProfile: '#0B1B2B',
        baseBackground: '#071422',
        baseInput: '#040F1A',
      },
      fontFamily: {
        nunito: ['"Nunito", "serif"'],
      },
      fontWeight: {
        nunito400: '400', // Peso 700
        nunito700: '700', // Peso 800
      },
      lineHeight: {
        130: '1.3', // 130% como uma fração (1.3)
        160: '1.6', // 130% como uma fração (1.3)
      },
    },
  },
  plugins: [],
}
