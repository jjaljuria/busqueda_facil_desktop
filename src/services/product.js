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

const paginate = async ({pages=10, offset})=>{
	console.log(pages, offset);
	try{
		const {count,rows} = await Product.findAndCountAll({
			limit:pages,
			offset
		});
		console.log([Math.ceil(count/pages), rows])
		return [Math.ceil(count/pages), rows];
	}catch(err){
		console.error('paginate invalid', err);
	}
}

const updateProductName = async (id, name) =>{
	const result = await Product.update({name}, {where: {id}});
	return Boolean(result);
}

module.exports = {
	saveProduct,
	getProducts,
	getCurrency,
	searchProduct,
	paginate,
	updateProductName,
}
