(function () {
    function Logic() {
        var logic = this;


        var Converter = require("./converter");
        var Tecman = require("./tecman");
        this.MOVES = {

            LEFT: {
                getPosition: function (coord) {
                    return [coord[0] - 1, coord[1]];
                }
            },
            UP: {
                getPosition: function (coord) {
                    return [coord[0], coord[1] - 1];
                }
            },
            RIGHT: {
                getPosition: function (coord) {
                    return [coord[0] + 1, coord[1]];
                }
            },
            DOWN: {
                getPosition: function (coord) {
                    return [coord[0], coord[1] + 1];
                }
            }
        };

        var Neighbours = require("./neighbours/neighbours");
        var neighbours = new Neighbours();

        this.MODE = {
            GHOSTS: "GHOSTS",
            TECMAN: "TECMAN"
        };

        this.MAP_SYMBOL = {
            WALL: "#",
            SPACE: " ",
            COOKIE: "."
        };

        this.getPosition = function (turnInfo) {
            switch (turnInfo.Mode) {
                case logic.MODE.TECMAN:
                    return getStuff(turnInfo);
                    break;
                case logic.MODE.GHOSTS:
                    return mockGhostMoves(turnInfo.GhostPositions);
                    break;
            }
        };

        function mockGhostMoves(moves) {
            return moves.map(function (move) {
                move.Col = move.Col + 1;
                return move;
            })
        }

        this.stepCount = function (coord, coord2) {
            return Math.abs(coord[0] - coord2[0]) + Math.abs(coord[1] - coord2[1]);
        };
        function getStuff(turnInfo) {
            var map = new Converter().convert(turnInfo.Map);
            var coord = [turnInfo.TecmanPosition.Col, turnInfo.TecmanPosition.Row];
            var previousCoord = [turnInfo.PreviousTecmanPosition.Col, turnInfo.PreviousTecmanPosition.Row];
            var cookie = neighbours.findNearestCookie(map, 6, coord);

            var moveList = [logic.MOVES.LEFT, logic.MOVES.UP, logic.MOVES.DOWN, logic.MOVES.RIGHT];
            var result = new Tecman().getMove(coord, previousCoord, cookie, map, moveList);
            return [{Col: result[0], Row: result[1]}];
        }
    }

    module.exports = Logic;
}());