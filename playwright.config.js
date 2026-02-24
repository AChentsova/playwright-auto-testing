import dotenv from "dotenv";
dotenv.config();

import { defineConfig, devices } from "@playwright/test";
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
      name: "setup",
      testMatch: /.*\.setup\.js/,
    },
    {
      name: "chromium-auth",
      use: {
        ...devices["Desktop Chrome"],
        storageState: "storageState.json",
      },
      dependencies: ["setup"],
      testMatch: /tests\/garage\.spec\.js/,
    },

    {
      name: "firefox-auth",
      use: {
        ...devices["Desktop Firefox"],
        storageState: "storageState.json",
      },
      dependencies: ["setup"],
      testMatch: /tests\/garage\.spec\.js/,
    },

    {
      name: "webkit-auth",
      use: {
        ...devices["Desktop Safari"],
        storageState: "storageState.json",
      },
      dependencies: ["setup"],
      testMatch: /tests\/garage\.spec\.js/,
    },

    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
      },
      testIgnore: [/.*\.setup\.js/, /tests\/garage\.spec\.js/],
    },

    {
      name: "firefox",
      use: {
        ...devices["Desktop Firefox"],
      },
      testIgnore: [/.*\.setup\.js/, /tests\/garage\.spec\.js/],
    },

    {
      name: "webkit",
      use: {
        ...devices["Desktop Safari"],
      },
      testIgnore: [/.*\.setup\.js/, /tests\/garage\.spec\.js/],
    },
  ],
});