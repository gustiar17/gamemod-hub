const { app, BrowserWindow, Tray, Menu, nativeImage } = require("electron");
const path = require("path");

let main;
let tray;

function load(win, hash) {
  const dev = process.env.VITE_DEV_SERVER_URL;
  if (dev) return win.loadURL(dev + (hash ? "#" + hash : ""));
  return win.loadFile(path.join(__dirname, "../dist/index.html"), { hash });
}

function createMain() {
  main = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 960,
    minHeight: 600,
    backgroundColor: "#0f1115",
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });
  load(main, "/");
  main.on("close", (e) => {
    if (!app.isQuiting) {
      e.preventDefault();
      main.hide();
    }
  });
}

function createOverlay() {
  const overlay = new BrowserWindow({
    width: 360,
    height: 520,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });
  load(overlay, "/overlay");
}

app.whenReady().then(() => {
  createMain();
  tray = new Tray(nativeImage.createEmpty());
  tray.setToolTip("GameMod Hub");
  tray.setContextMenu(
    Menu.buildFromTemplate([
      { label: "Open", click: () => main.show() },
      { label: "Open overlay", click: createOverlay },
      {
        label: "Quit",
        click: () => {
          app.isQuiting = true;
          app.quit();
        },
      },
    ]),
  );
});

app.on("window-all-closed", () => {});
