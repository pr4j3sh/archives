import "./style.css";
import "./src/components/head";
import "./src/components/navbar";
import "./src/lib/theme";
import "./src/components/footer";
import { z } from "zod";

const loginForm = document.querySelector('form[name="loginForm"]');

const loginFormSchema = {
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
};

Array.from(loginForm.elements).forEach((input) => {
  if (input.name) {
    input.addEventListener("change", (e) =>
      validate(e.target, loginFormSchema),
    );
  }
});

function validate(input, schema) {
  const { name, type, value, checked } = input;
  const text = document.getElementById(`${name}Text`);
  text.innerText = "";
  const inputValue = type === "checkbox" || type === "radio" ? checked : value;
  try {
    schema[name].parse(inputValue);
    return true;
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessage = error.errors[0]?.message || "Invalid input";
      text.innerText = errorMessage;
      console.error(errorMessage);
      return false;
    }
  }
}

loginForm.addEventListener("submit", handleLogin);

function handleLogin(e) {
  e.preventDefault();

  let isValid = true;

  Array.from(e.target.elements).forEach((input) => {
    if (input.name) {
      const valid = validate(input, loginFormSchema);
      if (!valid) isValid = false;
    }
  });

  if (isValid) {
    const values = Object.fromEntries(
      Array.from(e.target.elements)
        .filter((input) => input.name)
        .map((input) => [
          input.name,
          input.type === "checkbox" ? input.checked : input.value,
        ]),
    );
    console.log(values);
  } else {
    console.error("Form validation failed.");
  }
}

const password = document.querySelector('input[name="password"]');
const passwordButton = document.getElementById("passwordButton");
passwordButton.addEventListener("click", togglePasswordButton);

function togglePasswordButton() {
  let state = password.type;
  if (state === "password") {
    password.type = "text";
    passwordButton.innerText = "Hide password";
  } else if (state === "text") {
    password.type = "password";
    passwordButton.innerText = "Show password";
  }
}
