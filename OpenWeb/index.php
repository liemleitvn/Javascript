<!DOCTYPE html>
<html>
    <head>

    </head>
    <body>
        <h1>Please choose from the following selection to customize your window</h1>
        <br>
        <table border="1">
            <tr>
                <td>
                    <input type="text" id="url" value="https://facebook.com">:URL
                    <br>
                    <input type="checkbox" id="tool">:Toolbar
                    <br>
                    <input type="checkbox" id="loc_box">:Location
                    <br>
                    <input type="checkbox" id="dir">:Directories
                    <br>
                    <input type="checkbox" id="stt">:Status
                    <br>
                    <input type="checkbox" id="menu">:Menu
                    <br>
                    <input type="checkbox" id="scroll">:Scrollbars
                    <br>
                    <input type="checkbox" id="resize">:Resizable
                    <br>
                    <input type="text" id="width">:Width
                    <br>
                    <input type="text" id="height">:Height
                    <br>
                    <br>
                    <input type="button" value="Enter" onclick="customize()">
                    <input type="button" value="Reset" onclick="clear()">
                </td>
            </tr>
        </table>
        <script src="handing.js"></script>
    </body>
</html>