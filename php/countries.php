<?php
    include("data.php");
    include("countriesNames.php");

    function sendResponse($status, $data) {
        $output['status']['code'] = "200";
        $output['status']['name'] = $status;
        $output['data'] = $data;
    
        header('Content-Type: application/json; charset=UTF-8');
    
        echo json_encode($output);
    }


    $countryData = array();
    if($_REQUEST["country"] == "") {
        sendResponse("empty", $names);
    } else {
        foreach($names as $key => $value) {
            if(preg_match("/(".$_REQUEST["country"].")/i", $value)) {
                global $countryData;
                $countryData[$key] = $value;
            }
        }
        
        $found = array_search($_REQUEST["country"], $countryData);
        if($found) {
            sendResponse("ok", $list["features"][$found]);
        } else {
            sendResponse("hints", $countryData);
        }
    }
    






?>