<?php
    include("Functions/response.php");
    include("Functions/apiRequest.php");
    include("Data/currencyCodes.php");
    include("test.php");

    $APIKey = "4268be7494a74d298fdc87aa1ad64259";
    $latestURL ="https://openexchangerates.org/api/latest.json?app_id=".$APIKey;



    $lastResponse = fopen("Data/currencies.json", "r+");
    $decodedLast = json_decode(fread($lastResponse, filesize("Data/currencies.json")), true);
    fclose($lastResponse);

    $lastRequestTime;
    if($decodedLast["timestamp"] != null) {
        if($decodedLast["timestamp"] > (time() - (60*60*1))) {
            $lastRequestTime = true;
        } else {
            $lastRequestTime = false;
        }
    } else {
        $lastRequestTime = false;
    }

    if($lastRequestTime) {
        $decodedLast["currencyFullName"] = $currencies[$_REQUEST["currency"]];
        sendResponse("ok", $decodedLast);
    } else {
        $newLatest = sendRequest($latestURL);
        $newResponse = fopen("Data/currencies.json", "w");
        fwrite($newResponse, json_encode($newLatest));
        fclose($newResponse);
        $newLatest["currencyFullName"] = $currencies[$_REQUEST["currency"]];

        sendResponse("ok", $newLatest);
    }


?>