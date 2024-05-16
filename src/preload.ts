// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
//import { contextBridge, ipcRenderer } from "electron/renderer";

import { ipcRenderer, contextBridge } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
  onScheduleChange: (callback:any) =>
    ipcRenderer.on("schedule-change", (_event, value) => callback(value)),
  onMessageChange: (callback:any) =>
    ipcRenderer.on("message-change", (_event, value) => callback(value)),
});
