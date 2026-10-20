const { contextBridge } = require("electron");

contextBridge.exposeInMainWorld("hub", { platform: process.platform });
