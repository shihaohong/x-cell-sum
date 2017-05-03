const { getLetterRange } = require('./array-util');
const { removeChildren, createTR, createTD, createTH } = require('./dom-util');

class TableView {
  constructor(model){
    this.model = model
  }

  init() {
    this.initDomReferences();
    this.initCurrentCell();
    this.renderTable();
    this.attachEventHandlers();
  }

  initDomReferences() { // initializes the DOM references
    this.headerRowEl = document.querySelector('THEAD TR');
    this.sheetBodyEl = document.querySelector('TBODY');
    this.footerRowEl = document.querySelector('TFOOT TR');
    this.formulaBarEl = document.querySelector('#formula-bar');
  }

  initCurrentCell() { // initializes the first cell and renders formula bar
    this.currentCellLocation = { col: 0, row: 0};
    this.renderFormulaBar();
  }

  normalizeValueForRendering(value) {
    return value || '';
  }

  renderFormulaBar() {
    const currentCellValue = this.model.getValue(this.currentCellLocation);
    this.formulaBarEl.value = this.normalizeValueForRendering(currentCellValue);
    this.formulaBarEl.focus();
  }

  renderTable() { // renders the table
    this.renderTableHeader();
    this.renderTableBody();
    this.renderTableFooter();
  }

  renderTableHeader() {
    // clear header row
    removeChildren(this.headerRowEl);
    // get letters and populates the header with appropriate values
    getLetterRange('A', this.model.numCols)
      .map(colLabel => createTH(colLabel))
      .forEach(th => this.headerRowEl.appendChild(th));
  }

  isCurrentCell(col, row) {
    return this.currentCellLocation.col === col && 
         this.currentCellLocation.row === row;
  }

  renderTableBody() {
    const fragment = document.createDocumentFragment();
    for (let row = 0; row < this.model.numRows; row++){
      const tr = createTR();
      for (let col = 0; col < this.model.numCols; col++){
        const position = {col: col, row: row}; // generates the position of each box
        const value = this.model.getValue(position); // gets the value thats in that position
        const td = createTD(value); // creates a table item with that given value
        
        if (this.isCurrentCell(col, row)){
          td.className = 'current-cell';
        }

        tr.appendChild(td); // appends a column element to the table row 
      }
      fragment.appendChild(tr); // appends the entire row to the fragment
    }
    removeChildren(this.sheetBodyEl);
    this.sheetBodyEl.appendChild(fragment);
  }

  renderTableFooter() {
    removeChildren(this.footerRowEl);
    for (let col = 0; col < this.model.numCols; col++){
      let sum = 0;
      // insert sum values here when you figure it out
      for (let row = 0; row < this.model.numRows; row++){
        const position = {col:col, row: row};
        const value = Number(this.model.getValue(position));

        if (!isNaN(value)) {
          sum += value;
        }
      }

      const td = createTD(sum);
      this.footerRowEl.appendChild(td);
    }

  }

  attachEventHandlers() {
    this.sheetBodyEl.addEventListener('click', this.handleSheetClick.bind(this));
    this.formulaBarEl.addEventListener('keyup', this.handleFormulaBarChange.bind(this));
  }

  handleFormulaBarChange(evt) {
    const value = this.formulaBarEl.value;
    this.model.setValue(this.currentCellLocation, value);
    this.renderTableBody();
  }

  handleSheetClick(evt) {
    const col = evt.target.cellIndex;
    const row = evt.target.parentElement.rowIndex - 1;

    this.currentCellLocation = {col: col, row: row};
    this.renderTableBody();
    this.renderFormulaBar();
    this.renderTableFooter();
  }
}

module.exports = TableView;