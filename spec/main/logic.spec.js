describe("Main", function () {
    var Logic = require("../../src/logic");
    var logic, mapMock, mockTacmanTurnInfo;

    beforeEach(function () {
        logic = new Logic();
        mapMock = [["#", "#", "#", "#", "#", "#", "#", "#", "#", "#"],
            ["#", " ", " ", " ", " ", " ", " ", " ", " ", "#"],
            ["#", " ", " ", " ", " ", " ", " ", " ", " ", "#"],
            ["#", " ", " ", " ", " ", " ", " ", " ", " ", "#"],
            ["#", ".", "#", "#", "#", "#", "#", "#", ".", "#"],
            ["#", ".", ".", ".", ".", " ", ".", ".", ".", "#"],
            ["#", "#", "#", "#", "#", "#", "#", "#", "#", "#"]];
        mockTacmanTurnInfo = {
            "Mode": logic.MODE.TECMAN,
            "Map": mapMock,
            "TecmanPosition": {
                "Row": 4,
                "Col": 5
            },
            "PreviousTecmanPosition": {
                "Row": 5,
                "Col": 4
            },
            "GhostPositions": [
                {
                    "Row": 2,
                    "Col": 3
                },
                {
                    "Row": 2,
                    "Col": 4
                },
                {
                    "Row": 2,
                    "Col": 5
                },
                {
                    "Row": 2,
                    "Col": 6
                }
            ],
            "PreviousGhostPositions": [
                {
                    "Row": 2,
                    "Col": 3
                },
                {
                    "Row": 2,
                    "Col": 4
                },
                {
                    "Row": 2,
                    "Col": 5
                },
                {
                    "Row": 2,
                    "Col": 6
                }
            ]
        }
    });

    it("should check if main is defined", function () {
        expect(logic).toBeDefined();
    });
    it("should have moves", function () {
        expect(logic.MOVES).toBeDefined();
    });

    describe("#run", function () {
        it("should stay in place if is TECMAN", function () {
            expect(logic.getPosition(mockTacmanTurnInfo)).toEqual([mockTacmanTurnInfo.TecmanPosition]);
        });
        it("should stay in place for Ghosts", function () {
            mockTacmanTurnInfo.Mode = logic.MODE.GHOSTS;
            expect(logic.getPosition(mockTacmanTurnInfo)).toEqual(mockTacmanTurnInfo.GhostPositions);
        });
    });

    describe("#stepCount", function () {
        it("should return number 2", function () {
            expect(logic.stepCount([0, 0], [1, 1])).toBe(2);
        });
        it("should return step numbers", function () {
            expect(logic.stepCount([5, 6], [5, 5])).toBe(1);
            expect(logic.stepCount([3, 0], [0, 3])).toBe(6);
            expect(logic.stepCount([10, 5], [5, 5])).toBe(5);
        });
    });
});