describe("PostMoveController", () => {
    
    const PostMoveController = require('../../../../public_html/game/xhr/PostMoveController.js');
    const TicTactoeFieldDto = require('../../../../public_html/game/domain/TicTacToeField.js');
    var postMoveController;
    var dto;
    
    beforeEach(function () {
        jasmine.Ajax.install();
        analyzerMock = jasmine.createSpyObj('analyzer', ['processResponse']);
        
        postMoveController = new PostMoveController(jQuery,analyzerMock);
        dto = new TicTactoeFieldDto(1,"2000-10-6",9,200,"x");
    });
    
    afterEach(function () {
        jasmine.Ajax.uninstall();
    });
    
    it("should make call analyzer with correct arguments", () => {
        postMoveController.postMoveFromUser('this is my url', dto);
        
        request = jasmine.Ajax.requests.mostRecent();
        request.respondWith({
            status: 200,
            responseText: '{"status":{"id":1,"text":"gameStatus"},"field":{"id":1,"fieldId":9,"value":"x"}}'
        });        
        
        expect(analyzerMock.processResponse).toHaveBeenCalledWith(1,"gameStatus",9,"x");
//        console.log(request.data());
    });
});