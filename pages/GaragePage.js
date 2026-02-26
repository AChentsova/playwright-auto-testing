export class GaragePage {
  constructor(page) {
    this.page = page;
    this.addCarBtn = page.getByRole("button", {name: "Add car",});
    this.carListItems = page.locator(".car-list"); 
  }
  async goto() {
    await this.page.goto("/panel/garage");
  }

  getCarList() {
    return this.carListItems;
  }

  async addCar(brand, model, mileage) {
    await this.addCarBtn.click();
    await this.page.fill("#addCarBrand", brand);
    await this.page.fill("#addCarModel", model);
    await this.page.fill("#addCarMileage", String(mileage));
    await this.page.click("button:has-text('Add')");
  }

  
}