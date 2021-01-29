<?php
    include("Data/data.php");
    include("Data/countriesNames.php");
    include("Data/countriesCodes.php");
    include("Functions/response.php");

    $countryData = array();
    $countryNameSearch = strtolower($_REQUEST["country"]);


    if($countryNameSearch == "") {
        sendResponse("empty", $names);
    } else {
        // preparing hints
        foreach($names as $key => $value) {
            if(preg_match("/(".$countryNameSearch.")/i", $value)) {
                global $countryData;
                $countryData[$key] = $value;
            }
        }
        
        $found = false;
        // array_search - eqiuvalent - looking for exact matches 
        foreach($countryData as $key => $value) {
            if($countryNameSearch == strtolower($value)) {
                $found = $key;
            }
        }
        // determinig response as exact match or hint
        if($found === 0 || $found) {
            sendResponse("ok", $list["features"][$found]);
        } else {
            sendResponse("hints", $countryData);
        }
    }

    
    






?>