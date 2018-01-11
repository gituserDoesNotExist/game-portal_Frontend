function Saver() {
    this.saveIt = function(key, value) {
        window.sessionStorage.setItem(key,value);
    };
}

module.exports = Saver;