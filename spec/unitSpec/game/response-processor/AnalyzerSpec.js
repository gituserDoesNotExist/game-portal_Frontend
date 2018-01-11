describe("Analyzer. the value of the user is set (if gameField is not completely filled) and then the backend is requested: ", () => {
    const Anylzer = require("../../../../public_html/game/response-processor/Analyzer.js");    
    var analyer;
        
    beforeEach(function () {
        interactorMock = jasmine.createSpyObj('interactorMock', ["changeFieldValue", "changeTextboxContent"]);
        analyzer = new Anylzer(interactorMock);
    });
    
    it("should display that user won", () => {
        analyzer.processResponse(1, "USER won", 5, "U");
        
        expect(interactorMock.changeFieldValue).not.toHaveBeenCalled();
        expect(interactorMock.changeTextboxContent).toHaveBeenCalledWith("USER won");
    });
    
    it("should set value and display that ai won", () => {
        analyzer.processResponse(2, "AI won", 5, "AI");
        
        expect(interactorMock.changeFieldValue).toHaveBeenCalledWith(5, "AI");
        expect(interactorMock.changeTextboxContent).toHaveBeenCalledWith("AI won");
    });
    
    it("should display that there is a draw. Last move from user so no field is set", () => {
        analyzer.processResponse(3, "draw - last move from user", 5, "L");

        expect(interactorMock.changeFieldValue).not.toHaveBeenCalled();
        expect(interactorMock.changeTextboxContent).toHaveBeenCalledWith("draw - last move from user");
    });
    
    it("should display that there is a draw. Last move from AI so field is set", () => {
        analyzer.processResponse(4, "draw - last move from ai", 5, "AI");

        expect(interactorMock.changeFieldValue).toHaveBeenCalledWith(5,"AI");
        expect(interactorMock.changeTextboxContent).toHaveBeenCalledWith("draw - last move from ai");
    });

//    Response = function(gameStatusId, gameStatusText, fieldId, fieldValue) {
});