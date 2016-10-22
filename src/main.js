function Main() {

    //var Protocol = require("./protocol");
    var GameState = require("./game-state");
    var GameLogic = require("./logic");
    var args = require("minimist")(process.argv.slice(2));

    this.run = function() {

        console.log("args: ", args);

        console.log('running team name: ', args.name , " is dev ? ", !!args.dev);

        var gameLogic = new GameLogic();

        var gameState = new GameState(args.name, args.dev);
        gameState.init();
        gameState.doGameLoop(gameLogic.getPosition);

    }
}

var main = new Main();
main.run();
