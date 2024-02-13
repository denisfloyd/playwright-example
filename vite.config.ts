/// <reference types="vitest" />
import {defineConfig} from 'vite';
import {configDefaults} from 'vitest/config';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';

// https://vitejs.dev/config https://vitest.dev/config
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: '.vitest/setup',
    include: ['**/__tests__/*.(spec|test).[jt]s?(x)'],
    coverage: {
      provider: 'v8',
      enabled: false,
      reporter: ['text', 'html'],
      exclude: [
        ...configDefaults.exclude,
        '**/*styles',
        '**/*.config.*',
        '**/*api',
        '**/*router',
        '**/types.**',
      ],
    },
  },
  resolve: {
    alias: [{find: '@', replacement: path.resolve(__dirname, 'src')}],
  },
});
