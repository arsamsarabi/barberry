import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import tsconfigPaths from 'vite-tsconfig-paths'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  base: process.env.NODE_ENV === 'development' ? 'https://localhost:3000/' : '',
  plugins: [reactRefresh(), tsconfigPaths(), svgr()],
})
