/**
 * Created by rolandas on 11/12/16.
 */

(function(){
    "use strict";

    var Protocol = require("./protocol");


    var GameState = function(clientName, isDev) {

        var PlayerId;
        var RefTurn = 0;
        var gameComplete = false;

        var protocol = new Protocol("Swedbank", clientName, isDev);

        this.init = function() {
            var resp = protocol.createPlayer();
            PlayerId = resp.PlayerId;
        };

        this.waitNextTurn = function() {
            var turnComplete = false;
            var resp;
            while(!gameComplete && !turnComplete) {
                resp = protocol.waitNextTurn(PlayerId, RefTurn);
                gameComplete = resp.GameFinished;
                turnComplete = resp.TurnComplete;
            }

            console.log("waitNextTurn: ", resp);
        };

        this.doGameLoop = function(callback) {
            while(true) {
                this.waitNextTurn();
                if (gameComplete) {
                    break;
                }

                var playerView = protocol.getPlayerView(PlayerId);
                RefTurn = playerView.Turn;

                console.log("getPlayerView: ", playerView);
                var positions = callback(playerView);
                console.log("positions from game logic: ", positions);

                var moveResp = protocol.makeMove(PlayerId, positions);
                console.log("response from makeMove: ", moveResp);

            }

        }
    };

    module.exports = GameState;

}());
