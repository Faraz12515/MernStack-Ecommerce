import { API } from "../config";
import Success from "../user/Success";
import Failed from "../user/Failed";

// create category //
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

// create product //
export const createProduct = (userId, token, product) => {
  return fetch(`${API}/product/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: product,
  })
    .then((response) => {
      console.log(`response`, response);
      response.status === 200 && Success(`Product is Created Successfully`);

      return response.json();
    })
    .catch((err) => {
      console.log(`err`, err);
    });
};

// Get Categories //
export const getCategories = () => {
  return fetch(`${API}/categories`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(`err`, err));
};
