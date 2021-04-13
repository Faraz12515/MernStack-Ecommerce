import axios from "axios";
import { API } from "../config";

// Saving User Data and Token //
export const authenticate = (data, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(data));
  }
};

// Signout User //
export const signout = async () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");

    try {
      let response = await axios.get(`${API}/signout`, {});
      console.log(`signout`, response.data);
    } catch (err) {
      console.log(`err`, err);
    }
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
