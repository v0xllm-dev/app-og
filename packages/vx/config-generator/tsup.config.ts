import { defineConfig } from 'tsup'

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    cli: 'src/cli.ts',
    types: 'src/types.ts'
  },
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  splitting: false,
  sourcemap: true,
  minify: false,
  target: 'node16',
  banner: {
    js: '#!/usr/bin/env node'
  },
  esbuildOptions(options) {
    // Make CLI executable
    if (options.entryPoints && typeof options.entryPoints === 'object' && 'cli' in options.entryPoints) {
      options.banner = {
        js: '#!/usr/bin/env node'
      }
    }
  }
})