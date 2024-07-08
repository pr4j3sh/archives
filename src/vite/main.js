import "./style.css";
import {add} from "./src/js/add"

document.querySelector("#app").innerHTML = `
  <div class="container">
  <h1>Vite Vanilla</h1>
  <p>Vanilla javascript website build with <a href="https://vitejs.dev/">vite</a>.</p>
  <h2>Sum</h2>
  <p>Let's add two numbers and then test it using <a href="https://vitest.dev/">vitest</a>.</p>
  </div>
`;

const sum = add(2,3);
console.log(sum);
