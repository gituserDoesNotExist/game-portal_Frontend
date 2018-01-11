function DomInteractor(tictactoeTableInput, textboxInput) {
    this.tictactoeTable = tictactoeTableInput;
    this.textbox = textboxInput;
}
DomInteractor.prototype.changeFieldValue = function(id, value) {
    this.tictactoeTable.querySelector("td[id='" + id + "']").textContent = value;
};
DomInteractor.prototype.changeTextboxContent = function(text) {
    this.textbox.text(text);
};

module.exports = DomInteractor;