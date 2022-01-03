const {Menu, app} = require('electron');
const {createMenu ,menuTemplate} = require('./main');

jest.mock('electron',
	()=>{
			const mockMenu = {
				buildFromTemplate: jest.fn(),
				setApplicationMenu: (menu) => jest.fn().mockReturnThis(),
			}
		return {Menu: mockMenu}
	}
)

describe('Menu', ()=>{
	
	let menu;

	beforeEach(()=>{
		menu = createMenu();
	})

	it('should returned a menu', ()=>{
		console.log(Menu.setApplicationMenu(menu).mock.calls);
		expect(Menu.buildFromTemplate.mock.calls[0][0]).toBe(menuTemplate)
		
	})
})