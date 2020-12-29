const { app, BrowserWindow, globalShortcut } = require("electron");
const path = require("path");

let mainWindow;

// 避免多開
const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
  app.quit();
  return;
}

function createWindow() {
  // create browser window
  mainWindow = new BrowserWindow({
    title: "服務時數管理系統",
    width: 900,
    height: 700,
    minWidth: 800,
    minHeight: 600,
    x: 50,
    y: 50,
    webPreferences: {
      nodeIntegration: true,
    },
    icon: path.join(__dirname, "./build/icon.ico"),
  });

  // load application
  mainWindow.loadFile(path.join(__dirname, "./build/index.html"));

  // hide menu
  mainWindow.setMenuBarVisibility(false);

  // dev tools
  // mainWindow.webContents.openDevTools()

  // close window
  mainWindow.on("closed", function () {
    mainWindow = null;
  });
}
app.on("ready", createWindow);
app.on("add", (event) => {
  event.preventDefault();
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
app.on("activate", function () {
  if (mainWindow === null) {
    createWindow();
  }
});
