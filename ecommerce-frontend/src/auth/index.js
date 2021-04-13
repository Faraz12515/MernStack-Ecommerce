import axios from "axios";
import { API } from "../config";

export const authenticate = (data, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(data));
  }
};

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
