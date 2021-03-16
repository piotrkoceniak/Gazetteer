<?php
    include("Functions/response.php");
    include("Functions/apiRequest.php");
    include("test.php");

    // getting points of interest
    $poisUrl = "http://api.geonames.org/findNearbyPOIsOSMJSON?lat=".$_REQUEST['lat']."&lng=".$_REQUEST['lng']."&maxRows=20&radius=1&username=pkoceniak";

    $pois = sendRequest($poisUrl);
    test($pois);
    // response
    sendResponse("ok", $pois);

?>