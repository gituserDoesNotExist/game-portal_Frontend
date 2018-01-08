var CallBackendController = require('./xhr/CallBackendController.js');
var ResponseProcessor = require('./response-processor/ResponseProcessor.js');

function IndexWrapper(infobox, info_sudoku, info_tictactoe, play_tictactoe) {
    
    this.callBackendController = new CallBackendController(jQuery, infobox);
    this.processor = new ResponseProcessor();

    var SELF = this;
    this.registerHandlers = function() {
        info_sudoku.click(function() {
            SELF.callBackendController.getResource(SELF.processor.processJson,'./thumbnail/sudoku-info.json');
        });

        info_tictactoe.click(() =>  {
           SELF.callBackendController.getResource(SELF.processor.processJson, './thumbnail/tictactoe-info.json'); 
        });

        play_tictactoe.click(() => {
            window.location.href = '/gameportal/game/tictactoe.html';
        });
    };
}

module.exports = IndexWrapper;