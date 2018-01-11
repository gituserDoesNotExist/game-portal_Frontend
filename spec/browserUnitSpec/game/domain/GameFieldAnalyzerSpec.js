describe("GameFieldAnalyzer", () => {
    
    const GameFieldAnalyzer = require('../../../../public_html/game/domain/GameFieldAnalyzer.js');
    var analyzer;
    
    it("should should verify that gameField is filled", () => {
        jasmine.getFixtures().fixturesPath = './base/spec/browserUnitSpec/fixtures';
        loadFixtures('game-fixture-filled-fields.html');
        
        expect(document.getElementsByClassName('tictactoe')[0]).toBeInDOM();
        
        analyzer = new GameFieldAnalyzer(document.getElementsByClassName('tictactoe')[0]);

        expect(analyzer.isGameFieldFilled()).toBe(true);
    });

    it("should should verify that gameField has one empty field", () => {
        jasmine.getFixtures().fixturesPath = './base/spec/browserUnitSpec/fixtures';
        loadFixtures('game-fixture-one-field-empty.html');
        
        expect(document.getElementsByClassName('tictactoe')[0]).toBeInDOM();
        
        analyzer = new GameFieldAnalyzer(document.getElementsByClassName('tictactoe')[0]);

        expect(analyzer.isGameFieldFilled()).toBe(false);
    });    
    
});