function CallBackendController(jQueryInput) {
    this.jQueryTest = jQueryInput;
};
CallBackendController.prototype.getResource = function(jsonResponseProcessor, urlInput) {
    this.jQueryTest.ajax({
        type: 'GET',
        url: urlInput,
        success: function(dataFromServer, statusText, jqXHR) {
            jsonResponseProcessor(jqXHR);
        }
    });
};

 module.exports = CallBackendController;
