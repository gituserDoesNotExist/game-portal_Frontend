var IndexWrapper = require('./index/IndexWrapper.js');

indexWrapper = new IndexWrapper(document.getElementsByClassName('infobox')[0], $('info-sudoku'), $('info-tictactoe'), $('play-tictactoe'));

