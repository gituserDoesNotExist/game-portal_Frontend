describe("Response Processor: ", () => {
    var ResponseProcessor = require("../../../../public_html/index/response-processor/ResponseProcessor.js");    
    var DomParser = require('xmldom').DOMParser;    
        
    var responseProcessor;
    beforeEach(function () {
        responseProcessor = new ResponseProcessor();
    });
   
    
    it("should process JSON correctly", () => {
        xhrMock = jasmine.createSpyObj('xhrMock',['egal']);
        xhrMock.responseText = '{"maxplayer": 1,"name": "Sudoku","difficulty": 5}';
        
        expect(responseProcessor.processJson(xhrMock)).toEqual("Sudoku: Maximum number of players: 1. Level of difficulty: 5");
    });
    
    it("should process XML correctly", () => {
        xhrMock = jasmine.createSpyObj('xhrMock', ['egal']);
        xhrMock.responseXML = new DomParser().parseFromString('<content><name>TicTacToe</name><maxplayer>1</maxplayer><difficulty>2</difficulty></content>','text/xml');
        
        expect(responseProcessor.processXml(xhrMock)).toEqual('TicTacToe: Maximum number of players: 1. Level of difficulty: 2');
    });
});