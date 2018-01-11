(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = function StateChangeListener() {
	this.stateChangeListenerFunction = function(httpRequest, serverResponseProcessorCallback) {
		if (httpRequest.readyState === XMLHttpRequest.DONE) {
			if (httpRequest.status === 200) {
				serverResponseProcessorCallback(httpRequest);
			} else {
				console.log("Problem with request. Ready state is " + httpRequest.readyState + " and status is " + httpRequest.status)
			}
		} else {
			console.log("Ready state not reached. Ready state is " + httpRequest.readyState + " and status is " + httpRequest.status)
		}
	}
}
},{}],2:[function(require,module,exports){
module.exports = function TicTacToeField(id, lastModified, fieldId, gameId, value) {
	this.id = id;
	this.lastModified = lastModified;
	this.fieldId = fieldId;
	this.gameId = gameId;
	this.value = value;
}
},{}],3:[function(require,module,exports){
module.exports = function TicTacToeGame(id, lastModified, description, status) {
	this.id = id;
	this.lastModified = lastModified;
	this.description = description;
	this.status = status;
}

},{}],4:[function(require,module,exports){
module.exports = function TicTacToeGameFieldDto(ticTacToeGame, ticTacToeField) {
	this.game = ticTacToeGame;
	this.field = ticTacToeField;
}
},{}],5:[function(require,module,exports){
var StateChangeListener = require('C:/Users/Manfred/JavaShit/Netbeans/GamePortalProject/GamePortal-Frontend/public_html/JavaScriptResources/StateChangeListener.js');
var TicTacToeGame = require('./domain/TicTacToeGame.js');
var TicTacToeField = require('./domain/TicTacToeField.js');
var TicTacToeGameFieldDto = require('./domain/TicTacToeGameFieldDto.js');

function processUserInput(event, dto, fieldValue) {
	let stateChangeListener = new StateChangeListener();
	
	let target = event.target;
	let fieldId = target.getAttribute("id");
	let index = findIndex(dto.fields, fieldId);
	let gameObject = new TicTacToeGame(dto.game.id, dto.game.lastModified, dto.game.description, dto.game.status);
	let fieldObject = new TicTacToeField(dto.fields[index].id,dto.fields[index].lastModified,fieldId,dto.game.id,fieldValue);
	let dtoToServer = new TicTacToeGameFieldDto(gameObject, fieldObject);

	let httpRequest = new XMLHttpRequest();
	httpRequest.onreadystatechange = function() {
		stateChangeListener.stateChangeListenerFunction(httpRequest, updateSingleFieldResponseProcessor);
	}
	httpRequest.open("POST", "/gameportal/game/move", true);
	httpRequest.send(JSON.stringify(dtoToServer));
    	
    function updateSingleFieldResponseProcessor(httpRequest) {
    	console.log("hello world");
    	console.log(httpRequest.responseText);
    }
    
    function findIndex(fields, fieldId) {
    	for (let i = 0; i < fields.length; i++) {
			if (fields[i].fieldId === parseInt(fieldId)) {
				return i;
			}
}
    }
}

},{"./domain/TicTacToeField.js":2,"./domain/TicTacToeGame.js":3,"./domain/TicTacToeGameFieldDto.js":4,"C:/Users/Manfred/JavaShit/Netbeans/GamePortalProject/GamePortal-Frontend/public_html/JavaScriptResources/StateChangeListener.js":1}]},{},[5]);
