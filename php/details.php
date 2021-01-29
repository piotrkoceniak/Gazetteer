<?php
    include("Functions/response.php");
    include("Functions/apiRequest.php");


    
    // fetching details
    $detailsUrl = "http://api.geonames.org/countryInfoJSON?lang=en&country=".$_REQUEST["country"]."&username=pkoceniak";

    $details = sendRequest($detailsUrl);
    
    
    // getting neighbours
    $neighboursUrl = "http://api.geonames.org/neighboursJSON?geonameId=".$details["geonames"]["geonameId"]."&username=pkoceniak";

    $neighbours = sendRequest($neighboursUrl);

    // getting biggest cities
    $citiesUrl = "http://api.geonames.org/searchJSON?q=&country=".$_REQUEST["country"]."&cities=cities15000&maxRows=10&orderby=population&username=pkoceniak";

    $cities = sendRequest($citiesUrl);



?>