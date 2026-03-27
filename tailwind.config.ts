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
        // Ngũ hành colors
        kim: '#D4AF37',  // Kim (Metal) - Vàng kim
        moc: '#10B981',  // Mộc (Wood) - Xanh lá
        thuy: '#3B82F6', // Thủy (Water) - Xanh dương
        hoa: '#EF4444',  // Hỏa (Fire) - Đỏ
        tho: '#92400E',  // Thổ (Earth) - Nâu đất
      },
    },
  },
  plugins: [],
}
export default config
