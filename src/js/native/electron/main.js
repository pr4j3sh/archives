const { app, BrowserWindow } = require("electron");
const options = require("./app.config.js");

const createWindow = () => {
  const win = new BrowserWindow(options);

  win.loadFile("index.html");
};

app.whenReady().then(() => {
  createWindow();
});
