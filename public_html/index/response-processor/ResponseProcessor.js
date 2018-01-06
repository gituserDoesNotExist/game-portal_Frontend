function ResponseProcessor() {
};
ResponseProcessor.prototype.jsonResponseProcessor = function(httpRequest) {
    let jsonObj = JSON.parse(httpRequest.responseText);
    return jsonObj.name + ": Maximum number of players: " + jsonObj.maxplayer + ". Level of difficulty: " + jsonObj.difficulty;
};


module.exports = ResponseProcessor;
