const electron = require("electron");
const ffmpeg = require("fluent-ffmpeg");

const { app, BrowserWindow, ipcMain } = electron;

// declair mainWindow
let mainWindow;

// Event - onLoad
const ready = () => {
  console.log("--- index.js - ready start");
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true, // security warning. false is default value after Electron v5
      contextIsolation: false, // protect against prototype pollution
    },
  });
  mainWindow.loadURL(`file://${__dirname}/index.html`);
  console.log("--- index.js - ready end");
};
app.on("ready", ready);

// Event - video:submit
const videoSubmit = (event, path) => {
  console.log("--- index.js - video:submit start");
  ffmpeg.ffprobe(path, (err, metadata) => {
    console.log(metadata.format.duration);
    mainWindow.webContents.send("video:metadata", metadata.format.duration);
  });
  console.log("--- index.js - video:submit end");
};
ipcMain.on("video:submit", videoSubmit);
