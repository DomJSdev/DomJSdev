const { app, BrowserWindow, ipcMain } = require("electron");
const { view } = require("./view.js");
const { controller } = require("./controller.js");

let test = false;

let path = "./todo.json";

const initApp = async () => {
  win = new BrowserWindow(view.window);
  win.loadFile("views/index.html");
  if (test) win.webContents.openDevTools();
};

app.on("ready", initApp);

ipcMain.on("init", async (evt, args) => {
    let fileContent = await controller.read(path);

    if (fileContent.error.length > 0) evt.sender.send("error", fileContent);
    else                              evt.sender.send("load", fileContent);
});

ipcMain.on("save", async (evt, args) => {
  args.error = "";

  fileContent = await controller.readToSave(path, args);

  if (fileContent.error.length > 0) evt.sender.send("error", fileContent);
  else                              evt.sender.send("todos", fileContent);
  
});

ipcMain.on("delete", async (evt, args) => {
  args.error = "";

  fileContent = await controller.readToDelete(path, args);

  if (fileContent.error.length > 0) evt.sender.send("error", fileContent);
  else                              evt.sender.send("todos", fileContent);
  
});
