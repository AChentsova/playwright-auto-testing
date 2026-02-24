import { test, expect } from "../fixtures/userGaragePage.js";

test("user should be logged in", async ({ userGaragePage }) => {
  await expect(userGaragePage.addCarBtn).toBeVisible();
});