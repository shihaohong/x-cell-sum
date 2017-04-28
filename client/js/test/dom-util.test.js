const { removeChildren } = require ('../dom-util');

describe('dom-util',  () => {
	describe('removeChildre', () => {
		it('removes one child', () => {
			// sets up initial state
			const parent = document.createElement('DIV');
			const child = document.createElement('STRONG');
			parent.appendChild(child);

			//inspect initial state
			expect(parent.childNodes.length).toBe(1);
			expect(parent.childNodes[0]).toBe(child);

			//execute the code under test .. 'removeChildren'
			removeChildren(parent);

			//check to see if children have been removed
			expect(parent.childNodes.length).toBe(0);
		});
	});

});