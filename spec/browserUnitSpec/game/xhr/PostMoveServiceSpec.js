fdescribe("PostMoveService", () => {
    const TicTacToeField = require('../../../../public_html/game/domain/TicTacToeField.js');
    const PostMoveService = require('../../../../public_html/game/xhr/PostMoveService.js');
    const service = new PostMoveService(jQuery);
    
    it("should make request with correct url and data", () => {
        spyOn(jQuery, "ajax");
        
        let dto = new TicTacToeField(1,"2000-10-3",5,9,"a value");
        service.postMove('some-url', dto);
        expect(jQuery.ajax.calls.mostRecent().args[0]['url']).toEqual('some-url');
        expect(jQuery.ajax.calls.mostRecent().args[0]['type']).toEqual('POST');
        expect(jQuery.ajax.calls.mostRecent().args[0]['data']).toEqual('{"id":1,"lastModified":"2000-10-3","fieldId":5,"gameId":9,"value":"a value"}');
    });
});