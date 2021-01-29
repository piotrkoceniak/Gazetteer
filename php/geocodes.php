<?php 
include("Data/countriesCodes.php");
include("Data/data.php");
include("Responses/response.php");
include("test.php");
// TO DO !!!!!!!!!!!!!!!!!!!!!!!

$APIKey = "27ba13418a5669b4fb6f5c212db49757";
$url = "http://api.openweathermap.org/geo/1.0/reverse?lat=".$_REQUEST["lat"]."&lon=".$_REQUEST["lng"]."&limit=1&appid=".$APIKey;

$ch = curl_init();
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_URL,$url);

$result=curl_exec($ch);

curl_close($ch);

$decode = json_decode($result,true);

if($decode[0] !== null) {
  $countryKey = array_search($decode[0]["country"], $codes);
  $responseData = $list["features"][$countryKey];
  $responseData["geocodes"] = $decode;
  sendResponse("ok", $responseData);
} else {
  sendResponse("empty", "No data");
}
?>