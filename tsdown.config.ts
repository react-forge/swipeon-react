import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: 'src/index.ts',
  format: ['cjs', 'esm'],
  dts: true,
  clean: false,
  external: ['react', 'react-dom'],
  minify: true,
  sourcemap: true,
  outDir: 'dist',
});

