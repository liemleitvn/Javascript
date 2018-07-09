//Object Literal
var module = {
    x: "XXXX",
    getX: function () {
        var y = this.x + "YYYY";
        var getY = function () {
            console.log(y);
        };
        getY()
        return this.x;
    },
};

var showX = module.getX();
console.log(showX);
