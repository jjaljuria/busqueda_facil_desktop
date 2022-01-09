const searchText = document.getElementById('searchText');
const searchButton = document.getElementById('searchButton');
const productsTable = document.getElementById('productsTable');
const exchangeInput = document.getElementById('exchange');
const exchangeUpdate = document.getElementById('exchangeUpdate');
const pageItemsContainer = document.getElementById('container-page-items');
const ipcRenderer = window.ipc.ipcRenderer;

window.addEventListener('load', async () => {
	// let params = new URLSearchParams(document.location.search.substring(1));
	// const currentPage = params.get('page') ?? 1;

	//const [pages, rows] = await window.ipc.paginate({ pages: 3, currentPage: currentPage });
	const currency = await window.ipc.currency();
	const products = await window.ipc.products();
	exchangeInput.value = currency.price;
	exchangeInput.dataset.id = currency.id;

	renderProducts(products, currency, productsTable);
	//renderPagination(pages, pageItemsContainer);
	
});

const renderProducts = (products,currency, container) => {
	let html = '';

	products.forEach((product) => {
		html += `
			<tr>
				<td> ${product.dataValues.name} </td>
				<td> ${product.dataValues.price} </td>
				<td> ${(product.dataValues.price * currency.price).toFixed(2)}
			</tr>
		`;
	});
	container.innerHTML = html;
}

function renderPagination(pages, container){
	
	// crear los li de la paginacion
	let pagination = '';

	if (pages > 1) {

		pagination = ` <li class="page-item">
	<a class="page-link" href="#" aria-label="Previous">
	  <span aria-hidden="true">&laquo;</span>
	</a>
  </li>`;

		for (let i = 1; i <= pages; i++) {
			pagination += `
			<li class="page-item"><a class="page-link" href="?page=${i}">${i}</a></li>
		`;
		}

		pagination += `<li class="page-item">
	<a class="page-link" href="#" aria-label="Next">
	  <span aria-hidden="true">&raquo;</span>
	</a>
  </li>`;
	}

	// pintarlos
	container.innerHTML = pagination;
}


searchButton.addEventListener('click', async (event) => {
	console.log(window.ipc);
})

exchangeUpdate.addEventListener('click', async (event) => {
	const exchangeValue = exchangeInput.value;
	const newExchangeValue = await window.ipc.updateExchange({ id: exchangeInput.dataset.id, newValue: exchangeValue });
	console.log(newExchangeValue);
})

searchButton.addEventListener('click', async () => {
	const searchValue = searchText.value;

	const result = await window.ipc.searchProduct(searchValue);
	const currency = await window.ipc.currency();

	let html = '';
	result.forEach(product => {
		html += `
			<tr>
				<td> ${product.dataValues.name} </td>
				<td> ${product.dataValues.price} </td>
				<td> ${(product.dataValues.price * currency.price).toFixed(2)}
			</tr>
		`;
	});

	productsTable.innerHTML = html;
})

