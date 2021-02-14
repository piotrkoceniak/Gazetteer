<?php
    include("Functions/response.php");
/*
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
*/



    $countryData = json_decode(file_get_contents("Data/countryBorders.geo.json"), true);


    if($_REQUEST["country"] === "") {
        $country = [];
        foreach ($countryData['features'] as $feature) {
            $temp = null;
            $temp['code'] = $feature["properties"]['iso_a2'];
            $temp['name'] = $feature["properties"]['name'];
            
            array_push($country, $temp);
        }

        usort($country, function ($item1, $item2) {
            return $item1['name'] <=> $item2['name'];
        });
        
        sendResponse("full", $country);
    } else {
        $country = null;
        foreach($countryData["features"] as $feature) {
            if($feature["properties"]["iso_a2"] === $_REQUEST["country"]) {
                $country = $feature;
            }
        }
        
        sendResponse("ok", $country);
    }




?>