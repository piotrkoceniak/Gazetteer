<?php
    include("Functions/response.php");
    include("Functions/apiRequest.php");
    include("test.php");

    
    // fetching details
    $detailsUrl = "http://api.geonames.org/countryInfoJSON?lang=en&country=".$_REQUEST["country"]."&username=pkoceniak";
    $countryNameUrl = "http://api.geonames.org/searchJSON?q=&country=".$_REQUEST["country"]."&featureCode=PCLI&username=pkoceniak";
    $details = sendRequest($detailsUrl);
    $fullName = sendRequest($countryNameUrl);
    
    // getting neighbours
    $neighboursUrl = "http://api.geonames.org/neighboursJSON?geonameId=".$details["geonames"][0]["geonameId"]."&username=pkoceniak";

    $neighbours = sendRequest($neighboursUrl);

    // getting biggest cities
    $citiesUrl = "http://api.geonames.org/searchJSON?q=&country=".$_REQUEST["country"]."&cities=cities15000&maxRows=10&orderby=population&username=pkoceniak";

    $cities = sendRequest($citiesUrl);

    // getting currnet weather 
    
    // response
    $responseData["details"] = $details["geonames"][0];
    $responseData["neighbours"] = $neighbours["geonames"];
    $responseData["cities"] = $cities["geonames"];
    $responseData["fullName"] = $fullName["geonames"][0]["toponymName"];
    sendResponse("ok", $responseData);

?>