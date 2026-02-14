import { test, expect } from "@playwright/test";
import dotenv from "dotenv";
dotenv.config();
import { RegistrationPage } from "../pages/RegistrationPage.js";

test.describe("Successful User Registration", () => {
  let registrationPage;
  test.beforeEach(async ({ page }) => {
    registrationPage = new RegistrationPage(page);
    await registrationPage.open();
    await registrationPage.clickSignUpBtn();
  });

  test("should register new user with valid data", async () => {
    const email = `aqa-${Date.now()}@test.com`;
    const password = "TestPass123";

    await registrationPage.expectElementDisabled(registrationPage.registerBtn);
    await registrationPage.registerUser({
      name: "Jane",
      lastName: "Doe",
      email,
      password,
    });

    await registrationPage.expectTextVisible("Registration complete");
    await registrationPage.expectUrlContains("/panel/garage");
  });
});
