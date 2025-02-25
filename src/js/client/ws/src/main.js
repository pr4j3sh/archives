import "./style.css";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

async function emitEvent() {
  socket.emit("event", "hello");
  const res = await fetch("http://localhost:5000/");
  const data = await res.json();
  console.log(data);
}

const btn = document.querySelector("button");

btn.addEventListener("click", emitEvent);
