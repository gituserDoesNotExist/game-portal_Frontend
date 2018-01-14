const PostMoveService = require('./PostMoveService.js');

function PostMoveController(jQueryInput, analyzerInput) {
    this.service = new PostMoveService(jQueryInput);
    this.analyzer = analyzerInput;
}
PostMoveController.prototype.postMoveFromUser = function(url, dto) {    
//    da man in der .done()-Funktion eine Funktion definiert zeigt this auf das window objekt, dsw. muss man SELF = this setzen
    var SELF = this;
    return this.service.postMove(url,dto).done(function(data, textStatus, jqXHR) {
        dto = JSON.parse(jqXHR.responseText);
        SELF.analyzer.processResponse(dto.status.id, dto.status.text, dto.field.fieldId, dto.field.value);
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log("something went wrong: " + textStatus + ". " + errorThrown);
    });
};

module.exports = PostMoveController;