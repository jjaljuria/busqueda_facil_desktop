const form = document.getElementById('productForm');

form.addEventListener('submit', async (e) => {
	e.preventDefault(); 
	const name = document.getElementById('name').value;
	const price = document.getElementById('price').value;
	try{
		await window.ipc.saveProduct({name, price});
	}catch(err){
		console.log(err);
	}
	
}
