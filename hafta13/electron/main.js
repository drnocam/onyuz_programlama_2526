import { app, BrowserWindow, dialog, ipcMain, shell } from 'electron'
import { dirname, join } from 'node:path'
import { readdir, stat } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const rendererUrl = process.env.ELECTRON_RENDERER_URL
const isDev = Boolean(rendererUrl)

function getSpecialPaths() {
  return {
    home: app.getPath('home'),
    desktop: app.getPath('desktop'),
    documents: app.getPath('documents'),
    downloads: app.getPath('downloads'),
    pictures: app.getPath('pictures'),
    music: app.getPath('music'),
    videos: app.getPath('videos'),
  }
}

async function readDirectoryEntries(directoryPath) {
  const entries = await readdir(directoryPath, { withFileTypes: true })

  const enrichedEntries = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = join(directoryPath, entry.name)
      const entryStats = await stat(fullPath)

      return {
        name: entry.name,
        path: fullPath,
        isDirectory: entry.isDirectory(),
        size: entryStats.size,
        modifiedAt: entryStats.mtimeMs,
      }
    }),
  )

  return enrichedEntries.sort((firstEntry, secondEntry) => {
    if (firstEntry.isDirectory !== secondEntry.isDirectory) {
      return firstEntry.isDirectory ? -1 : 1
    }

    return firstEntry.name.localeCompare(secondEntry.name, 'tr', { sensitivity: 'base' })
  })
}

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 800,
    minHeight: 600,
    backgroundColor: '#d7e5ff',
    title: 'hafta13',
    webPreferences: {
      preload: join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  })

  if (isDev) {
    mainWindow.loadURL(rendererUrl || 'http://127.0.0.1:5173')
    mainWindow.webContents.openDevTools({ mode: 'detach' })
    return
  }

  mainWindow.loadFile(join(__dirname, '..', 'dist', 'index.html'))
}

ipcMain.handle('filesystem:get-special-paths', () => getSpecialPaths())

ipcMain.handle('filesystem:pick-directory', async () => {
  const result = await dialog.showOpenDialog({
    properties: ['openDirectory', 'createDirectory'],
  })

  if (result.canceled || result.filePaths.length === 0) {
    return null
  }

  return result.filePaths[0]
})

ipcMain.handle('filesystem:read-directory', async (_event, directoryPath) => {
  return readDirectoryEntries(directoryPath)
})

ipcMain.handle('filesystem:open-path', async (_event, targetPath) => {
  return shell.openPath(targetPath)
})

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})