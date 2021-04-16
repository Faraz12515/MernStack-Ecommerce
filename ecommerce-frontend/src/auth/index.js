import axios from "axios";
import { API } from "../config";
import Success from "../user/Success";

// signup //
export const signup = (user) => {
  return fetch(`${API}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json ",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      console.log(`response`, response);
      response.status === 200 &&
        Success("New account is created. Please Signin");
      return response.json();
    })
    .catch((err) => {
      console.log(`err`, err);
    });
};

// signin //
export const signin = (user) => {
  return fetch(`${API}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json ",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      console.log(`response`, response);
      response.status === 200 && Success("Successfully Signin");
      return response.json();
    })
    .catch((err) => {
      console.log(`err`, err);
    });
};

// Saving User Data and Token //
export const authenticate = (data, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(data));
    next();
  }
};

// Signout User //
export const signout = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
    return fetch(`${API}/signout`, {})
      .then((response) => console.log(`signout`, response))
      .catch((err) => console.log(`err`, err));
  }
};

// Show and Hide Signin and Signout Links//
export const isAuthenticated = () => {
  if (typeof window === "undefined") {
    return false;
  }
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};
