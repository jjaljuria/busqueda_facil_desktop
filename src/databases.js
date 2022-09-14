const {Currency} = require('./models');
const { Sequelize } = require('sequelize');
const { Umzug, SequelizeStorage } = require('umzug');
const sequelize = new Sequelize({ dialect: 'sqlite', storage: './db/busqueda_facil.sqlite3' });

const umzug = new Umzug({
	migrations: { glob: './src/migrations/*.js' },
	context: sequelize.getQueryInterface(),
	storage: new SequelizeStorage({ sequelize }),
	logger: console,
});

(async () => {
	await umzug.up();
	let currency = null;
	try{
		currency = await Currency.findOne({ where: {} });
	}catch(err){
		console.log({err});
	}
	
	if (!currency) {
		const firstCurrency = await Currency.create({
			name: 'USD',
			price: 0,
		});
		console.log('firstCurrency: ', firstCurrency);
	}
})();
