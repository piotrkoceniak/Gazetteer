<?php
    include("Functions/response.php");
    include("Functions/apiRequest.php");
    include("test.php");

    // getting biggest cities
    $citiesUrl = "http://api.geonames.org/searchJSON?q=&country=".$_REQUEST["country"]."&cities=cities15000&maxRows=500&orderby=population&username=pkoceniak";

    $cities = sendRequest($citiesUrl);

    // response
    $responseData["cities"] = $cities["geonames"];
    sendResponse("ok", $responseData);

?>