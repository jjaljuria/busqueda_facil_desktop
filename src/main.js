const { BrowserWindow, ipcMain, Menu, app } = require('electron');
const path = require('path');
const services = require('./services/product');
const currencyServices = require('./services/currency');

ipcMain.handle('search', async (event, search) => {
	return search.text;
})

function createWindowMain() {
	const window = createWindow();
	window.loadFile('src/ui/index.html');
}

function createWindow() {
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
	const product = await services.saveProduct({ name, price });
	return product;
});

ipcMain.handle('getProducts', async () => {
	const products = await services.getProducts();
	return products;
});

ipcMain.handle('getCurrency', async () => {
	let currency = await currencyServices.getCurrency();
	currency = currency.dataValues;
	return { name: currency.name, price: currency.price, id: currency.id };
});

ipcMain.handle('updateExchange', async (event, { id, newValue }) => {
	const currencyUpdated = await currencyServices.updateExchange({ id, newValue });
	return currencyUpdated;
});

ipcMain.handle('searchProduct', async (event, nameProduct) => {
	return await services.searchProduct(nameProduct);
});

ipcMain.handle('paginate', async (event, config) => await services.paginate(config));

ipcMain.handle('updateNameProduct', async (event, id, name)=> await services.updateProductName(id, name));

ipcMain.handle('updateProductPrice', async (event, id, price)=> await services.updateProductPrice(id, price));

ipcMain.handle('deleteProduct', async (event, id) => await services.deleteProduct(id));

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