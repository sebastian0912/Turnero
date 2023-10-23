const { app, BrowserWindow } = require('electron')
const { autoUpdater, AppUpdater } = require("electron-updater");



autoUpdater.autoDownload = false;
autoUpdater.autoInstallOnAppQuit = true;

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600
    })

    //win.setMenu(null)

    autoUpdater.checkForUpdates();

    win.loadFile('./src/app/Login/login.html')
}


/*Nueva actualizacion*/
autoUpdater.on("update-available", async () => {
    console.log("Actualizacion disponible");
    autoUpdater.downloadUpdate();
});


// MOSTRAR MENSAJE CUANDO SE ESTE DESCARGANDO LA ACTUALIZACION
autoUpdater.on("update-downloaded", async (info) => {
    console.log("Actualizacion descargada");
    autoUpdater.quitAndInstall();
}
);

// actualizacion no disponible
autoUpdater.on("update-not-available", () => {
    console.log("Actualizacion no disponible");
});


autoUpdater.on("error", (error) => {
    console.error("Hubo un error con la actualización:", error);
});




app.whenReady().then(() => {
    createWindow();
});