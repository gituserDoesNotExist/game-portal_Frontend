var CallBackendController = require('index/xhr/CallBackendController.js');
var ResponseProcessor = require('index/response-processor/ResponseProcessor.js');

var callBackendController = new CallBackendController(jQuery, document.getElementsByClassName('infobox')[0]);
var processor = new ResponseProcessor();


document.getElementById("info-sudoku").addEventListener('click',function() {
    callBackendController.getResource(processor.processJson,'./thumbnail/sudoku-info.json');
});

jQuery('#info-tictactoe').click(() =>  {
   callBackendController.getResource(processor.processXml, './thumbnail/tictactoe-info.xml'); 
});

jQuery('#play-tictactoe').click(() => {
    window.location.href = '/gameportal/game/tictactoe.html';
});