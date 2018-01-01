var StateChangeListener = require('C:/Users/Manfred/JavaShit/Netbeans/GamePortalProject/GamePortal-Frontend/public_html/JavaScriptResources/StateChangeListener.js');
var TicTacToeGame = require('./domain/TicTacToeGame.js');
var TicTacToeField = require('./domain/TicTacToeField.js');
var TicTacToeGameFieldDto = require('./domain/TicTacToeGameFieldDto.js');

module.exports.processUserInput=function(event, dto, fieldValue) {
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