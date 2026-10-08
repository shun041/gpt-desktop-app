const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;
let splashWindow;

function createSplash() {
  splashWindow = new BrowserWindow({
    width: 520,
    height: 340,
    frame: false,
    transparent: true,
    resizable: false,
    show: false,
    alwaysOnTop: true
  });

  splashWindow.loadFile(path.join(__dirname, 'splash.html'));
  splashWindow.once('ready-to-show', () => {
    splashWindow.show();
  });
}

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 780,
    minWidth: 960,
    minHeight: 640,
    show: false,
    backgroundColor: '#0b1020',
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true
    }
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  mainWindow.once('ready-to-show', () => {
    setTimeout(() => {
      if (splashWindow) splashWindow.close();
      mainWindow.show();
    }, 1800);
  });
}

app.whenReady().then(() => {
  createSplash();
  createMainWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
