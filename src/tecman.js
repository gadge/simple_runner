(function () {
    function Tecman() {
        var tecman = this;

        this.getMove = function (coord, previousCoord, cookie, map, moveOrder) {
            var validMoves = tecman.removeWalls(coord, map, moveOrder).filter(function (move) {
                var position = move.getPosition(coord);
                return !(previousCoord[0] === position[0] && previousCoord[1] === position[1]);
            });
            var arr = validMoves.map(function (move) {
                return tecman.stepCount(move.getPosition(coord), cookie);
            });
            var len = arr.length, bestMove = Infinity;
            while (len--) {
                if (arr[len] < bestMove) {
                    bestMove = arr[len];
                }
            }
            //var bestMove = Math.min(validMoves.map(function (move) {
            //    return tecman.stepCount(move.getPosition(coord), cookie);
            //}));
            var movePosition = validMoves.filter(function (move) {
                return tecman.stepCount(move.getPosition(coord), cookie) === bestMove;
            });
            var goToPosition = movePosition[0].getPosition(coord);
            console.log(goToPosition);
            return goToPosition;
        };
        this.removeWalls = function (coord, map, moveOrder) {
            return moveOrder.filter(function (move) {
                var position = move.getPosition(coord);
                return map[position[1]][position[0]] !== "#";
            });
        }
        this.stepCount = function (coord, coord2) {
            return Math.abs(coord[0] - coord2[0]) + Math.abs(coord[1] - coord2[1]);
        }
    }

    module.exports = Tecman;
}());