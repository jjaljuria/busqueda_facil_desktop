window.addEventListener('load', async ()=>{
	const products = await window.ipc.products();
	const currency = await window.ipc.currency();
	let html = '';
	console.log(products);
	console.log(currency);

	products.forEach((product)=>{
		html += `
			<tr>
				<td> ${product.dataValues.name} </td>
				<td> ${product.dataValues.price} </td>
				<td> ${product.dataValues.price * currency.price}
			</tr>
		`;
	});

	productsTable.innerHTML = html;

	exchangeInput.value = currency.price;
	
})


const searchText = document.getElementById('searchText');
const searchButton = document.getElementById('searchButton');
const productsTable = document.getElementById('productsTable');
const exchangeInput = document.getElementById('exchange')

searchButton.addEventListener('click', async (event)=>{
	console.log(window.ipc);
})