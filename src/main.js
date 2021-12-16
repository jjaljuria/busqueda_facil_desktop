const {BrowserWindow, ipcMain, ipcRenderer} = require('electron');
const path = require('path');


ipcMain.handle('search', async(event, search)=>{
	return 'hola';
})

function createWindow(){
	const window = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: true,
			preload: path.join(__dirname, 'preload.js')
		}
	})
	window.loadFile('src/ui/index.html');
}

module.exports = {
	createWindow
}