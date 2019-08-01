const fs = require('fs')
const { app, BrowserWindow, ipcMain } = require('electron')

const { getHostsPath, execSudo } = require('./util');

let win

let originalHosts = fs.readFileSync('./hosts/recette.hosts').toString();

function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
        },
    })

    // Open the DevTools.
    win.webContents.openDevTools()

    win.loadFile('index.html')

    // TODO : save current hosts before doing anything

    win.on('closed', () => {
        win = null
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On quit, restore original host file
    

    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow()
    }
})

// hosts path
const hostsFilePath = '/home/zchtatar/Desktop/repos/env-switcher/result.txt'
ipcMain.on('copyHosts', (_, envName) => {
    const opts = {
        name: 'Hosts switcher',
    }

    const customHosts = fs.readFileSync('./hosts/' + envName + '.hosts').toString()
    const cleanAndReplaceHosts = "rm " +hostsFilePath+ " && { echo '"+originalHosts+"'; echo '"+customHosts+"'; } >> " + hostsFilePath

    execSudo(cleanAndReplaceHosts, opts, (error, stdout, stderr) => {
        if (error) console.log('stderr: ', stderr, error)
        console.log('stdout: ', stdout)
    })
})