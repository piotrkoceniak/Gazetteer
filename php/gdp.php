<?php
    include("Functions/response.php");
    include("Functions/apiRequest.php");
    include("test.php");

    $url = "http://api.worldbank.org/v2/country/".$_REQUEST["country"]."/indicator/NY.GDP.MKTP.CD?date=1990:2021&format=JSON";

    $gdp = sendRequest($url);

    sendResponse("ok", $gdp);
?>