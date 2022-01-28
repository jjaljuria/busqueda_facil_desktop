const {Currency} = require('../models');

const updateExchange = async ({id, newValue}) =>{
	return await Currency.update({price: newValue},{where: {id}});
}

const getCurrency = async ()=>{
	try{
		const currency = await Currency.findOne({where:{}});
		return currency;
	}catch(error){
		console.log('services.currency.getCurrency', error);
	}
}

module.exports ={
	updateExchange,
	getCurrency,
}