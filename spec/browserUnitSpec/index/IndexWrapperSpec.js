describe("Index Wrapper", () => {
    
    var IndexWrapper = require('../../../public_html/index/IndexWrapper.js');
    var indexWrapper;
    require('../helpers/mock-ajax.js');
    
    
    beforeEach(function () {
        jasmine.getFixtures().fixturesPath = '/base/spec/browserUnitSpec/fixtures/';
        loadFixtures('index-fixture.html');
        indexWrapper = new IndexWrapper(document.getElementsByClassName('infobox')[0], $('#info-sudoku'), $('#info-tictactoe'), $('#play-tictactoe'));
        indexWrapper.registerHandlers();
    });
    
    it("set the fixtue", () => {
        expect( $('#info-sudoku')).toBeInDOM();
        expect( $('#play-sudoku')).toBeInDOM();
        expect( $('#info-tictactoe')).toBeInDOM();
        expect( $('#play-tictactoe')).toBeInDOM();
        expect( $('.infobox').first()).toBeInDOM();
    });
    
    it("should perform actions on clicking the sudoku info button", () => {
        jasmine.Ajax.install();
        expect( $('#info-sudoku')).toBeInDOM();
        
        $('#info-sudoku').click();
        request = jasmine.Ajax.requests.mostRecent();
        request.respondWith({
            status: 200,
            contentType: 'application/json',
            responseText: '{"maxplayer": 1,"name": "Sudoku","difficulty": 5}'
        });

        expect( $('.infobox').first().text()).toContain('Sudoku: Maximum number of');
        
        jasmine.Ajax.uninstall();
    });
    
        it("should perform actions on clicking the tictactoe info button", () => {
        jasmine.Ajax.install();
        expect( $('#info-tictactoe')).toBeInDOM();
        
        $('#info-tictactoe').click();
        request = jasmine.Ajax.requests.mostRecent();
        request.respondWith({
            status: 200,
            contentType: 'application/json',
            responseText: '{"name": "TicTacToe","maxplayer": 1,"difficulty":2}'
        });

        expect( $('.infobox').first().text()).toContain('TicTacToe: Maximum number of');
        
        jasmine.Ajax.uninstall();
    });

    
});
