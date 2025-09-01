import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['./bin/server.ts'],
  clean: true,
  format: 'esm',
  outDir: './dist',
  splitting: false,
  minify: true,
  bundle: true,
})
