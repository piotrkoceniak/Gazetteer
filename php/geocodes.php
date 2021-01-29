<?php 
include("Data/countriesCodes.php");
include("Data/data.php");
include("Functions/response.php");
include("Functions/apiRequest.php");
include("test.php");

$APIKey = "27ba13418a5669b4fb6f5c212db49757";

$url = "http://api.openweathermap.org/geo/1.0/reverse?lat=".$_REQUEST["lat"]."&lon=".$_REQUEST["lng"]."&limit=1&appid=".$APIKey;
$url2 = "http://api.geonames.org/countrySubdivisionJSON?lat=".$_REQUEST["lat"]."&lng=".$_REQUEST["lng"]."&username=pkoceniak";

$decode = sendRequest($url2);
test($decode);
if(sizeof($decode) > 0) { 
  $countryKey = array_search($decode["countryCode"], $codes);
  $responseData = $list["features"][$countryKey];
  $responseData["geocodes"] = $decode;
  sendResponse("ok", $responseData); 
} else {
  sendResponse("empty", "No data");
}
?>