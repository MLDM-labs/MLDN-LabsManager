<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel = "stylesheet" href = "css/index.css">
    <title>MLDM-Lab5-ReachabilityMatrix</title>
</head>
<body>
    <h1>Reachability matrix</h1>
    <textarea id = "matrix" cols = "25" rows = "5" placeholder = "Input example:
0 0 0 0
0 0 1 0
1 0 0 1
1 0 0 0"></textarea><br>
    <button id = "getButton" onclick = "
        let matrix = document.getElementById('matrix').value;
        let message = {'matrix': matrix};

        send(message, 'php/script.php');
    ">Get</button>

    <div id = "outputDiv"></div>

    <script
        src = "https://code.jquery.com/jquery-3.6.0.js"
        integrity = "sha256-H+K7U5CnXl1h5ywQfKtSj8PCmoN9aaq30gDh27Xc0jk="
        crossOrigin = "anonymous" >
    </script>
    <script src = "js/index.js"></script>
</body>
</html>