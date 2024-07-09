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
let currentValue:any = undefined;
let currentClockFontSize:any = 20;
let currentMessageFontSize:any = 20;

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
  if(currentValue === undefined){
    currentValue = value;
  }
  if(currentValue !== value){
    console.log("onMessageChange",currentValue,value)
    currentValue = value;
    const audio = new Audio("sos.mp3");
    audio.play();
  }
});


(window as any).electronAPI.onClockFontSizeChange((value:any) => {
  console.log("onClockFontSizeChange",value)
  if(currentClockFontSize !== value){
    currentClockFontSize = value;
    var elements = document.getElementsByClassName('clock');

    for (var i = 0; i < elements.length; i++) {
      var element = elements[i];
      (element as any).style.fontSize = value+"em";
    }
  }

});


(window as any).electronAPI.onMessageFontSizeChange((value:any) => {
  console.log("onMessageFontSizeChange",value)
  if(currentMessageFontSize !== value){
    currentMessageFontSize = value;
    var elements = document.getElementsByClassName('message');

    for (var i = 0; i < elements.length; i++) {
      var element = elements[i];
      (element as any).style.fontSize = value+"em";
    }
  }

});

(window as any).electronAPI.onFontColorsChange((value:any) => {
  //console.log("onFontColorsChange",value)
  document.getElementById("clock").style.color = value.clockColor
  document.getElementById("currentState").style.color = value.counterColor
  document.getElementById("message").style.color = value.messageColor

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

