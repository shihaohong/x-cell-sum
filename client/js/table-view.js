const { getLetterRange } = require('./array-util');
const { removeChildren, createTR, createTD, createTH } = require('./dom-util');

class TableView {
	constructor(model){
		this.model = model
	}

	init() {
		this.initDomReferences();
		this.renderTable();
	}

	initDomReferences() {
		this.headerRowEl = document.querySelector('THEAD TR');
		this.sheetBodyEl = document.querySelector('TBODY');
	}

	renderTable() {
		this.renderTableHeader();
		this.renderTableBody();
	}

	renderTableHeader() {
		// clear header row
		removeChildren(this.headerRowEl);
		// get letters and build elements
		getLetterRange('A', this.model.numCols)
			.map(colLabel => createTH(colLabel))
			.forEach(th => this.headerRowEl.appendChild(th));
	}

	renderTableBody() {
		const fragment = document.createDocumentFragment();
		for (let row = 0; row < this.model.numRows; row++){
			const tr = createTR();
			for (let col = 0; col < this.model.numCols; col++){
				const position = {col: col, row: row}; // generates the position of each box
				const value = this.model.getValue(position); // gets the value thats in that position
				const td = createTD(value); // creates a table item with that given value
				tr.appendChild(td); // appends a column element to the table row 
			}
			fragment.appendChild(tr); // appends the entire row to the fragment
		}
		removeChildren(this.sheetBodyEl);
		this.sheetBodyEl.appendChild(fragment);
	}
}

module.exports = TableView;