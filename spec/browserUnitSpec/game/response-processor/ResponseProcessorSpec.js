describe("ResponseProcessor", () => {
    const TicTacToeField = require('../../../../public_html/game/domain/TicTacToeField.js');
    const ResponseProcessor = require('../../../../public_html/game/response-processor/ResponseProcessor.js');
    var processor;
    
    const responseText = '{"game": {"id": 1,"description": "egal","status": "egal"},"fields": [{"id": 1, "lastModified": "2000-10-2", "fieldId": 2, "gameId": 2, "value": "first-field"},{"id": 3, "lastModified": "2000-10-2", "fieldId": 8, "gameId": 2, "value": "other-field"}]}';
    
    beforeEach(function () {
        jasmine.getFixtures().fixturesPath = '/base/spec/browserUnitSpec/fixtures/';
        loadFixtures('game-fixture.html');
        
        expect($('.tictactoe').first()).toBeInDOM();
        
        processor = new ResponseProcessor(document.getElementsByClassName('tictactoe')[0]);
    });
    
    it("should fill fields", () => {
        processor.processGameFieldDtoDetails(responseText);
        expect( $('.tictactoe td[id=2]').text()).toEqual('first-field');
        expect( $('.tictactoe td[id=8]').text()).toEqual('other-field');
        expect( $('.tictactoe td[id=5]').text()).toEqual('--');
        

        expect(window.sessionStorage.getItem("2")).toContain(JSON.stringify(new TicTacToeField(1,"2000-10-2",2,2,"first-field")));
        expect(window.sessionStorage.getItem("8")).toEqual(JSON.stringify(new TicTacToeField(3,"2000-10-2",8,2,"other-field")));
    });
});


