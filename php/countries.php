<?php
    include("data.php");
    include("countriesNames.php");

    // sending response with country name hints or country polygon
    function sendResponse($status, $data) {
        $output['status']['code'] = "200";
        $output['status']['name'] = $status;
        $output['data'] = $data;
    
        header('Content-Type: application/json; charset=UTF-8');
    
        echo json_encode($output);
    }


    // removing duplicated starting point from coordinates array for leaflet polygons
    function prepareDataArray($rawArray) {
        $coordinatesRaw = $rawArray["geometry"];
        $processedCoordinates = array();

        // checking polygon type
        if($coordinatesRaw["type"] == "MultiPolygon") {
            foreach($coordinatesRaw["coordinates"] as $setArray) {
                $coordinatesSet = array();
                foreach($setArray[0] as $point) {
                    // reversing coordinates for leaflet polygon
                    $newPoint = array($point[1], $point[0]);
                    array_push($coordinatesSet, $newPoint);
                }
                array_pop($coordinatesSet);
                array_push($processedCoordinates, $coordinatesSet);
            }
        } elseif($coordinatesRaw["type"] == "Polygon") {
            foreach($coordinatesRaw["coordinates"][0] as $point) {
                // reversing coordinates for leaflet polygon
                $newPoint = array($point[1], $point[0]);
                array_push($processedCoordinates, $newPoint);
            }
            array_pop($processedCoordinates);
        } else {
            array_push($processedCoordinates, "Error procesing coordinates - Other type of polygon: ".$coordinatesRaw["type"]);
        }

        $rawArray["geometry"]["coordinates"] = $processedCoordinates;
        return($rawArray);
    }


    $countryData = array();
    $countryNameSearch = ucfirst(strtolower($_REQUEST["country"]));
    
    if($countryNameSearch == "") {
        sendResponse("empty", $names);
    } else {
        foreach($names as $key => $value) {
            if(preg_match("/(".$countryNameSearch.")/i", $value)) {
                global $countryData;
                $countryData[$key] = $value;
            }
        }
        
        $found = array_search($countryNameSearch, $countryData);
        if($found) {
            sendResponse("ok", prepareDataArray($list["features"][$found]));
        } else {
            sendResponse("hints", $countryData);
        }
    }
    






?>