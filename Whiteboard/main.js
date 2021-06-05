const electron = require("electron");
const app = electron.app;
const browserWindow = electron.BrowserWindow;

function createWindow()
{
    const mainWindow = new browserWindow(
    {   
        width: 800,
        height: 600,
        backgroundColor: '#FFFFFF',
        webPreferences: 
        {
            nodeIntegration: true
        }
    });

    mainWindow.loadFile("index.html")
    .then(function()
    {
        mainWindow.webContents.openDevTools();
        mainWindow.maximize();
        mainWindow.removeMenu();
    });
}

app.whenReady()
.then(function(){
    createWindow();
})