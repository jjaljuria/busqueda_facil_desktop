const { BrowserWindow, ipcMain, Menu, app } = require('electron');
const path = require('path');
const services = require('./services/product');

ipcMain.handle('search', async (event, search) => {
	return search.text;
})

function createWindowMain() {
	const window = createWindow();
	window.loadFile('src/ui/index.html');
}

function createWindow(){
	const window = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: true,
			preload: path.join(__dirname, 'preload.js'),
		}
	})
	return window
}

ipcMain.handle('saveProduct', async (event, { name, price }) => {
	const product = await services.saveProduct({name, price});
	return product;
});

ipcMain.handle('getProducts', async ()=>{
	const products = await services.getProducts();
	return products;
});

ipcMain.handle('getCurrency', async()=>{
	let currency = await services.getCurrency();
	currency = currency.dataValues;
	return {name: currency.name, price: currency.price};
});

const template = [
	{
		label: 'inicio',
		submenu: [
			{
				label: 'Nuevo',
				click: () => {
					createNewProductWindow();
				}
			},

		]
	}, {
		label: 'View',
		submenu: [{ role: 'reload' },
		{ role: 'forceReload' },
		{ role: 'toggleDevTools' }]
	}

];

function createMenu() {
	const menu = Menu.buildFromTemplate(template);
	Menu.setApplicationMenu(menu);
	return menu;
}

function createNewProductWindow() {
	const win = createWindow();
	win.loadFile('src/ui/newProducts.html');
}
module.exports = {
	createWindowMain,
	createMenu,
	menuTemplate: template,
	createNewProductWindow,
}