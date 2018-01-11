describe("Game Wrapper", () => {
    const TicTacToeField = require('../../../public_html/game/domain/TicTacToeField.js');
    const responseTextLoadGame = '{"game": {"id": 1,"description": "egal","status": "egal"},"fields": [{"id": 1, "lastModified": "2000-10-2", "fieldId": 2, "gameId": 2, "value": "first-field"},{"id": 3, "lastModified": "2000-10-2", "fieldId": 8, "gameId": 2, "value": "other-field"}]}';
    var responseTextPostMove = '{"game":{"id":200,"status":{"id":2,"text":"AI won"}},"field":{"id":1,"lastModified":"2017","fieldId":9,"gameId":200,"value":"x"}}';
    const GameWrapper = require('../../../public_html/game/GameWrapper.js');
    var gameWrapper;
    
    beforeEach(function () {
        jasmine.getFixtures().fixturesPath = '/base/spec/browserUnitSpec/fixtures/';
        loadFixtures('game-fixture.html');
        
        expect($('#textbox')).toBeInDOM();
        expect(document.getElementsByClassName('tictactoe')[0]).toBeInDOM();
        
        gameWrapper = new GameWrapper(document.getElementsByClassName('tictactoe')[0], jQuery('#textbox'), jQuery);
        
  
    });
    
    it("set the fixtue", () => {
        expect( $('.tictactoe').first()).toBeInDOM();
    });
    
    it("should load and display data", () => {
        jasmine.Ajax.install();
        
        gameWrapper.initialize();
        request = jasmine.Ajax.requests.mostRecent();
        request.respondWith({
            status: 200,
            responseText: responseTextLoadGame
        });
        
        expect( $('.tictactoe td[id=2]').text()).toEqual('first-field');
        expect( $('.tictactoe td[id=8]').text()).toEqual('other-field');
        expect( $('.tictactoe td[id=5]').text()).toEqual('--');
        expect(window.sessionStorage.getItem("2")).toContain(JSON.stringify(new TicTacToeField(1,"2000-10-2",2,2,"first-field")));
        expect(window.sessionStorage.getItem("8")).toEqual(JSON.stringify(new TicTacToeField(3,"2000-10-2",8,2,"other-field")));
        
        jasmine.Ajax.uninstall();
    });
    
    it("should process response correctly", () => {
        jasmine.Ajax.install();
        window.sessionStorage.setItem("9",JSON.stringify(new TicTacToeField(1,"2000-10-2",9,200,"first-field")));
        expect(window.sessionStorage.getItem("9")).toEqual('{"id":1,"lastModified":"2000-10-2","fieldId":9,"gameId":200,"value":"first-field"}');
        
        gameWrapper.registerHandlers();

        document.getElementsByClassName('tictactoe')[0].querySelector('td[id="2"]').click();
        
        expect(jQuery('.tictactoe td[id="2"]').text()).toEqual("USER");
        
        request = jasmine.Ajax.requests.mostRecent();
        request.respondWith({
            status: 200,
            responseText: responseTextPostMove
        });
        
        expect(jQuery('.tictactoe td[id="9"').text()).toEqual('x');
        expect(jQuery('#textbox').text()).toEqual('AI won');
        expect(window.sessionStorage.getItem("9")).toEqual('{"id":1,"lastModified":"2017","fieldId":9,"gameId":200,"value":"x"}')

        jasmine.Ajax.uninstall();
    });
    
    it("should not call backend if gameField is filled", () => {
        loadFixtures('game-fixture-filled-fields.html');
        expect(jQuery('.tictactoe')).toBeInDOM();
        
        let gameWrapper = new GameWrapper(document.getElementsByClassName('tictactoe')[0], jQuery('#textbox'), jQuery);
        
        gameWrapper.registerHandlers();
        
        document.getElementsByClassName('tictactoe')[0].querySelector('td[id="2"]').click();
        
        expect(jQuery('#textbox').text()).toEqual("all fields filled");
        expect(jQuery('.tictactoe td[id="2"]').text()).toEqual("x");
    });
    
    
});
