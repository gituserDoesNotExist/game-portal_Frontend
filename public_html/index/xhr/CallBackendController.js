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
