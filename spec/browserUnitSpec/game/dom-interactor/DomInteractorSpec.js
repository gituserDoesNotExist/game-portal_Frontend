describe("DomInteractor", () => {
    
    const DomInteractor = require('../../../../public_html/game/dom-interactor/DomInteractor.js');
    var interactor;
    
    beforeEach(function () {
        jasmine.getFixtures().fixturesPath = '/base/spec/browserUnitSpec/fixtures/';
        loadFixtures('game-fixture.html');
        
        interactor = new DomInteractor(document.getElementsByClassName('tictactoe')[0],jQuery('#textbox'));
    });
    
    it("should change the table", () => {
        interactor.changeFieldValue(4,"new value");
        
        expect( $('.tictactoe td[id=4]').text()).toEqual("new value");
    });
    
    it("should change the textcontent", () => {
        expect($('#textbox').text()).toEqual('');
        
        interactor.changeTextboxContent("ai won");
        
        expect($('#textbox').text()).toEqual('ai won');
    })
});