const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  changeSite: (url) => ipcRenderer.send('change-site', url)
});