describe("convert map", function () {
    var Converter = require('../../src/converter');
    var converter;

    beforeEach(function () {
        converter = new Converter();
    });

    it("should check if main is defined", function() {
        expect(converter).toBeDefined();
    });
    it("should return enmpty", function () {
        var emptyMap = {
            "Width": 3,
            "Height": 3,
            "Rows": [
                "###",
                "# #",
                "###"
            ]
        };
        var emptyMapArray = [["#", "#", "#"],["#", " ", "#"],["#", "#", "#"]];
        expect(converter.convert(emptyMap)).toEqual(emptyMapArray);
    });
    it("should return enmpty", function () {
        var emptyMap = {
            "Width": 10,
            "Height": 7,
            "Rows": [
                "##########",
                "#        #",
                "#        #",
                "#        #",
                "#.######.#",
                "#.... ...#",
                "##########"
            ]
        };
        expect(converter.convert(emptyMap)[4]).toEqual(emptyMap.Rows[4].split(""));
    });
});