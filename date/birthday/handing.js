function show() {
    document.bgColor = "green";//thay doi backgroud page
    document.fgColor = "red";//thay doi mau chu website
    window.status = "Event onclick was actived";


    //get current time
    var d = new Date();
    var currentYear = d.getFullYear();
    var currentMonth = d.getMonth();
    var currentDate = d.getDate();

    //get birthday
    var year = document.getElementById("idBirthdayYear").value;
    var month = document.getElementById("idBirthdayMonth").value;
    var date = document.getElementById("idBirthdayDate").value;


    //check and calculate age
    if(!parseInt(year) || currentYear - year <0) {
        alert("Year incorrect!");
        return;
    }
    else {
        if (!parseInt(month) || month > 12) {
            alert("Month incorrect!");
            return;
        }
        else {
            if(!parseInt(date) || date > 31) {
                alert("Date incorrect!");
                return;
            }
            else {
                var D = new Date(year,month-1,date);
                var totalTime = d-D;
                var yy = Math.round(totalTime/31536000000,0);
                var remainder = totalTime%31536000000;//phan milisecond du sau khi tinh nam
                var mm = Math.round(remainder/2592000000,0);
                remainder = remainder%2592000000;//phan du sau khi tinh thang
                var dd = Math.round(remainder/86400000,0);
                alert("Your age: " + yy + " years old " + mm + " months " + dd + " date");

            }
        }
    }
}

function ChenLienKet() {
    document.getElementById("link").outerHTML = "<a href = 'https://facebook.com'>Trang</a>"
}