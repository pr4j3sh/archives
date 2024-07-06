import "./style.css";

document.querySelector("#app").innerHTML = `
  <div class="container">
  <h1>Vite Vanilla</h1>
  <p>Vanilla js build with vite</p>
  </div>
`;

setupCounter(document.querySelector("#counter"));
