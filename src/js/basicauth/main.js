import "./style.css";
import { registerUser } from "./src/js/auth/register.user";
import { loginUser } from "./src/js/auth/login.user";
import { logoutUser } from "./src/js/auth/logout.user";

const status = localStorage.getItem("status") || false;
console.log(status);

if (status) {
  const user = JSON.parse(localStorage.getItem("user"));
  document.querySelector("#app").innerHTML = `
  <div>
  <h1>Dashboard</h1>
    <p>logged in as <b>${user.username}</b></p>
    <button id="logout-user">Logout</button>
  </div>
`;

  const logoutButton = document.getElementById("logout-user");
  logoutButton.addEventListener("click", logoutUser);
} else {
  const url = window.location.href;
  const urlArray = url.split("/");

  if (urlArray.at(-1) == "login.html") {
    document.querySelector("#app").innerHTML = `
  <div>
  <h1>Login</h1>
    <form id="login-form">
      <label for="username">Username</label>
      <input name="username" id="username" type="text" />
      <label for="password">Password</label>
      <input name="password" id="password" type="password" />
      <button type="submit">Login</button>
    </form>
    <p>Don't have an account? <a href="/">Register</a></p>
  </div>
`;

    const loginForm = document.getElementById("login-form");
    loginForm.addEventListener("submit", loginUser);
  } else {
    document.querySelector("#app").innerHTML = `
  <div>
  <h1>Register</h1>
    <form id="register-form">
      <label for="username">Username</label>
      <input name="username" id="username" type="text" />
      <label for="password">Password</label>
      <input name="password" id="password" type="password" />
      <button type="submit">Register</button>
    </form>
    <p>Already a user? <a href="/pages/login.html">Login</a></p>
  </div>
`;

    const registerForm = document.getElementById("register-form");
    registerForm.addEventListener("submit", registerUser);
  }
}
