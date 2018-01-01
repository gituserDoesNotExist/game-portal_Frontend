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