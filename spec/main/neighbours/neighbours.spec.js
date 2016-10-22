describe("#NEIGHBOURS", function () {
    var Neighbours = require('../../../src/neighbours/neighbours');
    var neighbours, mapMock;

    beforeEach(function () {
        neighbours = new Neighbours();
    });

    describe('#cookies', function () {
        it("should return empty array with bad inputs", function () {
            mapMock = [["#", "#", "#"], ["#", "#", "#"], ["#", "#", "#"]];
            expect(neighbours.getCookies(mapMock, 1, [0, 0]).length).toBe(0);
            mapMock = [];
            expect(neighbours.getCookies(mapMock, 1, [0, 0]).length).toBe(0);
            mapMock = undefined;
            expect(neighbours.getCookies(mapMock, 1, [0, 0]).length).toBe(0);
        });

        it('should get 1 cookie with radius 1', function () {
            mapMock = [ ["#", "#", "#"],
                        [".", "#", "#"],
                        ["#", "#", "#"]];
            expect(neighbours.getCookies(mapMock, 1, [0, 0]).length).toBe(1);
        });
        it('should get 1 cookie with radius 2', function () {
            mapMock = [ ["#", "#", "."],
                        ["#", "#", "#"],
                        ["#", "#", "#"]];
            expect(neighbours.getCookies(mapMock, 2, [0, 0]).length).toBe(1);
        });
        it('should get 2 cookie with radius 2', function () {
            mapMock = [ ["#", "#", "."],
                        ["#", "#", "."],
                        ["#", "#", "#"]];
            expect(neighbours.getCookies(mapMock, 2, [0, 0]).length).toBe(2);

        });
    });

    describe('should find nearest cookie...mmm...cookie', function () {
        it('should return nearest cookie from given map', function () {
            mapMock = [ ["#", "#", "#"],
                        [".", "#", "#"],
                        ["#", ".", "#"]];
            expect(neighbours.findNearestCookie(mapMock, 1, [0, 0])[0]).toBe(1);
            expect(neighbours.findNearestCookie(mapMock, 1, [0, 0])[1]).toBe(0);
        });
    });
});