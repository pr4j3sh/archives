import "./style.css";
import { registerUser } from "./src/js/auth/register.user";

const status = localStorage.getItem("status") || false;
console.log(status);

if (status) {
  document.querySelector("#app").innerHTML = `
  <div>
  <h1>Dashboard</h1>
  </div>
`;
} else {
  document.querySelector("#app").innerHTML = `
  <div>
  <h1>Register</h1>
    <form id="register-form">
      <label for="username">Username</label>
      <input name="username" id="username" type="text" />
      <label for="password">Password</label>
      <input name="password" id="password" type="password" />
      <input type="submit" value="Register"/>
    </form>
  </div>
`;

  const registerForm = document.getElementById("register-form");
  registerForm.addEventListener("submit", registerUser);
}
