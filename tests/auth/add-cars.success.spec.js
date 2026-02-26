import { test, expect } from "../../fixtures/userGaragePage.js";

test("should add a car successfully", async ({ userGaragePage, request }) => {
  const response = await request.post("https://qauto.forstudy.space/api/cars", {
    data: {
      carBrandId: 1,
      carModelId: 1,
      mileage: 122,
    },
  });

  expect(response.status()).toBe(201);

  const body = await response.json();

  expect(body.status).toBe("ok");
  expect(body.data).toHaveProperty("id");
  expect(body.data.carBrandId).toBe(1);
  expect(body.data.carModelId).toBe(1);
  expect(body.data.initialMileage).toBe(122);
  expect(body.data.mileage).toBe(122);
  expect(body.data).toHaveProperty("brand", "Audi");
  expect(body.data).toHaveProperty("model", "TT");
  expect(body.data).toHaveProperty("logo", "audi.png");

  await userGaragePage.goto();
  await expect(userGaragePage.getCarList()).toContainText("Audi TT");
});
