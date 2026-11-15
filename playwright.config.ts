/** Browser tests of the web shell: `bun run web:e2e` (starts its own dev server). */
import { defineConfig, devices } from '@playwright/test';

const PORT = 5175;

export default defineConfig({
  testDir: 'web/e2e',
  testMatch: '*.e2e.ts',
  fullyParallel: true,
  reporter: 'list',
  use: { baseURL: `http://localhost:${PORT}` },
  projects: [
    { name: 'phone', use: { ...devices['iPhone 13'], defaultBrowserType: 'chromium' } },
    { name: 'desktop', use: { viewport: { width: 1440, height: 860 } } },
  ],
  webServer: {
    command: `bun run web --port ${PORT} --strictPort`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: false,
  },
});
