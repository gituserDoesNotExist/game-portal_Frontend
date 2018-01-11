function TicTacToeField(id, lastModified, fieldId, gameId, value) {
	this.id = id;
	this.lastModified = lastModified;
	this.fieldId = fieldId;
	this.gameId = gameId;
	this.value = value;
};

module.exports = TicTacToeField;