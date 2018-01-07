describe("DomInteractor:", () => {
    var DomInteractor = require('../../../../public_html/index/dom-interactor/DomInteractor.js');
    var domInteractor;
    var infoboxElement;
    
    beforeEach(function () {
        infoboxElement = setFixtures('<div class="infobox">test<div>');
        domInteractor = new DomInteractor(document.getElementsByClassName('infobox')[0]);
    });
    
    it("should set the fixture", () => {
        expect( $('.infobox')).toBeInDOM();
    });
    
    it("should set text content", () => {
        let testText = 'test text';

        domInteractor.showResponseOnPage(testText);
        
        expect( $('.infobox').text()).toEqual(testText);
        expect( $('.infobox').css('border')).toEqual('1px solid rgb(0, 0, 0)');
    });
});