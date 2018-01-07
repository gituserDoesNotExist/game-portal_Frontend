fdescribe("CallBackendController while mocking server", function() {
    
    require('../../helpers/mock-ajax.js');

    beforeEach(function () {
        jasmine.Ajax.install();
        
        onSuccess = jasmine.createSpy('onSuccess');
        onFailure = jasmine.createSpy('onFailure');
    });
    
    afterEach(function() {
        jasmine.Ajax.uninstall();
    });
    
    it("should call onSuccess", () => {
        makeCall(onSuccess, onFailure);
        request = jasmine.Ajax.requests.mostRecent();
        request.respondWith({
            status: 200,
            responseText: '{"test": 2}'
        });

        expect(request.url).toEqual('/url');
        expect(onSuccess).toHaveBeenCalled();
    });

    it("should call onFailure", () => {
        makeCall(onSuccess, onFailure);
        request = jasmine.Ajax.requests.mostRecent();
        request.respondWith({
            status: 404,
            responseText: '{"test": 2}'
        });

        expect(request.url).toEqual('/url');
        expect(onFailure).toHaveBeenCalled();
    });

    
    function makeCall(callback, errorCallback) {
        $.ajax({
            type: 'GET',
            url: '/url',
            success: function(dataFromServer, statusText, jqXHR) {
                callback(jqXHR);
               },
            error: function(jqXHR, textStatus, errorThrown) {
                errorCallback(jqXHR);
               }
            });
        };
    
});