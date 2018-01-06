function DomInteractor() {
    
    var infobox;
    
    this.setInfobox = function(infoboxInput) {
        infobox = infoboxInput;
    };
    
    this.showResponseOnPage = function(text) {
	infobox.textContent = text;
	infobox.style.border = "1px solid black";
    };
};

module.exports = DomInteractor;


