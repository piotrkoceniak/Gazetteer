<?php 
include("Functions/response.php");
include("Functions/apiRequest.php");
include("test.php");

$url = "http://api.geonames.org/countrySubdivisionJSON?lat=".$_REQUEST["lat"]."&lng=".$_REQUEST["lng"]."&username=pkoceniak";

$decode = sendRequest($url);

$countryData = json_decode(file_get_contents("Data/countryBorders.geo.json"), true);

if(array_key_exists("codes", $decode)) { 
  $country = false;
  
  foreach ($countryData['features'] as $feature) {
    if($feature["properties"]["iso_a2"] === $decode["countryCode"]) {
      $country = $feature;
    }
  }
  
  if($country) {  
    $responseData = $country;
    $responseData["geocodes"] = $decode;
    sendResponse("ok", $responseData); 
  } else {
    sendResponse("empty", "No data");  
  } 
} else {
  sendResponse("empty", "No data");
}
?>