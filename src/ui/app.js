

const searchText = document.getElementById('searchText');
const searchButton = document.getElementById('searchButton');

searchButton.addEventListener('click', async (event)=>{
	console.log(await ipc.search(searchText.value));
})