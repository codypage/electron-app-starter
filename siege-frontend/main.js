const { app, BrowserWindow, ipcMain, nativeTheme } = require("electron");
const path = require("path");
const os = require("os");

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile("index.html");

  ipcMain.handle("dark-mode:toggle", () => {
    if (nativeTheme.shouldUseDarkColors) {
      nativeTheme.themeSource = "light";
    } else {
      nativeTheme.themeSource = "dark";
    }
    return nativeTheme.shouldUseDarkColors;
  });

  ipcMain.handle("dark-mode:system", () => {
    nativeTheme.themeSource = "system";
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// Information gathering with os module:

// Platform
console.log(os.platform());
console.log(os.type());
// Arch
console.log(os.arch());

// Operating System
console.log(os.release());
// Hostname
console.log(os.hostname());
// CPU
console.log(os.cpus());
// RAM
console.log(os.freemem());
// Motherboard
// Graphics
// Storage

// Network
console.log(os.networkInterfaces());

// Uptime
console.log(os.uptime());

// Spawning child-processes:
// const { spawn } = require("child_process");
// const bat = spawn("cmd.exe", ["/c", "my.bat"]);

// bat.stdout.on("data", (data) => {
//   console.log(data.toString());
// });

// bat.stderr.on("data", (data) => {
//   console.error(data.toString());
// });

// bat.on("exit", (code) => {
//   console.log(`Child exited with code ${code}`);
// });
