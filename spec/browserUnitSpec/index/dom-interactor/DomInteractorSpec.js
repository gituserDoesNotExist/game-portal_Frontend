describe("DomInteractor:", () => {
    var DomInteractor = require('../../../../public_html/index/dom-interactor/DomInteractor.js');
    var domInteractor;
    var infoboxElement;
    
    beforeEach(function () {
        domInteractor = new DomInteractor();
        infoboxElement = setFixtures('<div class="infobox">test<div>');
    });
    
    it("should set the fixture", () => {
        expect( $('.infobox')).toBeInDOM();
    });
    
    it("should set text content", () => {
        let testText = 'test text';
        domInteractor.setInfobox(document.getElementsByClassName('infobox')[0]);
        
        domInteractor.showResponseOnPage(testText);
        
        expect( $('.infobox').text()).toEqual(testText);
        expect( $('.infobox').css('border')).toEqual('1px solid rgb(0, 0, 0)');
    });
});