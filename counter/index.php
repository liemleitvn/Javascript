<!DOCTYPE html>
<html lang="en-US">
    <head>
        <meta charset="UTF-8">
        <title>Counter Number</title>
    </head>
    <body>
        <form name="frmCounter">
            <button id="reset" onclick="Reset()">Reset</button>
            <button id="thousands" onclick="event.preventDefault();thousand()" onmousedown="changeNumber()">0</button>
            <button id="hundreds" onclick="event.preventDefault();hundred()" onmousedown="changeNumber()">0</button>
            <button id="tens" onclick="event.preventDefault();ten()" onmousedown="changeNumber()">0</button>
            <button id="units" onclick=" event.preventDefault();unit()" onmousedown="changeNumber()">0</button>
        </form>
        <script src="handling.js"></script>
    </body>
</html>

