import { test, expect } from "../fixtures/userGaragePage.js";

test("should show error for not authenticated user", async ({ userGaragePage, request }) => {
  const response = await request.post("https://qauto.forstudy.space/api/cars", {
    data: {
      carBrandId: 1,
      carModelId: 1,
      mileage: 122,
    },
  });

  expect(response.status()).toBe(401);
  expect(response.statusText()).toBe("Unauthorized");

  const body = await response.json();

  expect(body.status).toBe("error");
  expect(body.message).toBe("Not authenticated");

});