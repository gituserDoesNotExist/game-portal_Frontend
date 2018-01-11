describe("CallBackendService", () => {
    var CallBackendController = require('../../../../public_html/game/xhr/CallBackendService.js');
    var controller = new CallBackendController(jQuery);
    
    it("should make request with correct url", () => {
        spyOn(jQuery, "ajax");
        
        controller.makeRequest('some-url');
        expect(jQuery.ajax.calls.mostRecent().args[0]['url']).toEqual('some-url');
    });
});