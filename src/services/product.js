const {Product} = require('../models');

const saveProduct = async ({name, price})=>{
	const product = await Product.create({name,price});
	console.log(product);
	return product;
}

const getProducts = async () =>{
	try{
		const product = await Product.findAll({ where: {}});
		return product;
	}catch(error){
		console.log(error);
	}
}

module.exports = {
	saveProduct,
	getProducts,
}
