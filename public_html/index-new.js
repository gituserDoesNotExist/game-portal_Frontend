var IndexWrapper = require('./index/IndexWrapper.js');

document.addEventListener('DOMContentLoaded', function() {
       
    indexWrapper = new IndexWrapper(document.getElementsByClassName('infobox')[0], jQuery('#info-sudoku'), jQuery('#info-tictactoe'), jQuery('#play-tictactoe'));
    indexWrapper.registerHandlers();

}, false);
