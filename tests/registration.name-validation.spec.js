import { test, expect } from "@playwright/test";
import dotenv from "dotenv";
dotenv.config();
import { RegistrationPage } from "../pages/RegistrationPage.js";

test.describe("Validation for Name and Last Name fields", () => {
  let registrationPage;
  test.beforeEach(async ({ page }) => {
    registrationPage = new RegistrationPage(page);
    await registrationPage.goto(process.env.BASE_URL, {
      username: process.env.LOGIN_USERNAME,
      password: process.env.LOGIN_PASSWORD,
    });
    await registrationPage.clickSignUpBtn();
  });

  test("should show error for short name", async () => {
    await registrationPage.fillName("J");
    await registrationPage.lastNameInput.click();
    await registrationPage.expectTextVisible(
      "Name has to be from 2 to 20 characters long",
    );
    await registrationPage.expectFieldErrorBorder(registrationPage.nameInput);
    await registrationPage.expectElementDisabled(registrationPage.registerBtn);
  });

  test("should show error for short last name", async () => {
    await registrationPage.fillLastName("D");
    await registrationPage.nameInput.click();
    await registrationPage.expectTextVisible(
      "Last name has to be from 2 to 20 characters long",
    );
    await registrationPage.expectFieldErrorBorder(
      registrationPage.lastNameInput,
    );
    await registrationPage.expectElementDisabled(registrationPage.registerBtn);
  });

  test("should show error for long name", async () => {
    const longName = "J".repeat(21);
    await registrationPage.fillName(longName);
    await registrationPage.lastNameInput.click();
    await registrationPage.expectTextVisible(
      "Name has to be from 2 to 20 characters long",
    );
    await registrationPage.expectFieldErrorBorder(registrationPage.nameInput);
    await registrationPage.expectElementDisabled(registrationPage.registerBtn);
  });

  test("should show error for long last name", async () => {
    const longLastName = "D".repeat(21);
    await registrationPage.fillLastName(longLastName);
    await registrationPage.nameInput.click();
    await registrationPage.expectTextVisible(
      "Last name has to be from 2 to 20 characters long",
    );
    await registrationPage.expectFieldErrorBorder(
      registrationPage.lastNameInput,
    );
    await registrationPage.expectElementDisabled(registrationPage.registerBtn);
  });

  test("should show error for name with invalid characters", async () => {
    await registrationPage.fillName("Jane123");
    await registrationPage.lastNameInput.click();
    await registrationPage.expectTextVisible("Name is invalid");
    await registrationPage.expectFieldErrorBorder(registrationPage.nameInput);
    await registrationPage.expectElementDisabled(registrationPage.registerBtn);
  });

  test("should show error for last name with invalid characters", async () => {
    await registrationPage.fillLastName("Doe@!");
    await registrationPage.nameInput.click();
    await registrationPage.expectTextVisible("Last name is invalid");
    await registrationPage.expectFieldErrorBorder(
      registrationPage.lastNameInput,
    );
    await registrationPage.expectElementDisabled(registrationPage.registerBtn);
  });

  test("should show error for empty name", async () => {
    await registrationPage.fillName("");
    await registrationPage.lastNameInput.click();
    await registrationPage.expectTextVisible("Name required");
    await registrationPage.expectFieldErrorBorder(registrationPage.nameInput);
    await registrationPage.expectElementDisabled(registrationPage.registerBtn);
  });

  test("should show error for empty last name", async () => {
    await registrationPage.fillLastName("");
    await registrationPage.nameInput.click();
    await registrationPage.expectTextVisible("Last name required");
    await registrationPage.expectFieldErrorBorder(
      registrationPage.lastNameInput,
    );
    await registrationPage.expectElementDisabled(registrationPage.registerBtn);
  });
});