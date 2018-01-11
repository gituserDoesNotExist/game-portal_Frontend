function PostMoveService(jQueryInput) {
    this.jQuery = jQueryInput;
}
PostMoveService.prototype.postMove = function(urlInput, dto) {
    return this.jQuery.ajax({
        url: urlInput,
        data: JSON.stringify(dto)
//        dataType: "application/json"
    });
};

module.exports = PostMoveService;