<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Prototype</title>
    </head>
    <body>
        <form action="index.php" method="post"">
            <table border="1" width="auto">
                <tr>
                    <th colspan="2">Please input information a student</th>
                </tr>
                <tr>
                    <td>Id:</td>
                    <td><input type="text" id="idStudent"></td>
                </tr>
                <tr>
                    <td>Fullname:</td>
                    <td><input type="text" id="nameStudent"></td>
                </tr>
                <tr>
                    <td colspan="2">
                        <input type="button" value="Reset" onclick="_class.clearAll()">
                        <input type="button" value="View" onclick="_class.viewStudent()">
                        <input type="button" value="Add" onclick="_class.addStudent()">
                        <input type="button" value="Edit" onclick="_class.editStudent()">
                        <input type="button" value="Delete" onclick="_class.delete()">
                    </td>
                </tr>
            </table>
        </form>
        <p id="show"></p>
        <script src="handing.js"></script>
    </body>
</html>