var plus = function () {
    var countPlus = 0;
    return function () {
        return countPlus +=1;
    }
};
var _plus = plus();
function Plus() {
    document.getElementById("idCountPlus").innerHTML = _plus();
}
