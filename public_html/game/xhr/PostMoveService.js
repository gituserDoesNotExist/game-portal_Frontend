function PostMoveService(jQueryInput) {
    this.jQuery = jQueryInput;
}
PostMoveService.prototype.postMove = function(url, dto) {
    return this.jQuery.ajax({
        url: url,
        data: JSON.stringify(dto)
//        dataType: "application/json"
    });
};

module.exports = PostMoveService;