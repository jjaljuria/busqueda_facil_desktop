const {Product, Current} = require('../models');
const sequelize = require('sequelize');

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

const getCurrency = async ()=>{
	try{
		const currency = await Current.findOne({where:{}});
		return currency;
	}catch(error){
		console.log(error);
	}
}

const searchProduct = async (nameProduct)=>{
	const op = sequelize.Op;

	try{
		const result = await Product.findAll({
			where: {
				name: {
					[op.like]: `%${nameProduct}%`
				}
			}
		});

		return result;
	}catch(err){
		console.error('error in searchProduct', err);
	}
}

module.exports = {
	saveProduct,
	getProducts,
	getCurrency,
	searchProduct,
}
