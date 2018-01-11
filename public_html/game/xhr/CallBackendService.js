function CallBackendService(jQueryInput) {
    this.jQuery = jQueryInput;

}
CallBackendService.prototype.makeRequest = function(urlInput) {
    return this.jQuery.ajax({
        type: 'GET',
        url: urlInput
    });
};

module.exports = CallBackendService;