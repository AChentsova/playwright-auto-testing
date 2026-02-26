import { test, expect } from "../../fixtures/userGaragePage.js";

test("should show error for invalid car data", async ({ userGaragePage, request }) => {
  const response = await request.post("https://qauto.forstudy.space/api/cars", {
    data: {
      carBrandId: 1,
      carModelId: null,
      mileage: 122,
    },
  });

  expect(response.status()).toBe(400);
  expect(response.statusText()).toBe("Bad Request");

  const body = await response.json();

  expect(body.status).toBe("error");
  expect(body.message).toBe("Invalid car model type");

});