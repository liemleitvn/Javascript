var customize = function () {
    var address = document.getElementById("url").value;
    var tool = (document.getElementById("tool").checked)?1:0;
    var loc_box = (document.getElementById("loc_box").checked)?1:0;
    var dir = (document.getElementById("dir").checked)?1:0;
    var stt = (document.getElementById("stt").checked)?1:0;
    var menu = (document.getElementById("menu").checked)?1:0;
    var scroll = (document.getElementById("scroll").checked)?1:0;
    var resize = (document.getElementById("resize").checked)?1:0;
    var width = document.getElementById("width").value;
    var height = document.getElementById("height").value;

    var option = "toolbar="+ tool +",location="+ loc_box +",directories=" +
        dir +",status="+ stt +",menubar="+ menu +",scrollbars=" +
        scroll +",resizable=" + resize +",width=" + width +",height="+ height;

    var win3 = window.open("", "what_I_want", option);
    var win4 = window.open(address, "what_I_want");
}

function clear() {
    alert("Da vao");
    document.getElementById("url").value = "";
    document.getElementById("width").value = "";
    document.getElementById("height").value = "";
}