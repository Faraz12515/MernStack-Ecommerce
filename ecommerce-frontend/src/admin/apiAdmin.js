import { API } from "../config";
import Success from "../user/Success";
import Failed from "../user/Failed";

// signup //
export const createCategory = (userId, token, category) => {
  return fetch(`${API}/category/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json ",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(category),
  })
    .then((response) => {
      console.log(`response`, response);
      response.status === 200 &&
        Success(`${category.name} is Created Successfully`);
      response.status === 400 &&
        category.name === "" &&
        Failed("Please enter Category name");

      return response.json();
    })
    .catch((err) => {
      console.log(`err`, err);
    });
};
