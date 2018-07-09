function Class() {
}

Class.prototype.data = [];
Class.prototype.idStudent = document.getElementById("idStudent").value;
Class.prototype.nameStudent = document.getElementById("nameStudent").value;

//function check information befor submit, add student in array data
Class.prototype.checkinformation = function (id,name) {
    //Text Id is not input
    if(id == "") {
        alert("Please input Id student!");
        return false;
    }
    //Text Name is not input
    if(name =="") {
        alert("Please input Name student!");
        return false;
    }
    //Check student already in data or not
    for (var i = 0; i < this.data.length; i++) {
        if (this.data[i].id == id) {//already
            alert("Student is already!")
            return false;
        }
    }
    return true;
}

//Add student to the array data
Class.prototype.addStudent = function () {
    var id = document.getElementById("idStudent").value;//id student was gotten from textbox Id
    var name = document.getElementById("nameStudent").value;//name student wa gotten from texbox Name

    //if function checkinformation return true, add student to the array data, else not add and alert fail
    if((new Class()).checkinformation(id,name)) {
        var countElementBefor = this.data.length; // array data lengh befor add student
        var item = {
            id:id,
            name:name
        }
        //Push Obj item(id,name student) to the array data and get array lengh after add
        var countElementAfter = this.data.push(item);

        //If after adding, the longer the length before adding, the more successful, else fail
        if (countElementAfter > countElementBefor) {
            alert("Adding successful!");
        }
        else {
            alert("Fail! Can not add data!")
        }
    }
}

//View all student in array data
Class.prototype.viewStudent = function () {
    var show = "";
    for (var i = 0; i < this.data.length; i++) {
        show += "<div>" + this.data[i].id + "|" + this.data[i].name + "</div>";
    }
    document.getElementById("show").innerHTML = show;
}

//Delete 1 student when user input student's id
Class.prototype.delete = function () {
    var idRemove = prompt("Input id student delete: ");
    for(i = 0; i < this.data.length; i++) {
        if(this.data[i].id == idRemove) {
            this.data.splice(i,1);
            alert("Student has id " + idRemove + " was deleted");
            return true;
        }
    }
    alert("Fail delete \n Check again id student");
}

//Edit student information when user input id,name of student
//If student's id exist, edit
//Else alert fail
Class.prototype.editStudent = function () {
    var id = document.getElementById("idStudent").value;
    var name = document.getElementById("nameStudent").value;

    for(var i = 0; i < this.data.length; i++) {
        if(this.data[i].id == id) {
            this.data[i].id = id;
            this.data[i].name = name;
            alert("Information for student " + id + " was changed!")
            return true;
        }
    }
    alert("Fail! Check again id student");
    return false;
}

//Reset system
Class.prototype.clearAll = function () {
    var con = confirm("Are you sure delete all data ?");
    if(con) {
        this.data.splice(0,this.data.length);
        document.getElementById("idStudent").value = "";
        document.getElementById("nameStudent").value = "";
        document.getElementById("show").innerHTML = "";
        alert("System was rest");
    }
}

var _class = new Class();
