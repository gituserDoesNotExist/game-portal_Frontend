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

