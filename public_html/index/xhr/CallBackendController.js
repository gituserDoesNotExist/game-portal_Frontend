var StateChangeListener = require('../../JavaScriptResources/StateChangeListener.js');
var stateChangeListener = new StateChangeListener();

function CallBackendController() {
    this.httpRequest;
    
    this.setHhrObject = function(xhrObject) {
        this.httpRequest = xhrObject;
    };
};
CallBackendController.prototype.getResource = function(jsonResponseProcessor, url) {
    httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
	stateChangeListener.callCallbackIfSuccess(httpRequest, jsonResponseProcessor);
    };
    httpRequest.open("GET", url, true);
    httpRequest.send();
};

 
 module.exports = CallBackendController;
