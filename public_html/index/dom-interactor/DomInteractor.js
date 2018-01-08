function DomInteractor(infoboxInput) {
    
    this.infobox = infoboxInput;
    
    this.showResponseOnPage = function(text) {
	this.infobox.textContent = text;
	this.infobox.style.border = "1px solid black";
    };
};

module.exports = DomInteractor;


