class Environment{

	constructor({environment}){
		if(typeof(environment) !== 'string') throw new Error('environment need to be string')

		this.environment = environment
	}

	exec(){ throw new Error('Not implemented yet') }
}

class WebEnvironment extends Environment{
	exec(){

	}
}

class DesktopEnviroment extends Environment{
	exec(){
		const { createWindowMain, createMenu } = require('./main.js');
		const { app } = require('electron');
		require('./databases.js');
		require('electron-reload')(__dirname);

		app.whenReady().then(() => {

			createWindowMain();
			createMenu();
		
		});
	}
}


const env = process.env.ENVIRONMENT ?? 'desktop'
let app = null
if(env === 'web') app = new WebEnvironment({environment: env})
if(env === 'desktop') app = new DesktopEnviroment({environment: env})
app.exec()
