import { defineConfig, devices } from '@playwright/test';
const BASE_URL = 'http://localhost:3000';

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : 2,
  reporter: [['html', { open: 'never' }], ['dot']],
  timeout: 2 * 60 * 1000,
  expect: {
    timeout: 15 * 1000,
  },
  use: {
    headless: true, // Default mode
    ignoreHTTPSErrors: true,
    acceptDownloads: true,
    testIdAttribute: 'data-testid',
    baseURL: BASE_URL,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: "retain-on-failure",
    actionTimeout: 5 * 1000,
    navigationTimeout: 15 * 1000,
  },

  projects: [
    {
      name: 'chromium',
      use: {
        viewport: null,
        headless: true, // Non-headless mode
        launchOptions: {
          args: ['--disable-web-security', '--start-maximized'],
          slowMo: 900,
        },
      },
    },
    {
      name: 'chromiumheadless',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1600, height: 1000 },
        headless: true, // Headless mode
        launchOptions: {
          args: ['--disable-web-security'],
          slowMo: 1000,
        },
      },
    },
  ],

  webServer: {
    command: 'npm start', // Start the UI server
    url: BASE_URL,
    ignoreHTTPSErrors: true,
    timeout: 2 * 60 * 1000,
    reuseExistingServer: true,
    stdout: 'pipe',
    stderr: 'pipe',
  },
});
