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
var StateChangeListener = require('./JavaScriptResources/StateChangeListener.js');

document.addEventListener('DOMContentLoaded', function(e) {
	var stateChangeListenerObject = new StateChangeListener();

	var img1 = document.getElementById("info-sudoku");
	var img2 = document.getElementById("info-tictactoe");
	var infobox = document.getElementsByClassName("infobox")[0];
	var tictactoeButton = document.getElementById("play-tictactoe")



	tictactoeButton.addEventListener('click', function(e) {
		window.location.href = "/gameportal/game/tictactoe.html";
	})

	img1.addEventListener('click', function(e) {
		var httpRequest = new XMLHttpRequest();
		httpRequest.onreadystatechange = function() {
			stateChangeListenerObject.stateChangeListenerFunction(httpRequest, jsonResponseProcessor)
		};
		httpRequest.open("GET", "./thumbnail/sudoku-info.json", true);
		httpRequest.send();

	}, true)

	img2.addEventListener('click', function(e) {
		var httpRequest = new XMLHttpRequest();
		httpRequest.onreadystatechange = function() {
			stateChangeListenerObject.stateChangeListenerFunction(httpRequest, xmlResponseProcessor)
		};
		httpRequest.open("GET", "./thumbnail/tictactoe-info.xml", true);
		httpRequest.send();
		
	}, true)

	var showResponseOnPage = function(text) {
		infobox.textContent = text;
		infobox.style.border = "1px solid black";
	}
	
	var xmlResponseProcessor = function(httpRequest) {
		let xmlDoc = httpRequest.responseXML;
		let name = xmlDoc.getElementsByTagName("name")[0].childNodes[0].nodeValue;
		let maxplayer = xmlDoc.getElementsByTagName("maxplayer")[0].childNodes[0].nodeValue;
		let difficulty = xmlDoc.getElementsByTagName("difficulty")[0].childNodes[0].nodeValue;
		let text = name + ": Maximum number of players:" + maxplayer + ". Level of difficulty: " + difficulty;
		showResponseOnPage(text);

	}

	var jsonResponseProcessor = function(httpRequest) {
		let jsonObj = JSON.parse(httpRequest.responseText);
		let text = jsonObj.name + ": Maximum number of players:" + jsonObj.maxplayer + ". Level of difficulty: " + jsonObj.difficulty;
		infobox.textContent = text;
		infobox.style.border = "1px solid black";
		showResponseOnPage(text);
	}
})
},{"./JavaScriptResources/StateChangeListener.js":1}]},{},[2]);
