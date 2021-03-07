<?php
    include("Functions/response.php");
    include("Functions/apiRequest.php");
    include("test.php");


    $APIKey = "26f872631e2a2f42aaae74dc839e5d7e";
    // getting points of interest
    $pictureInfoUrl = "https://www.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=".$APIKey."&photo_id=".$_REQUEST["id"]."&secret=".$_REQUEST["secret"]."&format=json&nojsoncallback=1";

    $pictureInfo = sendRequest($pictureInfoUrl);

    // response
    sendResponse("ok", $pictureInfo);

?>