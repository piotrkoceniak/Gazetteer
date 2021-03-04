<?php
    include("Functions/response.php");
    include("Functions/apiRequest.php");
    include("test.php");

    // getting biggest cities
    $poisUrl = "http://api.geonames.org/findNearbyPOIsOSMJSON?lat=".$_REQUEST['lat']."&lng=".$_REQUEST['lng']."&maxRows=10&username=pkoceniak";

    $pois = sendRequest($poisUrl);

    // response
    $responseData["poi"] = $pois["poi"];
    sendResponse("ok", $responseData);

?>