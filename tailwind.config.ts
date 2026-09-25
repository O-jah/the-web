import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // OJAH Brand Toolkit — Volume 1 palette
        primary: '#2E6FAE', // theme primary — same value as ojblue, used for buttons/links/focus
        ink: '#0B1D3A', // text, authority
        ojblue: '#2E6FAE', // primary, logo
        horizon: '#88B6E2', // charts, emphasis
        mist: '#D6E4F2', // tints, borders
        cloud: '#F2F6FB', // backgrounds
        paper: '#FFFFFF', // base white
        red: '#C8102E', // Imperial Red — bold accent (Donate)
        orange: '#BF5700', // Burnt Orange — warm accent
      },
      fontFamily: {
        sans: ['var(--font-poppins)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-lora)', 'Georgia', 'serif'],
      },
      maxWidth: {
        content: '80ch',
      },
      backgroundImage: {
        'contour-ridge': "url('/images/page-texture.jpg')",
      },
    },
  },
  plugins: [],
}
export default config
