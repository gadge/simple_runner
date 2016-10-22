function Neighbours() {

     var Moves = require('../../src/moves');
     var moves = new Moves();
    var neighbours = this;


    this.findNearestCookie = function (map, radius, myPosition) {
        var result = [];
        var nearestCookies;
        var cookiesArray = neighbours.getCookies(map, radius, myPosition);
//console.log(cookiesArray)
        var arr = cookiesArray.map(function (currentCookie) {
            return neighbours.stepCount(currentCookie, myPosition);
        });
        var len = arr.length, minDistance = Infinity;
        while (len--) {
            if (arr[len] < minDistance) {
                minDistance = arr[len];
            }
        }

        nearestCookies = cookiesArray.filter(function (currentCookie) {
            // console.log(currentCookie);
            // console.log(myPosition);
            return neighbours.stepCount(currentCookie, myPosition) === minDistance;
        });

        if (nearestCookies.length > 1) {
            // get preffered position
            result = nearestCookies[0];
            var stepCount = neighbours.stepCount(nearestCookies[0], moves.UP.getPosition(nearestCookies[0]));

            for (var i = 0; i < nearestCookies.length; i++) {
                var stepCountUP = neighbours.stepCount(nearestCookies[i], moves.UP.getPosition(nearestCookies[i]));
                var stepCountDOWN = neighbours.stepCount(nearestCookies[i], moves.DOWN.getPosition(nearestCookies[i]));
                var stepCountLEFT = neighbours.stepCount(nearestCookies[i], moves.LEFT.getPosition(nearestCookies[i]));
                var stepCountRIGHT = neighbours.stepCount(nearestCookies[i], moves.RIGHT.getPosition(nearestCookies[i]));

                if (stepCountUP < stepCount) {
                    result = nearestCookies[i];
                    stepCount = stepCountUP;
                } else if (stepCountDOWN < stepCount) {
                    result = nearestCookies[i];
                    stepCount = stepCountDOWN;
                } else if (stepCountLEFT < stepCount) {
                    result = nearestCookies[i];
                    stepCount = stepCountLEFT;
                } else if (stepCountRIGHT < stepCount) {
                    result = nearestCookies[i];
                    stepCount = stepCountRIGHT;
                }
            }
        } else {
            result = nearestCookies[0];
        }

        return result;
    };

    this.getCookies = function (map, radius, coordinates) {
        var result = [];

        if (map) {
            for (var y = coordinates[1] - radius; y <= coordinates[1]+ radius; y++) {
                for (var x = coordinates[0] - radius; x <= coordinates[0]+radius; x++) {
                    if (map[y] !== undefined && map[y][x] !== undefined && map[y][x] === ".") {
                        result.push([y, x]);
                    }
                }
            }
        }
//console.log(map);
        // console.log('\n');
        // console.log(result);

        return result;
    };
    this.stepCount = function (coord, coord2) {
        return Math.abs(coord[0] - coord2[0]) + Math.abs(coord[1] - coord2[1]);
    }

}

module.exports = Neighbours;