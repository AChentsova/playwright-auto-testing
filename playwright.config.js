import dotenv from 'dotenv';
dotenv.config();

import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: undefined,
  reporter: [
    ["list"],
    ["html", { open: "never", outputFolder: "playwright-report" }],
  ],

  use: {
    baseURL: process.env.BASE_URL,
    httpCredentials: {
      username: process.env.LOGIN_USERNAME,
      password: process.env.LOGIN_PASSWORD,
    },
    viewport: { width: 1280, height: 720 },
    actionTimeout: 10000,
    navigationTimeout: 20000,
    ignoreHTTPSErrors: true,
    acceptDownloads: true,
    trace: "on",
    screenshot: "on",
    video: "on",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },

    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },

    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
  ],
});

