require('@testing-library/jest-dom/extend-expect');
const { getByText, getByLabelText, fireEvent} = require('@testing-library/dom');
const { JSDOM } = require('jsdom');
const fs = require('fs/promises');

const dom = (async ()=>{
	let html;
		try{
			html = await fs.readFile('src/ui/newProducts.html', 'utf8');
		}catch(err){
			console.log(err)
		}
	return new JSDOM(html).window.document;
	})();

describe('newProduct UI Test', () => {

	it('should exits label Nombre', async ()=>{
		getByLabelText(await dom, 'Nombre', {exact:false});
	})
	
	it('should exits label Precio', async ()=>{
		getByLabelText(await dom, 'Precio', {exact:false});
	})

	it('should exits buttom Guardar', async () => {
		const button = getByText(await dom, 'Guardar');

	})
})

describe('newProduct logic', ()=>{
	it('should press button', ()=>{

		const mockHandler = jest.fn();
		const dom = new JSDOM('<button class="btn btn-primary" id="saveProduct">Guardar</button>').window.document;
		const button = dom.getElementById('saveProduct');
		button.addEventListener('click', mockHandler);
		fireEvent.click(button);
		fireEvent.click(button);
		expect(mockHandler).toHaveBeenCalledTimes(2);
		
		
	})
})