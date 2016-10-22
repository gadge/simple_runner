(function () {
    function Moves() {

        this.LEFT = {
            getPosition: function (coord) {
                return [coord[0] - 1, coord[1]];
            }
        };
        this.UP = {
            getPosition: function (coord) {
                return [coord[0], coord[1] - 1];
            }
        };
        this.RIGHT = {
            getPosition: function (coord) {
                return [coord[0] + 1, coord[1]];
            }
        };
        this.DOWN = {
            getPosition: function (coord) {
                return [coord[0], coord[1] + 1];
            }
        }
    }

    module.exports = Moves;
}());