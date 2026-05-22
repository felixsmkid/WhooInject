const { app, BrowserWindow, ipcMain, shell } = require('electron')
const path = require('path')

let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 1024,
    minHeight: 700,
    frame: false,
    transparent: false,
    backgroundColor: '#0a0a0f',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
    icon: path.join(__dirname, '../public/icon.png'),
  })

  if (process.env.NODE_ENV === 'development' || !app.isPackaged) {
    mainWindow.loadURL('http://localhost:5173')
    mainWindow.webContents.openDevTools({ mode: 'detach' })
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'))
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// Window control handlers
ipcMain.on('window-minimize', () => {
  mainWindow?.minimize()
})

ipcMain.on('window-maximize', () => {
  if (mainWindow?.isMaximized()) {
    mainWindow.unmaximize()
  } else {
    mainWindow?.maximize()
  }
})

ipcMain.on('window-close', () => {
  mainWindow?.close()
})

// Open external links
ipcMain.on('open-external', (_, url) => {
  shell.openExternal(url)
})

// Steam path detection (Windows registry mock for non-Windows)
ipcMain.handle('get-steam-path', async () => {
  try {
    if (process.platform === 'win32') {
      const { execSync } = require('child_process')
      const result = execSync(
        'reg query "HKEY_LOCAL_MACHINE\\SOFTWARE\\WOW6432Node\\Valve\\Steam" /v InstallPath',
        { encoding: 'utf-8' }
      )
      const match = result.match(/InstallPath\s+REG_SZ\s+(.+)/)
      if (match) return match[1].trim()
    }
    return 'C:\\Program Files (x86)\\Steam'
  } catch {
    return 'C:\\Program Files (x86)\\Steam'
  }
})

// Device ID generation
ipcMain.handle('get-device-id', async () => {
  const { createHash } = require('crypto')
  const os = require('os')
  const info = `${os.hostname()}-${os.platform()}-${os.arch()}-${os.cpus()[0]?.model}`
  return createHash('sha256').update(info).digest('hex').substring(0, 16).toUpperCase()
})
