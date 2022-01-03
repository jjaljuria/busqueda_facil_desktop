window.addEventListener('load', async ()=>{
	const products = await window.ipc.products();
	let html = '';
	console.log(products);

	products.forEach((product)=>{
		html += `
			<tr>
				<td> ${product.dataValues.name} </td>
				<td> ${product.dataValues.price} </td>
			</tr>
		`;
	});

	productsTable.innerHTML = html;
})


const searchText = document.getElementById('searchText');
const searchButton = document.getElementById('searchButton');
const productsTable = document.getElementById('productsTable');

searchButton.addEventListener('click', async (event)=>{
	console.log(window.ipc);
})