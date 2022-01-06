const {Current} = require('../models');

const updateExchange = async ({id, newValue}) =>{
	return await Current.update({price: newValue},{where: {id}});
}

module.exports ={
	updateExchange,
}