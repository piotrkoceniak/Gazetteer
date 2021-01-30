<?php
    include("Functions/response.php");
    include("Functions/apiRequest.php");
    include("test.php");

    $APIKey = "27ba13418a5669b4fb6f5c212db49757";

    $url = "http://api.openweathermap.org/data/2.5/weather?q=".$_REQUEST["capital"]."&units=metric&lang=en&appid=".$APIKey;
    
    $weather = sendRequest($url);

    sendResponse("ok", $weather);

?>