describe("Response Processor:", () => {
    var ResponseProcessor = require("../../../../public_html/index/response-processor/ResponseProcessor.js");    
        
    var responseProcessor;
    beforeEach(function () {
        responseProcessor = new ResponseProcessor();
    });
   
    
    it("should call showResponseOnPage with correct parameters", () => {
        let response = '{"maxplayer": 1,"name": "Sudoku","difficulty": 5}';
        xhrMock = jasmine.createSpyObj('xhrMock',['egal']);
        xhrMock.responseText = response;
        
        expect(responseProcessor.jsonResponseProcessor(xhrMock)).toEqual("Sudoku: Maximum number of players: 1. Level of difficulty: 5");
    });
});