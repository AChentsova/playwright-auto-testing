export class GaragePage {
  constructor(page) {
    this.page = page;
    this.addCarBtn = page.getByRole("button", {
      name: "Add car",
    });
  }

  async goto() {
    await this.page.goto("/panel/garage");
  }
}