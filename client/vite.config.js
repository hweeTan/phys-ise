import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'node:path'

const projectRootDir = path.resolve('./')

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: path.resolve(projectRootDir, 'src'),
    },
  },
})
