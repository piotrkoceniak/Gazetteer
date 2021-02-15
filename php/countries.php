<?php
    include("Functions/response.php");

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