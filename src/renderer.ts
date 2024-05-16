/**
 * This file will automatically be loaded by webpack and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/latest/tutorial/process-model
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import './index.css';


const currentStateElement = document.getElementById("currentState");
const messageElement = document.getElementById("message");

let currentState:any = undefined;

(window as any).electronAPI.onScheduleChange((value:any) => {
  if (currentState == undefined) {
    startTime();
    currentState = value;
    updateStateElement(currentState);
  }
  if (currentState != value) {
    currentState = value;
    updateStateElement(currentState);
  }
});

(window as any).electronAPI.onMessageChange((value:any) => {
  messageElement.innerHTML = value;
});

function updateStateElement(value:any) {
  currentStateElement.innerHTML = value;
}

function startTime() {
  const today = new Date();
  const h = today.getHours().toString().padStart(2, '0');
  const m = today.getMinutes().toString().padStart(2, '0');
  const s = today.getSeconds().toString().padStart(2, '0');
  document.getElementById("clock").innerHTML = h + ":" + m + ":" + s;
  setTimeout(startTime, 1000);
}

