const searchText = document.getElementById("searchText");
const searchButton = document.getElementById("searchButton");
const productsTable = document.getElementById("productsTable");
const exchangeInput = document.getElementById("exchange");
const exchangeUpdate = document.getElementById("exchangeUpdate");
const pageItemsContainer = document.getElementById("container-page-items");
const ipcRenderer = window.ipc.ipcRenderer;

window.addEventListener("load", async () => {
  // let params = new URLSearchParams(document.location.search.substring(1));
  // const currentPage = params.get('page') ?? 1;

  //const [pages, rows] = await window.ipc.paginate({ pages: 3, currentPage: currentPage });
  const currency = await window.ipc.currency();
  const products = await window.ipc.products();
  exchangeInput.value = currency.price;
  exchangeInput.dataset.id = currency.id;
  console.log(products);
  renderProducts(products, currency, productsTable);
  //renderPagination(pages, pageItemsContainer);
});

const renderProducts = (products, currency, container) => {
  let html = "";

  products.forEach((product) => {
    html += `
			<tr id="product-${product.dataValues.id}">
				<td id="product-name-${product.dataValues.id}">

					<button class="btn btn-sm btn-danger rounded-circle" onclick="deleteProduct(${
            product.dataValues.id
          })"><i class="fa fa-trash-alt"></i></button>

					<button class="btn btn-sm btn-secondary rounded-circle" onclick="editProductName(${
            product.dataValues.id
          })"><i class="fa fa-pen"></i></button> 

					<span class="product-name">${product.dataValues.name}<span></td>

				<td id="product-price-${product.dataValues.id}" >

					<button class="btn btn-sm btn-secondary rounded-circle" onclick="editProductPrice(${
            product.dataValues.id
          })"><i class="fa fa-pen"></i></button> 

					<span class="product-price">${product.dataValues.price}</span> 

				</td>
				<td id="product-price-bs-${product.dataValues.id}"> ${(
      product.dataValues.price * currency.price
    ).toFixed(2)}
			</tr>
		`;
  });
  container.innerHTML = html;
};

async function deleteProduct(id) {
  const result = await window.ipc.deleteProduct(id);

  if (!result) {
    alert("Error when delete product");
  }

  const productNameRow = document.getElementById("product-" + id);
  productNameRow.remove();
}

function editProductName(id) {
  const productNameRow = document.getElementById("product-name-" + id);
  const productNameCell = productNameRow.querySelector("span.product-name");

  productNameRow.innerHTML = `
		<button class="btn btn-sm btn-danger rounded-circle" onclick="deleteProduct(${id}})"><i class="fa fa-trash-alt"></i></button>
		<button class="btn btn-sm btn-secondary rounded-circle" onclick="saveProductNameEdited(${id})"><i class="fa fa-save"></i></button> 
		<input type="text" value="${productNameCell.textContent.trim()}"/>
	`;
}

async function saveProductNameEdited(id) {
  const productNameRow = document.getElementById("product-name-" + id);
  const productName = productNameRow.querySelector("input").value;

  const result = await ipcRenderer.invoke("updateNameProduct", id, productName);
  if (result) {
    alert("ok");
  }

  productNameRow.innerHTML = `
		<button class="btn btn-sm btn-danger rounded-circle" onclick="deleteProduct(${id}})"><i class="fa fa-trash-alt"></i></button>
		<button class="btn btn-sm btn-secondary rounded-circle" onclick="editProductName(${id})"><i class="fa fa-pen"></i></button>
		<span class="product-name">${productName.trim()}</span>
	`;
}

function editProductPrice(id) {
  const productPriceRow = document.getElementById("product-price-" + id);
  const productPriceCell = productPriceRow.querySelector("span.product-price");

  productPriceRow.innerHTML = `
		<button class="btn btn-sm btn-secondary rounded-circle" onclick="saveProductPriceEdited(${id})"><i class="fa fa-save"></i></button> 
		<input type="number"  min="0.1" step="0.1" value="${productPriceCell.textContent.trim()}"/>
	`;
}

async function saveProductPriceEdited(id) {
  const productPriceRow = document.getElementById("product-price-" + id);
  const productPrice = productPriceRow.querySelector("input").value;

  try {
    const result = await ipcRenderer.invoke(
      "updateProductPrice",
      id,
      productPrice
    );
  } catch (err) {
    console.error(err);
  }

  productPriceRow.innerHTML = `

		<button class="btn btn-sm btn-secondary rounded-circle" onclick="editProductPrice(${id})"><i class="fa fa-pen"></i></button>
		<span class="product-price">${productPrice.trim()}</span>
	`;

  const productPriceBs = document.getElementById("product-price-bs-" + id);
  const currency = await window.ipc.currency();

  productPriceBs.textContent = (
    parseFloat(productPrice) * currency.price
  ).toFixed(2);
}

function renderPagination(pages, container) {
  // crear los li de la paginacion
  let pagination = "";

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

searchButton.addEventListener("click", async (event) => {
  console.log(window.ipc);
});

exchangeUpdate.addEventListener("click", async (event) => {
  const exchangeValue = exchangeInput.value;
  const newExchangeValue = await window.ipc.updateExchange({
    id: exchangeInput.dataset.id,
    newValue: exchangeValue,
  });
  window.location.reload();
});

searchButton.addEventListener("click", async () => {
  const searchValue = searchText.value;

  const result = await window.ipc.searchProduct(searchValue);
  const currency = await window.ipc.currency();

  renderProducts(result, currency, productsTable);
});
