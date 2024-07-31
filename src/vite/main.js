import "./style.css";
// import {add} from "./src/js/add"

document.querySelector("#app").innerHTML = `
  <div class="container">
  <h1 id="heading">Vite Vanilla</h1>
  <p>Vanilla javascript website build with <a href="https://vitejs.dev/">vite</a>.</p>
  <h2>Sum</h2>
  <p>Let's add two numbers and then test it using <a href="https://vitest.dev/">vitest</a>.</p>
    <button id="btn">Click Me</button>
  </div>
`;

// const sum = add(2,3);
// console.log(sum);

function first() {
  console.log("first function called");
}

first();

document.getElementById("btn").addEventListener("click", function () {
  console.log("bye");
});

window.addEventListener("keydown", (e) => {
  console.log("hi");
});
