<?php
    include("Functions/response.php");
    include("Functions/apiRequest.php");
    include("test.php");


    $APIKey = "c11c5e5ca44a4bceafc3df6eef2549f7";
    // getting points of interest
    $newsUrl = "https://newsapi.org/v2/everything?qInTitle=".$_REQUEST['country']."&language=en&sortBy=publishedAt&pageSize=10&apiKey=".$APIKey;

    $news = sendRequest($newsUrl);

    // response
    sendResponse("ok", $news);

?>


