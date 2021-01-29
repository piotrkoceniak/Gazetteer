<?php 
include("Data/countriesCodes.php");
include("Data/data.php");
include("Functions/response.php");
include("Functions/apiRequest.php");
include("test.php");

$url = "http://api.geonames.org/countrySubdivisionJSON?lat=".$_REQUEST["lat"]."&lng=".$_REQUEST["lng"]."&username=pkoceniak";

$decode = sendRequest($url);
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