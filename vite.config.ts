import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // This is a GitHub user site, deployed at https://nimbold.github.io/.
  base: '/',
})
