var moves = require("./moves");
var Converter = require("./converter");
var _ = require("lodash");

(function () {
    function GhostMoves() {
        var converer = new Converter();
        this.calculateAvailableMoves = function (position, map, direction) {
            var map = converer.convert(position.Map);
            return {
              canMoveUp: canMoveUp,
              canMoveDown: canMoveDown,
              canMoveLeft: canMoveLeft,
              canMoveRight: canMoveRight
            };

            function hitTheWall() {
                if (direction === "UP")
                    return map[position.Row + 1][position.Col] === "#";
                else if (direction === "DOWN")
                    return map[position.Row - 1][position.Col] === "#";
                else if (direction === "LEFT")
                    return map[position.Row][position.Col-1] === "#";
                else if (direction === "RIGHT")
                    return map[position.Row][position.Col+1] === "#"
            }

            function canMoveUp() {
                return (map[position.Row + 1][position.Col] !== "#" && hitTheWall()) ||
                    (direction === "UP" && map[position.Row + 1][position.Col] !== "#");
            }

            function canMoveDown() {
                return (map[position.Row - 1][position.Col] !== "#" && hitTheWall()) ||
                    (direction === "DOWN" && map[position.Row - 1][position.Col] !== "#");
            }

            function canMoveLeft() {
                return (map[position.Row][position.Col-1] !== "#" && hitTheWall()) |
                    (direction === "LEFT" && map[position.Row][position.Col - 1] !== "#");
            }

            function canMoveRight() {
                return (map[position.Row][position.Col+1] !== "#" && hitTheWall()) ||
                    (direction === "RIGHT" && map[position.Row][position.Col + 1] !== "#");
            }
        }
    }

    module.exports = GhostMoves();
}());