describe("CallBackendController", () => {
    
    var BackendController = require('../../../../public_html/index/xhr/CallBackendController.js');
    var caller;
    require('../../helpers/mock-ajax.js');
    
    beforeEach(function () {
        jasmine.Ajax.install();
        
        onSuccess = jasmine.createSpy('onSuccess');
        
        setFixtures('<div class="infobox"></div>');
        caller = new BackendController(jQuery, document.getElementsByClassName('infobox')[0]);
    });
    
    afterEach(function () {
        jasmine.Ajax.uninstall();
    });
    
    it("should call the onSuccess mock", () => {
        caller.getResource(onSuccess, '/url-success');
        request = jasmine.Ajax.requests.mostRecent();
        request.respondWith({
            status: 200,
            responseText: '{"id": 1}'
        });
        
        expect(request.url).toEqual('/url-success');
        expect(onSuccess.calls.count()).toEqual(1);
    });

    it("should call the onFailure mock", () => {
        spyOn(console, 'log');
        caller.getResource(onSuccess, '/url-failure');
        request = jasmine.Ajax.requests.mostRecent();
        request.respondWith({
            status: 400,
            responseText: '{"id": 1}'
        });
        
        
        expect(request.url).toEqual('/url-failure');
        expect(onSuccess).not.toHaveBeenCalled();
        expect(console.log).toHaveBeenCalledWith('oh oh, something went wrong: error. Error: ');
    });
    
    
});