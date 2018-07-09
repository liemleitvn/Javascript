function mailsomeone() {
    var who = prompt("Enter recipient's email address: ","antispammer@earthling.net");
    var what = prompt("Enter the subject: ","none");
    if(confirm("Are you sure you want to mail \"+who+\" with the subject of \"+what+\"?")) {
        parent.location.href='mailto:'+who+'?subject='+what+'';
        console.log('mailto:'+who+'?subject='+what+'');
    }
}