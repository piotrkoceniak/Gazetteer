<?php
    include("Functions/response.php");
    include("Functions/apiRequest.php");
    include("test.php");


    $APIKey = "26f872631e2a2f42aaae74dc839e5d7e";
    // getting points of interest
    $picturesUrl = "https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=".$APIKey."&tags=".$_REQUEST["country"]."&sort=relevance&privacy_filter=1&content_type=1&media=photos&per_page=10&format=json&nojsoncallback=1";

    $pictures = sendRequest($picturesUrl);

    // response
    sendResponse("ok", $pictures);

?>
