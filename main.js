// const electron = require("electron");
// const { ipcRenderer } = electron;

// Event - submit
const submit = (event) => {
  console.log("--- main.js - submit start");
  // stop submit process
  event.preventDefault();
  const files = document.querySelector("input").files;
  if (!files || files.length == 0) {
    return;
  }
  const { path } = files[0];
  // ipcRenderer.send("video:submit", path);
  window.api.send("video:submit", path);
  console.log("--- main.js - submit end");
};
document.querySelector("form").addEventListener("submit", submit);

// Event - video:metadata
const videoMetadata = (duration) => {
  console.log("--- main.js - videoMetadata start");
  document.querySelector("#result").innerHTML = `Video is ${duration} seconds`;
  console.log("--- main.js - videoMetadata end");
};
// ipcRenderer.on("video:metadata", videoMetadata);
window.api.receive("video:metadata", videoMetadata);
