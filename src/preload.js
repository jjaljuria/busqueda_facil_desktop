const {contextBridge, ipcRenderer} = require('electron');

contextBridge.exposeInMainWorld('ipc', {
	async  search(textSearch){
		return await ipcRenderer.invoke('search', {text: textSearch});
	}
})