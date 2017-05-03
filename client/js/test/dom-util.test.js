const { createTR,
    createTD,
    createTH,
    removeChildren } = require ('../dom-util');

describe('dom-util',  () => {
  
  describe('DOM creation functions', () => {
    describe('createTH', () => {
      it('produces valid TH element', () => {
        const el = createTH();
        expect(el.tagName).toBe('TH');
      });

      it('sets the text of the TH', () => {
        const text = 'Oh that\'s just great! Well, game over, man!';
        const el = createTH(text);
        expect(el.textContent).toEqual(text);
      });
    });

    describe('createTD', () => {
      it('produces valid TD element', () => {
        const el = createTD();
        expect(el.tagName).toBe('TD');
      });
    });

    describe('createTR', () => {
      it('produces valid TR element', () => {
        const el = createTR();
        expect(el.tagName).toBe('TR');
      });
    });
  });

  describe('removeChildren', () => {
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