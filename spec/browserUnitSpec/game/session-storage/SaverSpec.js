describe("saveInSessionStorage", () => {
    const Saver = require('../../../../public_html/game/session-storage/Saver.js');
    var saver = new Saver();
    
    it("should save something in session storage", () => {
        saver.saveIt("key","arbitrary value");
        
        expect(window.sessionStorage.getItem("key")).toEqual("arbitrary value");
    });
    
    it("should overwrite in session storage", () => {
        saver.saveIt("5","arbitrary value");
        
        expect(window.sessionStorage.getItem("5")).toEqual("arbitrary value");
        
        saver.saveIt("5","new value");
        
        expect(window.sessionStorage.getItem("5")).toEqual("new value");
    });
    
    
});