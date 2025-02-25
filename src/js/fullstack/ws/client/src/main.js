import "./style.css";
import { io } from "socket.io-client";

let players = [];
const socket = io("http://localhost:5000");

const p = document.querySelector("p");
const btn = document.querySelector("button");
const ul = document.querySelector("ul");

btn.addEventListener("click", () => {
  let score = Number(p.textContent);
  p.innerText = (score + 1).toString();
});

function setPlayers(player) {
  players.push(player);
  const list = players
    .map((player) => {
      return `<li>${player}</li>`;
    })
    .join("");
  ul.innerHTML = list;
}

socket.on("player", (res) => {
  console.log(res);
  setPlayers(res);
});
