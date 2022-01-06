const {contextBridge, ipcRenderer} = require('electron');


contextBridge.exposeInMainWorld('ipc', {
	async  search(textSearch){
		return await ipcRenderer.invoke('search', {text: textSearch});
	},
	async saveProduct({name, price}){
		return await ipcRenderer.invoke('saveProduct', {name, price});
	},
	async products(){
		return await ipcRenderer.invoke('getProducts');
	},
	async currency(){
		return await ipcRenderer.invoke('getCurrency');
	},
	async updateExchange({id, newValue}){
		try{
			newValue = parseFloat(newValue);
			id = parseInt(id);
		}catch(err){
			console.error('Not valid newValue or id not valid', err);
		}

		return await ipcRenderer.invoke('updateExchange', {id, newValue});
	}
})