const GameWrapper = require('./GameWrapper.js');

jQuery( document ).ready(function() {
   
    var gameWrapper = new GameWrapper(document.getElementsByClassName('tictactoe')[0], jQuery('#textbox'), jQuery);
    
    gameWrapper.initialize('/gameportal/game/load-tictactoe');
    gameWrapper.registerHandlers();
    
});