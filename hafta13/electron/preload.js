const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  getSpecialPaths: () => ipcRenderer.invoke('filesystem:get-special-paths'),
  pickDirectory: () => ipcRenderer.invoke('filesystem:pick-directory'),
  readDirectory: (directoryPath) => ipcRenderer.invoke('filesystem:read-directory', directoryPath),
  openPath: (targetPath) => ipcRenderer.invoke('filesystem:open-path', targetPath),
})