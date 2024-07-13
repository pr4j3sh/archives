import axios from "axios";
import { config } from "../../../axios.config";
const apiUrl = import.meta.env.VITE_API_URL + "/api/auth";

export async function registerUser(e) {
  e.preventDefault();
  try {
    const formData = {
      username: e.target.username.value,
      password: e.target.password.value,
    };
    // localStorage.setItem("user", JSON.stringify(formData));
    // localStorage.setItem("status", JSON.stringify(true));
    const res = await axios.post(apiUrl + "/register", formData, config);
    console.log(res.data);
  } catch (error) {
    console.log(error.response.data.message);
  }
}
