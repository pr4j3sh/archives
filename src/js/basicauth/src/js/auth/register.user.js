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
    if (!formData.username || !formData.password) {
      alert("fill in all the fields");
    } else {
      const res = await axios.post(apiUrl + "/register", formData, config);
      console.log(res.data);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("status", JSON.stringify(true));
      location.reload();
    }
  } catch (error) {
    const message = error.response
      ? error.response.data.message
      : error.message;
    alert(message);
    console.log(message);
  }
}
