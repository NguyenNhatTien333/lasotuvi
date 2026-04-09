import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Ngũ hành colors — Kim/Thổ theo spec-2.md, Mộc/Thủy/Hỏa giữ Tailwind
        kim: '#D4AF37',  // Kim (Metal) - Vàng đồng
        moc: '#10B981',  // Mộc (Wood) - Xanh lá (Tailwind emerald)
        thuy: '#3B82F6', // Thủy (Water) - Xanh dương (Tailwind blue)
        hoa: '#EF4444',  // Hỏa (Fire) - Đỏ (Tailwind red)
        tho: '#A52A2A',  // Thổ (Earth) - Nâu đậm (spec)
      },
      fontFamily: {
        serif: ['Noto Serif', 'Georgia', 'Times New Roman', 'serif'],
      },
    },
  },
  plugins: [],
}
export default config
