describe("Tecman", function () {
    var Tecman = require("../../src/tecman");
    var Logic = require("../../src/logic");
    var tecman, logic, mapMock, mockMoveOrder, MAP_SYMBOL, WALL;

    beforeEach(function () {
        tecman = new Tecman();
        logic = new Logic();
        MAP_SYMBOL = logic.MAP_SYMBOL;
        WALL = logic.MAP_SYMBOL.WALL;
        mockMoveOrder = [
            logic.MOVES.LEFT,
            logic.MOVES.UP,
            logic.MOVES.RIGHT,
            logic.MOVES.DOWN
        ];
        mapMock = [
            [WALL, WALL, WALL, WALL],
            [WALL, MAP_SYMBOL.SPACE, MAP_SYMBOL.COOKIE, WALL],
            [WALL, WALL, WALL, WALL]
        ]
    });

    describe("#getMove", function () {
        it("should move towards cookie", function () {
            expect(tecman.getMove([1, 1], [0, 0], [2, 1], mapMock, mockMoveOrder)).toEqual([2, 1]);
        });
        it("should not move to cookie over walls", function () {
            mockMoveOrder = [
                logic.MOVES.LEFT,
                logic.MOVES.UP,
                logic.MOVES.RIGHT,
                logic.MOVES.DOWN
            ];
            mapMock = [[WALL, WALL, WALL, WALL, WALL],
                [WALL, MAP_SYMBOL.SPACE, WALL, MAP_SYMBOL.COOKIE, WALL],
                [WALL, MAP_SYMBOL.SPACE, MAP_SYMBOL.SPACE, MAP_SYMBOL.SPACE, WALL],
                [WALL, WALL, WALL, WALL, WALL]];
            expect(tecman.getMove([1, 1], [0, 0], [3, 1], mapMock, mockMoveOrder)).toEqual([1, 2]);
        });
        it("should not move to cookie over walls 2", function () {
            mockMoveOrder = [
                logic.MOVES.LEFT,
                logic.MOVES.UP,
                logic.MOVES.RIGHT,
                logic.MOVES.DOWN
            ];
            mapMock = [[WALL, WALL, WALL, WALL, WALL],
                [WALL, MAP_SYMBOL.SPACE, WALL, MAP_SYMBOL.COOKIE, WALL],
                [WALL, MAP_SYMBOL.SPACE, MAP_SYMBOL.SPACE, MAP_SYMBOL.SPACE, WALL],
                [WALL, WALL, WALL, WALL, WALL]];
            expect(tecman.getMove([2, 2], [1, 2], [3, 1], mapMock, mockMoveOrder)).toEqual([3, 2]);
        });

    });
    describe("#removeWalls", function () {
        it("should not be able to move to walls", function () {
            mockMoveOrder = [
                logic.MOVES.LEFT,
                logic.MOVES.UP,
                logic.MOVES.RIGHT,
                logic.MOVES.DOWN
            ];
            mapMock = [[WALL, WALL, WALL, WALL, WALL],
                [WALL, MAP_SYMBOL.SPACE, WALL, MAP_SYMBOL.COOKIE, WALL],
                [WALL, MAP_SYMBOL.SPACE, MAP_SYMBOL.SPACE, MAP_SYMBOL.SPACE, WALL],
                [WALL, WALL, WALL, WALL, WALL]];
            expect(tecman.removeWalls([1, 1], mapMock, mockMoveOrder)).toEqual([logic.MOVES.DOWN]);
        });
        it("should remove walls 2", function () {
            mockMoveOrder = [
                logic.MOVES.LEFT,
                logic.MOVES.UP,
                logic.MOVES.RIGHT,
                logic.MOVES.DOWN
            ];
            mapMock = [[WALL, WALL, WALL, WALL, WALL],
                [WALL, MAP_SYMBOL.SPACE, WALL, MAP_SYMBOL.COOKIE, WALL],
                [WALL, MAP_SYMBOL.SPACE, MAP_SYMBOL.SPACE, MAP_SYMBOL.SPACE, WALL],
                [WALL, WALL, WALL, WALL, WALL]];
            expect(tecman.removeWalls([2, 2], mapMock, mockMoveOrder)).toEqual([logic.MOVES.LEFT,
                logic.MOVES.RIGHT]);
        });
    });
});