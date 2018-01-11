function GameFieldAnalyzer(tictactoeTable) {
    this.table = tictactoeTable;
}
GameFieldAnalyzer.prototype.isGameFieldFilled = function() {
    for(let i=1; i<=9; i++) {
        if ((this.table.querySelector('td[id="' + i + '"').textContent) === '--') {
            return false;
        }
    };  
    return true;
};

module.exports = GameFieldAnalyzer;