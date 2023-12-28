<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Email Verification</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
        }

        #container {
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            text-align: center;
        }

        h1 {
            color: #333;
        }

        p {
            color: #555;
            margin-bottom: 20px;
        }

        #verify {
            text-decoration: none;
            padding: 10px 30px;
            background-color: #3498db;
            color: #fff;
            border-radius: 5px;
            display: inline-block;
            transition: background-color 0.3s ease;
        }

        #verify:hover {
            background-color: #217dbb;
        }

        #copyright {
            color: #888;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div id="container">
        <h1>Hello!</h1>
        <p>Please click the button below to verify your email address.</p>
        <div>
            <a id="verify" href="{{$url}}">Verify Email</a>
        </div>
        <div id="copyright">AirHouse &copy; 2023 by Nhan-Tan-Mai-Giu</div>
    </div>
</body>
</html>