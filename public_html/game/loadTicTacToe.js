var StateChangeListener = require('C:/Users/Manfred/JavaShit/Netbeans/GamePortalProject/GamePortal-Frontend/public_html/JavaScriptResources/StateChangeListener.js')
const R = require('C:/Users/Manfred/JavaShit/Netbeans/GamePortalProject/GamePortal-Frontend/node_modules/ramda/dist/ramda.js');
const processor = require('./playTicTacToe.js');


document.addEventListener('DOMContentLoaded', function(e) {
	var dto;
	
	var stateChangeListener = new StateChangeListener();

	var initialRequest = new XMLHttpRequest();
	initialRequest.onreadystatechange = function() {
		stateChangeListener.stateChangeListenerFunction(initialRequest, processInitialResponse)
	}
	initialRequest.open("GET","/gameportal/game/load-tictactoe");
	initialRequest.send();


	var processInitialResponse = function(httpRequest) {
		dto = JSON.parse(httpRequest.response);
		console.log(dto);
		const fields = dto.fields;
		R.forEach(counter => {
			const currentField = fields[counter];
			const gameField = document.querySelector(".tictactoe td[id='"+currentField.fieldId+"']").textContent = currentField.value;
		},R.range(0,9));
	}
	
	
	document.querySelector('.tictactoe').addEventListener('click', function(event) {
		processor.processUserInput(event, dto, 'USER')
	}, false)

})	



