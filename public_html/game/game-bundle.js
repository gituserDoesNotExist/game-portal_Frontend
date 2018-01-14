(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
const CallBackendController = require('./xhr/CallBackendController.js');
const ResponseProcessor = require('./response-processor/ResponseProcessor.js');
const PostMoveController = require('./xhr/PostMoveController.js');
const Analyzer = require('./response-processor/Analyzer.js');
const DomInteractor = require('./dom-interactor/DomInteractor.js');
const GameFieldAnalyzer = require('./domain/GameFieldAnalyzer.js');

function GameWrapper(tableTicTacToe, textbox, jQueryInput) {
    
    var controller = new CallBackendController(jQueryInput);
    var processor = new ResponseProcessor(tableTicTacToe);
    this.interactor = new DomInteractor(tableTicTacToe, textbox);
    this.postMoveController = new PostMoveController(jQueryInput, new Analyzer(this.interactor));     
    this.gameAnalyzer = new GameFieldAnalyzer(tableTicTacToe);

    this.initialize = function(loadGameUrl) {
        controller.process(loadGameUrl, processor);
    };

    var SELF = this;
    this.registerHandlers = function(urlInput) {
        tableTicTacToe.addEventListener('click', function(event) {
            if (SELF.gameAnalyzer.isGameFieldFilled()) {
                SELF.interactor.changeTextboxContent("all fields filled");
                return;
            }
            let fieldId = event.target.getAttribute("id");
            SELF.interactor.changeFieldValue(fieldId, "USER");
            SELF.postMoveController.postMoveFromUser(urlInput, window.sessionStorage.getItem(fieldId)).done(function(data, status, xhr) {
                let dto = JSON.parse(xhr.responseText);
                window.sessionStorage.setItem("" + dto.field.fieldId,JSON.stringify(dto.field));
            });
        }, false);
    };
    
    
}

module.exports = GameWrapper;
},{"./dom-interactor/DomInteractor.js":2,"./domain/GameFieldAnalyzer.js":3,"./response-processor/Analyzer.js":5,"./response-processor/ResponseProcessor.js":6,"./xhr/CallBackendController.js":7,"./xhr/PostMoveController.js":9}],2:[function(require,module,exports){
function DomInteractor(tictactoeTableInput, textboxInput) {
    this.tictactoeTable = tictactoeTableInput;
    this.textbox = textboxInput;
}
DomInteractor.prototype.changeFieldValue = function(id, value) {
    this.tictactoeTable.querySelector("td[id='" + id + "']").textContent = value;
};
DomInteractor.prototype.changeTextboxContent = function(text) {
    this.textbox.text(text);
};

module.exports = DomInteractor;
},{}],3:[function(require,module,exports){
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
},{}],4:[function(require,module,exports){
const GameWrapper = require('./GameWrapper.js');

jQuery( document ).ready(function() {
   
    var gameWrapper = new GameWrapper(document.getElementsByClassName('tictactoe')[0], jQuery('#textbox'), jQuery);
    
    gameWrapper.initialize('/gameportal/game/load-tictactoe');
    gameWrapper.registerHandlers('/gameportal/game/move');
    
});
},{"./GameWrapper.js":1}],5:[function(require,module,exports){
function Analyzer(domInteractor) {
    this.interactor = domInteractor;
};
Analyzer.prototype.processResponse = function(gameStatusId, gameStatusText, fieldId, fieldValue) {
    switch(gameStatusId) {
         case 1:
             this.interactor.changeTextboxContent(gameStatusText);
             break;
         case 2:
             this.interactor.changeFieldValue(fieldId, fieldValue);
             this.interactor.changeTextboxContent(gameStatusText);
             break;
         case 3:
             this.interactor.changeTextboxContent(gameStatusText);
             break;
         case 4:
             this.interactor.changeFieldValue(fieldId, fieldValue);
             this.interactor.changeTextboxContent(gameStatusText);
     };
};

module.exports = Analyzer;
},{}],6:[function(require,module,exports){
function ResponseProcessor(elementInput) {
    
    this.element = elementInput;
    
}
ResponseProcessor.prototype.processGameFieldDtoDetails = function(responseText) {
    const loadGameDto = JSON.parse(responseText);
    const fields = loadGameDto.fields;
    for (let currentField of fields) {
        this.element.querySelector('td[id="' + currentField.fieldId + '"]').textContent = currentField.value;
        window.sessionStorage.setItem(currentField.fieldId, JSON.stringify(currentField));
    }
    
};

module.exports = ResponseProcessor;
},{}],7:[function(require,module,exports){
var CallBackendService = require('./CallBackendService.js');

function CallBackendController(jQueryInput) {
    this.service = new CallBackendService(jQueryInput);
}
CallBackendController.prototype.process = function(url,processor) {
    this.service.makeRequest(url).done(function(data, textStatus, jqXHR) {
        processor.processGameFieldDtoDetails(jqXHR.responseText);
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log("An error occured while making the request: " + textStatus+ "." + errorThrown);
    });
};

module.exports = CallBackendController;


},{"./CallBackendService.js":8}],8:[function(require,module,exports){
function CallBackendService(jQueryInput) {
    this.jQuery = jQueryInput;

}
CallBackendService.prototype.makeRequest = function(urlInput) {
    return this.jQuery.ajax({
        type: 'GET',
        url: urlInput
    });
};

module.exports = CallBackendService;
},{}],9:[function(require,module,exports){
const PostMoveService = require('./PostMoveService.js');

function PostMoveController(jQueryInput, analyzerInput) {
    this.service = new PostMoveService(jQueryInput);
    this.analyzer = analyzerInput;
}
PostMoveController.prototype.postMoveFromUser = function(url, dto) {    
//    da man in der .done()-Funktion eine Funktion definiert zeigt this auf das window objekt, dsw. muss man SELF = this setzen
    var SELF = this;
    return this.service.postMove(url,dto).done(function(data, textStatus, jqXHR) {
        console.log("response");
        console.log(jqXHR.responseText);
        dto = JSON.parse(jqXHR.responseText);
        console.log(dto);
        SELF.analyzer.processResponse(dto.status.id, dto.status.text, dto.field.fieldId, dto.field.value);
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log("something went wrong: " + textStatus + ". " + errorThrown);
    });
};

module.exports = PostMoveController;
},{"./PostMoveService.js":10}],10:[function(require,module,exports){
function PostMoveService(jQueryInput) {
    this.jQuery = jQueryInput;
}
PostMoveService.prototype.postMove = function(urlInput, dto) {
    return this.jQuery.ajax({
        type: 'POST',
        url: urlInput,
        data: JSON.stringify(dto),
        contentType: 'application/json'
    });
};

module.exports = PostMoveService;
},{}]},{},[4]);
