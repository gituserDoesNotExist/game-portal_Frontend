var StateChangeListener = require('./JavaScriptResources/StateChangeListener.js');

document.addEventListener('DOMContentLoaded', function(e) {
	var stateChangeListenerObject = new StateChangeListener();

	var img1 = document.getElementById("info-sudoku");
	var img2 = document.getElementById("info-tictactoe");
	var infobox = document.getElementsByClassName("infobox")[0];
	var tictactoeButton = document.getElementById("play-tictactoe");



	tictactoeButton.addEventListener('click', function(e) {
		window.location.href = "/gameportal/game/tictactoe.html";
	});

	img1.addEventListener('click', function(e) {
		var httpRequest = new XMLHttpRequest();
		httpRequest.onreadystatechange = function() {
			stateChangeListenerObject.callCallbackIfSuccess(httpRequest, jsonResponseProcessor);
		};
		httpRequest.open("GET", "./thumbnail/sudoku-info.json", true);
		httpRequest.send();

	}, true);

	img2.addEventListener('click', function(e) {
		var httpRequest = new XMLHttpRequest();
		httpRequest.onreadystatechange = function() {
			stateChangeListenerObject.callCallbackIfSuccess(httpRequest, xmlResponseProcessor);
		};
		httpRequest.open("GET", "./thumbnail/tictactoe-info.xml", true);
		httpRequest.send();
		
	}, true);

	var showResponseOnPage = function(text) {
		infobox.textContent = text;
		infobox.style.border = "1px solid black";
	};
	
	var xmlResponseProcessor = function(httpRequest) {
		let xmlDoc = httpRequest.responseXML;
		let name = xmlDoc.getElementsByTagName("name")[0].childNodes[0].nodeValue;
		let maxplayer = xmlDoc.getElementsByTagName("maxplayer")[0].childNodes[0].nodeValue;
		let difficulty = xmlDoc.getElementsByTagName("difficulty")[0].childNodes[0].nodeValue;
		let text = name + ": Maximum number of players:" + maxplayer + ". Level of difficulty: " + difficulty;
		showResponseOnPage(text);
	};

	var jsonResponseProcessor = function(httpRequest) {
		let jsonObj = JSON.parse(httpRequest.responseText);
		let text = jsonObj.name + ": Maximum number of players:" + jsonObj.maxplayer + ". Level of difficulty: " + jsonObj.difficulty;
		showResponseOnPage(text);
	};
});