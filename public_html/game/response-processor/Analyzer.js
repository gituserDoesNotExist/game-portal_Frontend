function Analyzer(domInteractor) {
    this.interactor = domInteractor;
};
Analyzer.prototype.processResponse = function(gameStatusId, gameStatusText, fieldId, fieldValue) {
    switch(gameStatusId) {
         case 1:
             this.interactor.changeTextboxContent(gameStatusText);
             break;
         case 2:
             this.interactor.changeFieldValue(fieldId, fieldValue);
             this.interactor.changeTextboxContent(gameStatusText);
             break;
         case 3:
             this.interactor.changeTextboxContent(gameStatusText);
             break;
         case 4:
             this.interactor.changeFieldValue(fieldId, fieldValue);
             this.interactor.changeTextboxContent(gameStatusText);
             break;
         case 5:
             this.interactor.changeFieldValue(fieldId, fieldValue);
             this.interactor.changeTextboxContent(gameStatusText);
             break;
     };
};

module.exports = Analyzer;