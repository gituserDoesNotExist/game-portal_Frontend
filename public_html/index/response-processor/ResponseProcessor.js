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
