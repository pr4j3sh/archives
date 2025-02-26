import "./style.css";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

let player = "";
const pScore = document.querySelector(".score");
const pPlayer = document.querySelector(".player");
const btn = document.querySelector("button");
const ul = document.querySelector("ul");

btn.addEventListener("click", () => {
  let score = Number(pScore.textContent) + 1;
  pScore.innerText = score.toString();
  socket.emit("score", JSON.stringify({ player, score }));
});

socket.on("player", (res) => {
  player = res;
  pPlayer.innerText = res;
});

function setPlayers(players) {
  const list = players
    .map((player) => {
      return `<li>${player}</li>`;
    })
    .join("");
  ul.innerHTML = list;
}

socket.on("players", (res) => {
  setPlayers(res);
});
