function ResponseProcessor(elementInput) {
    
    this.element = elementInput;
    
}
ResponseProcessor.prototype.processGameFieldDtoDetails = function(responseText) {
    const loadGameDto = JSON.parse(responseText);
    const fields = loadGameDto.fields;
    for (let currentField of fields) {
        this.element.querySelector('td[id="' + currentField.fieldId + '"]').textContent = currentField.value;
        window.sessionStorage.setItem(currentField.fieldId, JSON.stringify(currentField));
    }
    
};

module.exports = ResponseProcessor;