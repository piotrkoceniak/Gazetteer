<?php
    include("Functions/response.php");
    include("Functions/apiRequest.php");
    include("test.php");

    $url = "http://api.worldbank.org/v2/country/".$_REQUEST["country"]."/indicator/SP.POP.TOTL?date=1990:2021&format=JSON";

    $population = sendRequest($url);

    sendResponse("ok", $population);
?>