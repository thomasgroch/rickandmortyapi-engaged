import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import EnvironmentPlugin from 'vite-plugin-environment'
import Components from 'unplugin-vue-components/vite'

export default defineConfig({
  plugins: [
    Components(),
    vue(),
    EnvironmentPlugin(
      {
        NODE_ENV: 'local',
        URL: '',
        NODE_VERSION: '',
        REPOSITORY_URL: '',
        COMMIT_REF: '',
        BRANCH: '',
        CONTEXT: '',
      },
      { defineOn: 'import.meta.env' }
    ),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },

  optimizeDeps: {
    exclude: ['.out'],
  },
  server: {
    host: true,
    port: 3000,
  },
  base: '/'
})
