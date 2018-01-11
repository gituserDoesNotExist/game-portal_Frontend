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
    this.registerHandlers = function() {
        tableTicTacToe.addEventListener('click', function(event) {
            if (SELF.gameAnalyzer.isGameFieldFilled()) {
                SELF.interactor.changeTextboxContent("all fields filled");
                return;
            }
            let fieldId = event.target.getAttribute("id");
            SELF.interactor.changeFieldValue(fieldId, "USER");
            SELF.postMoveController.postMoveFromUser('todo', window.sessionStorage.getItem(fieldId)).done(function(data, status, xhr) {
                let dto = JSON.parse(xhr.responseText);
                window.sessionStorage.setItem("" + dto.field.fieldId,JSON.stringify(dto.field));
            });
        }, false);
    };
    
    
}

module.exports = GameWrapper;