import { BasePage } from "./BasePage.js";

export class RegistrationPage extends BasePage {
  constructor(page) {
    super(page);
    this.signUpBtn = page.locator(".hero-descriptor_btn");
    this.registerBtn = page.getByRole("button", { name: "Register" });
    this.nameInput = page.locator("#signupName");
    this.lastNameInput = page.locator("#signupLastName");
    this.emailInput = page.locator("#signupEmail");
    this.passwordInput = page.locator("#signupPassword");
    this.repeatPasswordInput = page.locator("#signupRepeatPassword");
  }

  async clickSignUpBtn() {
    await this.signUpBtn.click();
  }

  async fillName(name) {
    await this.nameInput.fill(name);
  }

  async fillLastName(lastName) {
    await this.lastNameInput.fill(lastName);
  }

  async fillEmail(email) {
    await this.emailInput.fill(email);
  }

  async fillPassword(password) {
    await this.passwordInput.fill(password);
  }

  async fillRepeatPassword(password) {
    await this.repeatPasswordInput.fill(password);
  }

  async clickRegisterBtn() {
    await this.registerBtn.click();
  }

  async registerUser({ name, lastName, email, password }) {
    await this.fillName(name);
    await this.fillLastName(lastName);
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.fillRepeatPassword(password);
    await this.clickRegisterBtn();
  }
}