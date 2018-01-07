describe("CallBackendController: ", () => {
    var CallBackendController = require('../../../../public_html/index/xhr/CallBackendController.js');
    
    
    it("should make an AJAX request to the correct URL", () => {
        spyOn(jQuery, 'ajax').and.callFake(function(options) {
            options.success("dataFromServer","statusText","xhrObject");
        });
        var callback = jasmine.createSpy('callback');
        var callBackendController = new CallBackendController(jQuery);    

        callBackendController.getResource(callback,'my-url');
        
        expect(jQuery.ajax.calls.mostRecent().args[0]['url']).toEqual('my-url');
        expect(callback).toHaveBeenCalledWith("xhrObject");
    });
});

