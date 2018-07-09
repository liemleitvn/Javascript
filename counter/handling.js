var units = parseInt(document.getElementById("units").innerHTML);
var tens = parseInt(document.getElementById("tens").innerHTML);
var hundreds = parseInt(document.getElementById("hundreds").innerHTML);
var thousands = parseInt(document.getElementById("thousands").innerHTML);

//Ham nay nham muc dich thay doi text cua tat ca button khi click bat ky 1 button nao
function changeNumber() {
    //Maximum so thi reset
    if(units == 9 && tens == 9 && hundreds == 9 && thousands ==9) {
        var con = confirm("Maximum number \nPlease Reset!");
        //Neu nguoi dung xac nhan thi reset
        //Nguoc lai neu nguoi dung khong xac nhan thi cac text button van khong thay doi
        //Khi tiep tuc click thi se nhan duoc yeu cau xac nhan reset
        if(con == true) {
            units = 0;
            tens = 0;
            hundreds = 0;
            thousands = 0;
        }
    }
    //Hien thi text cua cac button khi click bat ky 1 button nao
    document.getElementById("units").innerHTML = units;
    document.getElementById("tens").innerHTML = tens;
    document.getElementById("hundreds").innerHTML = hundreds;
    document.getElementById("thousands").innerHTML = thousands;
}

//Ham reset khi click button Reset
function Reset() {
    document.getElementById("units").innerHTML = 0;
    document.getElementById("tens").innerHTML = 0;
    document.getElementById("hundreds").innerHTML = 0;
    document.getElementById("thousands").innerHTML = 0;
}



//Ham xuly su kien click button unit
function CalcUnit() {
    //unit chua max thi tiep tuc tang
    if (units <9) {
        return units += 1;
    }
    //neu unit max thi thuc hien tang cac button ben trai roi reset unit
    else {
        //kiem tra neu ten chua max thi tang ten va reset unit
        if (tens < 9) {
            tens += 1;
        }
        //Neu ten max thi tang button ben trai roi reset
        else {
            //neu hundred chua max thi tang len 1
            if(hundreds < 9) {
                hundreds ++;
            }
            //Neu hundred max thi tang thousand va reset hundred
            else {
                thousands++;
                hundreds =0;
            }
            tens = 0;
        }
        units = 0;
    }
    return units;
}

//Ham su kien click button unit
function unit() {
    document.getElementById("units").innerHTML = CalcUnit();
}

//Ham xu ly su kien click button ten
function CalcTen() {
    //Neu ten chua max thi tang 1
    if (tens <9) {
        return tens += 1;
    }
    //neu ten max thi xet butoon ben trai va reset ten
    else {
        //neu button hundred chua max thi tang 1
        if(hundreds < 9) {
            hundreds ++;
            tens = 0;
        }
        //neu button hundred max thi tang button thousand va reset hundred
        else {
            if(thousands <9) {
                thousands ++;
                hundreds = 0;
                tens = 0;
            }
            else {
                alert("Thousands is maximum, can't increase!")
            }
        }
    }
    return tens;
}
//ham su kien click button ten
function ten() {
    document.getElementById("tens").innerHTML = CalcTen();
}


//Ham xu ly su kien click button hundred
function CalcHundred() {
    //neu hundred chua max thi tang 1
    //nguoc lai neu max thi xet button ben trai va reset hundred
    if (hundreds <9) {
        return hundreds += 1;
    }
    else {
        //neu thousand chua max thi tang 1
        //nguoc lai max thi kiem tra toan bo cac button va khong tang len nua cho du event click say ra
        if(thousands < 9) {
            thousands += 1;
            hundreds = 0;
        }
        else {
            alert("Thousands is maximum, can't increase!")
        }
    }
    return hundreds;
}
function hundred() {
    document.getElementById("hundreds").innerHTML = CalcHundred();
}


function CalcThousand() {
    if (thousands <9) {
        thousands += 1;
    }
    else {
        alert("Thousands is maximum, can't increase!")
    }
    return thousands;
}
function thousand() {
    document.getElementById("thousands").innerHTML = CalcThousand();
}