/// <reference types='vitest' />
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig(async () => {
  const tailwindcss = (await import('@tailwindcss/vite')).default
  const { env } = process
  const hostname = env.CI ? 'localhost' : env.HOST_NAME || 'localhost'

  return {
    envPrefix: ['V_'],
    root: __dirname,
    cacheDir: '../../node_modules/.vite/apps_internals/playground',
    server: {
      port: Number(env.PORT),
      host: hostname
    },
    preview: {
      port: Number(env.PRE_PORT) || Number(env.PORT),
      host: hostname
    },
    plugins: [
      tanstackRouter({ target: 'react', autoCodeSplitting: true }),
      react(),
      tailwindcss(),
      tsconfigPaths()
    ],
    // Uncomment this if you are using workers.
    // worker: {
    //  plugins: [ nxViteTsPaths() ],
    // },
    build: {
      outDir: './dist',
      emptyOutDir: true,
      reportCompressedSize: true,
      commonjsOptions: {
        transformMixedEsModules: true
      }
    },
    test: {
      name: 'playground',
      watch: false,
      globals: true,
      environment: 'jsdom',
      include: [
        '{src,tests,__tests__}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'
      ],
      reporters: ['default'],
      coverage: {
        reportsDirectory: './test-output/vitest/coverage',
        provider: 'v8' as const
      }
    }
  }
})
