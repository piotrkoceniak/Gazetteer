<?php
    include("Functions/response.php");
    include("Functions/apiRequest.php");
    include("test.php");

    $APIKey = "27ba13418a5669b4fb6f5c212db49757";

    $t = time() - (60*60*24*1);
    
    // API urls
    $forecastUrl = "https://api.openweathermap.org/data/2.5/onecall?units=metric&lang=en&lat=".$_REQUEST["lat"]."&lon=".$_REQUEST["lon"]."&appid=".$APIKey;
    $historicalUrl = "http://api.openweathermap.org/data/2.5/onecall/timemachine?units=metric&lang=en&lat=".$_REQUEST["lat"]."&lon=".$_REQUEST["lon"]."&dt=".$t."&appid=".$APIKey;
    
    // requests
    $forecastWeather = sendRequest($forecastUrl);
    $historicalWeather = sendRequest($historicalUrl);
    
    // response
    $weather["forecast"] = $forecastWeather;
    $weather["historical"] = $historicalWeather;
    
    sendResponse("ok", $weather);

?>