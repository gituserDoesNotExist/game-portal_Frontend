(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var IndexWrapper = require('./index/IndexWrapper.js');

document.addEventListener('DOMContentLoaded', function() {
       
    indexWrapper = new IndexWrapper(document.getElementsByClassName('infobox')[0], jQuery('#info-sudoku'), jQuery('#info-tictactoe'), jQuery('#play-tictactoe'));
    indexWrapper.registerHandlers();

}, false);

},{"./index/IndexWrapper.js":2}],2:[function(require,module,exports){
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
},{"./response-processor/ResponseProcessor.js":4,"./xhr/CallBackendController.js":5}],3:[function(require,module,exports){
function DomInteractor(infoboxInput) {
    
    this.infobox = infoboxInput;
    
    this.showResponseOnPage = function(text) {
	this.infobox.textContent = text;
	this.infobox.style.border = "1px solid black";
    };
};

module.exports = DomInteractor;



},{}],4:[function(require,module,exports){
function ResponseProcessor() {
};
ResponseProcessor.prototype.processJson = function(httpRequest) {
    let jsonObj = JSON.parse(httpRequest.responseText);
    return jsonObj.name + ": Maximum number of players: " + jsonObj.maxplayer + ". Level of difficulty: " + jsonObj.difficulty;
};
ResponseProcessor.prototype.processXml = function(httpRequest) {
    let xmlDoc = httpRequest.responseXML;
    let name = xmlDoc.getElementsByTagName("name")[0].childNodes[0].nodeValue;
    let maxplayer = xmlDoc.getElementsByTagName("maxplayer")[0].childNodes[0].nodeValue;
    let difficulty = xmlDoc.getElementsByTagName("difficulty")[0].childNodes[0].nodeValue;
    return name + ": Maximum number of players: " + maxplayer + ". Level of difficulty: " + difficulty;
};

module.exports = ResponseProcessor;

},{}],5:[function(require,module,exports){
var DomInteractor = require('../dom-interactor/DomInteractor.js');

function CallBackendController(jQueryInput, infobox) {
    this.domInteractor = new DomInteractor(infobox);
    this.jQueryTest = jQueryInput;
};
CallBackendController.prototype.getResource = function(responseProcessor, urlInput) {
    var SELF = this;
    this.jQueryTest.ajax({
        type: 'GET',
        url: urlInput,
        success: function(dataFromServer, statusText, jqXHR) {
            let text = responseProcessor(jqXHR);
            SELF.domInteractor.showResponseOnPage(text);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log("oh oh, something went wrong: " + textStatus + ". Error: " + errorThrown);
        }
    });
};

 module.exports = CallBackendController;

},{"../dom-interactor/DomInteractor.js":3}]},{},[1]);
