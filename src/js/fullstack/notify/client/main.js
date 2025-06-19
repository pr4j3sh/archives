import "./style.css";
import "./src/components/head";
import "./src/components/navbar";
import "./src/lib/theme";
import "./src/components/footer";

const API_URL = "http://localhost:5000/api";

document.getElementById("health").innerText = await getHealth(
  API_URL + "/health",
);

document.getElementById("notify").innerText = await getNotification(
  API_URL + "/notify",
);

async function getHealth(url) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    return JSON.stringify(data);
  } catch (error) {
    return JSON.stringify(error);
  }
}

async function getNotification(url) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    return JSON.stringify(data);
  } catch (error) {
    return JSON.stringify(error);
  }
}
