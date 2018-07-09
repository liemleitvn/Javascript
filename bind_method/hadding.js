
//Object Function
function Person(name, age) {
    this.name = name;
    this.age = age;
}

Person.prototype.move = function (vehicle,nameVehicle,speed) {
    this.vehicle = vehicle;
    this.nameVehicle = nameVehicle;
    this.speed = speed;

    let infoPerson = function () {
        console.log("Name: "+this.name + " Age: "+this.age + " Vehicle by " + this.vehicle);
        };
    let inforCar = function () {
        console.log("Vehicle: " + this.vehicle + ": type: " + this.nameVehicle + ", Max speed: " + this.speed + "km/h.");
        };
    setTimeout(infoPerson.bind(this),3000);
    setTimeout(inforCar.bind(this),4000);

    var x = infoPerson.bind(this);
    x();
};

//Object Literal
var person = new Person("A",20);
person.move("car","Lexus",350);
