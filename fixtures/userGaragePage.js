import { test as base } from "@playwright/test";
import { GaragePage } from "../pages/GaragePage.js";

export const test = base.extend({
  userGaragePage: async ({ page }, use) => {
    const garagePage = new GaragePage(page);
    await garagePage.goto();
    await use(garagePage);
  },
});

export { expect } from "@playwright/test";