const {createWindowMain, createMenu} = require('./main.js');
const { app } = require('electron');
const {getConnection} = require('./databases');

require('electron-reload')(__dirname);

app.whenReady().then(()=>{
	
	createWindowMain();
	createMenu();
	
});