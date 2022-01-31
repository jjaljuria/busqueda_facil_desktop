const { createWindowMain, createMenu } = require('./main.js');
const { app } = require('electron');
require('./databases.js');

require('electron-reload')(__dirname);

app.whenReady().then(() => {

	createWindowMain();
	createMenu();

});