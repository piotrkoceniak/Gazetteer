<?php
    include("Functions/response.php");
    include("Functions/apiRequest.php");
    include("test.php");
    
    // API urls
    $countryUrl = "http://api.geonames.org/wikipediaSearchJSON?q=".$_REQUEST["country"]."country"."&maxRows=2&username=pkoceniak";
    $capitalUrl = "http://api.geonames.org/wikipediaSearchJSON?q=".$_REQUEST["capital"]."&maxRows=2&username=pkoceniak";
    
    // requests
    $capitalRequest = sendRequest($capitalUrl);
    $countryRequest = sendRequest($countryUrl);
    
    // response
    $wikiRequest["country"] = $countryRequest;
    $wikiRequest["capital"] = $capitalRequest;
    
    sendResponse("ok", $wikiRequest);

?>