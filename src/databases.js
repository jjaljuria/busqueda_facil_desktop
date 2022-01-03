const sqlite = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite.Database(path.join(__dirname, 'db/busqueda_facil.sqlite3'), (err) =>{
	if(err){
		console.error(err);
	}else{
		console.log('database ok');
	}
});

db.on('close', ()=> db.close());

db.query = function (sql, params) {
	params = params || [];
	let that = this;
	return new Promise((resolve, reject) => {
		that.all(sql, params, function (error, rows) {
			console.log(sql, rows);
			if (error)
				reject(error);
			else
				resolve(rows);
		})
	})
};

function getConnection(){
	return db;
}

module.exports = {
	getConnection
}