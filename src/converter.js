(function(){
    var Converter = function() {

        this.convert = function(map){
            var arrayMap = [];
            arrayMap = map.Rows.map(function (row) {
               return row.split("");
            });
            return arrayMap;
        }
    };


    module.exports = Converter;
}());
