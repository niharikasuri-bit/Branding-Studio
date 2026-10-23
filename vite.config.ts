import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  // Relative paths, so the build works from any folder.
  base: './',
  plugins: [react()],
  server: {
    port: 5193,
    open: true,
  },
  build: {
    // Built into docs/.
    outDir: 'docs',
    emptyOutDir: true,
    // The published digit-ui-components-css uses var() inside a media query,
    // which Vite 8's Lightning CSS minifier rejects. Minification stays off.
    cssMinify: false,
  },
})
