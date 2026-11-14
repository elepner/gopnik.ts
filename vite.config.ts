import { defineConfig } from 'vite-plus';

export default defineConfig({
  fmt: {
    ignorePatterns: ['vendor/**', 'analysis/**', 'oracle/.work/**', 'original/**', 'dist/**'],
    singleQuote: true,
    trailingComma: 'es5',
    printWidth: 100,
    tabWidth: 2,
    semi: true,
    endOfLine: 'lf',
    experimentalSortImports: {},
  },
  lint: {
    ignorePatterns: ['vendor/**', 'analysis/**', 'oracle/.work/**', 'dist/**'],
    options: {
      typeAware: true,
      typeCheck: true,
    },
  },
  test: {
    include: ['src/**/*.spec.ts', 'test/**/*.spec.ts'],
    testTimeout: 60_000,
  },
});
