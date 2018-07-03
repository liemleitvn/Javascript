var arr = [];
//Sap xep arr obj theo birthday
function SortBirthday() {
    //day la cach sap xep mang co key va value, va doi tuong sap xep la number
    arr.sort(function (a, b) {return a.birthday- b.birthday});
    Show();
    document.getElementById("id2").innerHTML = "Ban da sap xep thong tin theo ngay sinh";
}

//Sap xep array obj theo name
//doi tuong sap xep la string
function SortName() {
    arr.sort(function (a, b) {
        if(a.name < b.name){
            return -1;
        }
        if(a.name > b.name ){
            return 1;
        }
        return 0;
    });
    Show();
    document.getElementById("id2").innerHTML = "Ban da sap xep thong tin theo ten";
}

//Hien thi array obj
function Show(ar = arr) {
    var text = "";
    var len = arr.length;
    var i = 0;

    while (i < len ) {
        text += arr[i].name + ":" + arr[i].birthday + "<br>";
        i ++;
    }
    document.getElementById("id2").innerHTML = "Thong tin tat ca cac phan tu trong array: " + "<br>";
    document.getElementById("id").innerHTML = text;
}

//Them phan tu vao cuoi array obj
function ArrayPush() {
    //lay gia tri value cua text name va birthday
    var name = document.getElementById("idName").value;
    var birthay = document.getElementById("idBirthday").value;

    //Truong hop chua nhap hoa nhap chua du thong tin cua 2 dong text
    if (name == "" || birthay == "") {
        alert("Nhap chua du thong tin !");
        return false;
    }
    else
    {
        //kiem tra birthday nhap vao co phai la number
        if(isNaN(birthay)) {
            alert("Nhap khong dung ngay sinh");
            return false;
        }
        else {
            //Kiem tra thong tin nhap vao da ton tai chua
            var i = 0;
            var len = arr.length
            var flag = false;
            for (i = 0; i <len; i ++)
            {
                if(arr[i].name.toLowerCase() == name.toLowerCase() && arr[i].birthday == birthay) {
                    flag = true;
                    break;
                }
            }
            //Thong tin da ton tai
            if(flag) {
                    alert("Thong tin nay da ton tai");
                    return false;
                }
            //nhap thong tin vao array
            else {
                arr.push({name: name, birthday: birthay});
                document.getElementById("id2").innerHTML =
                    "Ban da them phan tu vao cuoi array: " + "<br>" + name + " - " + birthay;
                return true;
            }
        }
    }
    return false;
}

//Lay 1 phan tu o cuoi va xoa phan tu nay ra khoi array
function ArrayPop() {
    var tmp = arr.pop();
    Show();
    document.getElementById("id2").innerHTML = "Phan tu lay ra khoi array: " + "<br>" + tmp.name + ":" + tmp.birthday;
}

//Lay n phan tu dau
function ArraySlice() {
    var start = prompt("Vi tri bar dau lay phan tu");
    var end = prompt("Vi tri ket thuc viec lay phan tu");
    var arr1 = [];
    if(end >= start) {
        arr1 = arr.slice(start,end);
        Show(arr1);
        document.getElementById("id2").innerHTML = "Phan tu can lay: ";
    }
    else {
        arr1 = arr.slice(start,arr.length-1)
        Show(arr1);
        document.getElementById("id2").innerHTML = "Phan tu can lay: ";
    }

}

var data =
    '[{"name": "Le Van Liem", "birthday": "1989"},' +
    '{"name" : "Truong Quynh Nhu", "birthday" : "1993"},' +
    '{"name" : "Tran Thi Thu Huong", "birthday" : "1987"},' +
    '{"name" : "Nguyen Thi Na", "birthday" : "1989"},' +
    '{"name" : "Nguyen Thi Cam Lai", "birthday" : "1993"}]';
function jsonTest() {
    var json = "";
    data = JSON.parse(data);
    for (var i = 0; i < data.length; i++) {
        json += data[i].name + " - " + arr[i].birthday + "<br>";
    }
    document.getElementById("id").innerHTML = json;
    document.getElementById("id2").innerHTML = "Day la JSON";
}