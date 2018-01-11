describe("CallBackendController", () => {
    var CallBackendController = require('../../../../public_html/game/xhr/CallBackendController.js');
    var controller;
    var processor;
    
    beforeEach(function () {
        controller = new CallBackendController(jQuery);
        jasmine.Ajax.install();
        
        processor = jasmine.createSpyObj('processor', ['processGameFieldDtoDetails']);
    });
    
    afterEach(function () {
        jasmine.Ajax.uninstall();
    });
    
    it("should call the callback", () => {
        setFixtures('<div id="fixture"></div>');
        
        controller.process('my-url', processor);
        request = jasmine.Ajax.requests.mostRecent();
        request.respondWith({
            status: 200,
            responseText: '{"text":1}'
        });
        
        expect(processor.processGameFieldDtoDetails).toHaveBeenCalledWith('{"text":1}');
        
    });
    
    it("should log the error", () => {
        setFixtures('<div id="fixture"></div>');
        spyOn(console,'log');
        
        controller.process('my-url',processor);
        request = jasmine.Ajax.requests.mostRecent();
        request.respondWith({
            status: 400,
            responseText: '{"text":1}'
        });
        
        expect(console.log).toHaveBeenCalledWith("An error occured while making the request: error.")
    });
    
});