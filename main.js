const { app, BrowserWindow } = require('electron')
const { autoUpdater, AppUpdater } = require("electron-updater");
const path = require('path');



autoUpdater.autoDownload = false;
autoUpdater.autoInstallOnAppQuit = true;

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1300,
        height: 900,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js'), // Si estás utilizando un script de precarga
        },
    })

    //win.setMenu(null)

    autoUpdater.checkForUpdates();

    win.loadFile('./src/app/Login/login.html')
}


// Etiqueta meta de Content Security Policy (CSP)
const cspMetaTag = `<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'">`;

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
    // Añade la etiqueta CSP meta al head del archivo HTML
    createWindow().webContents.on('dom-ready', () => {
        createWindow().webContents.executeJavaScript(`
            const head = document.head || document.getElementsByTagName('head')[0];
            const meta = document.createElement('meta');
            meta.httpEquiv = 'Content-Security-Policy';
            meta.content = 'default-src 'self'; script-src 'self'';
            head.appendChild(meta);
        `);
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

app.whenReady().then(() => {
    createWindow();
});