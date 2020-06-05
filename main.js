const { app, BrowserWindow } = require('electron')

//---Uncomment the code below for fast reload at development stage---
// const path = require('path')
// require('electron-reload')(__dirname, {
//   electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
//   })

function createWindow () {
  // Create the browser window.
  let win = new BrowserWindow({
    width: 455,
    height: 345,        
    // webPreferences: {
    //   nodeIntegration: true
    // },
    icon: __dirname + './src/assets/Logo_G.ico',
    backgroundColor: '#bbb',
    maximizable: false,
    resizable: false,
    show: false,
    alwaysOnTop: true,
  })  

  win.setMenuBarVisibility(false)

   // and load the index.html of the app.
  win.loadFile('index.html') 
  win.once('ready-to-show', () => {
    win.show()
  })   
}

app.whenReady().then(createWindow)
