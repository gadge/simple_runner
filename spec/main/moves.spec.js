describe("Moves", function () {
    var Moves = require("../../src/moves");
    var moves;

    beforeEach(function () {
        moves = new Moves();
    });

    it("should go left", function () {
        expect(moves.LEFT.getPosition([1, 1])).toEqual([0, 1]);
    });
    it("should go left", function () {
        expect(moves.UP.getPosition([1, 1])).toEqual([1, 0]);
    });
    it("should go left", function () {
        expect(moves.RIGHT.getPosition([1, 1])).toEqual([2, 1]);
    });
    it("should go left", function () {
        expect(moves.DOWN.getPosition([1, 1])).toEqual([1, 2]);
    });
});