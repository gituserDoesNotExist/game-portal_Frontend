describe("Game Wrapper", () => {
    const TicTacToeField = require('../../../public_html/game/domain/TicTacToeField.js');
    const responseTextLoadGame = '{"game": {"id": 1,"description": "egal","status": "egal"},"fields": [{"id": 1, "lastModified": "2001-10-03T10:02:03", "fieldId": 2, "gameId": 1, "value": "first-field"},{"id": 3, "lastModified": "2000-10-03T10:02:03", "fieldId": 8, "gameId": 1, "value": "other-field"}]}';
    var responseTextPostMove = '{"status":{"id":2,"text":"Spiel laeuft noch"},"field":{"id":90,"lastModified":"2005-10-03T10:02:03","fieldId":9,"gameId":1,"value":"AI"}}';
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
        expect(window.sessionStorage.getItem("2")).toContain(JSON.stringify(new TicTacToeField(1,"2001-10-03T10:02:03",2,1,"first-field")));
        expect(window.sessionStorage.getItem("8")).toEqual(JSON.stringify(new TicTacToeField(3,"2000-10-03T10:02:03",8,1,"other-field")));
        
        jasmine.Ajax.uninstall();
    });
    
    it("should process response correctly", () => {
        jasmine.Ajax.install();
//        simulate loading game
        window.sessionStorage.setItem("2",JSON.stringify(new TicTacToeField(87,"2000-10-03T10:02:03",2,200,"--")));
        
        gameWrapper.registerHandlers();

        document.getElementsByClassName('tictactoe')[0].querySelector('td[id="2"]').click();
        
        expect(jQuery('.tictactoe td[id="2"]').text()).toEqual("USER");
        
        request = jasmine.Ajax.requests.mostRecent();
        request.respondWith({
            status: 200,
            responseText: responseTextPostMove
        });
        
        expect(jQuery('.tictactoe td[id="9"').text()).toEqual('AI');
        expect(jQuery('#textbox').text()).toEqual('Spiel laeuft noch');
        console.log("dkn");
        expect(jasmine.Ajax.requests.mostRecent().data()).toEqual('{"id":87,"lastModified":"2000-10-03T10:02:03","fieldId":2,"gameId":200,"value":"USER"}');
        expect(window.sessionStorage.getItem("2")).toEqual('{"id":87,"lastModified":"2000-10-03T10:02:03","fieldId":2,"gameId":200,"value":"USER"}');
        expect(window.sessionStorage.getItem("9")).toEqual('{"id":90,"lastModified":"2005-10-03T10:02:03","fieldId":9,"gameId":1,"value":"AI"}');

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
