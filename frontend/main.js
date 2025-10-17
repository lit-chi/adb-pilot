// main.js
import { app, BrowserWindow } from 'electron'
import path from 'path'
import { fileURLToPath } from 'url'

// Fix __dirname because it's not available in ESM
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // Load React dev server in dev
  win.loadURL('http://localhost:5173')
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
