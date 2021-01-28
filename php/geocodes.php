<?php 
include("Responses/response.php");
// TO DO !!!!!!!!!!!!!!!!!!!!!!!
$url = "http://api.openweathermap.org/geo/1.0/reverse?lat={lat}&lon={lon}&limit={limit}&appid={API key}";

$exampleResponse = array (
    0 => 
    array (
      'name' => 'City of London',
      'local_names' => 
      array (
        'ar' => 'مدينة لندن',
        'ascii' => 'City of London',
        'bg' => 'Сити',
        'ca' => 'La City',
        'de' => 'London City',
        'el' => 'Σίτι του Λονδίνου',
        'en' => 'City of London',
        'fa' => 'سیتی لندن',
        'feature_name' => 'City of London',
        'fi' => 'Lontoon City',
        'fr' => 'Cité de Londres',
        'gl' => 'Cidade de Londres',
        'he' => 'הסיטי של לונדון',
        'hi' => 'सिटी ऑफ़ लंदन',
        'id' => 'Kota London',
        'it' => 'Londra',
        'ja' => 'シティ・オブ・ロンドン',
        'la' => 'Civitas Londinium',
        'lt' => 'Londono Sitis',
        'pt' => 'Cidade de Londres',
        'ru' => 'Сити',
        'sr' => 'Сити',
        'th' => 'นครลอนดอน',
        'tr' => 'Londra Şehri',
        'vi' => 'Thành phố Luân Đôn',
        'zu' => 'Idolobha weLondon',
      ),
      'lat' => 51.5128,
      'lon' => -0.0918,
      'country' => 'GB',
    ),
    1 => 
    array (
      'name' => 'London',
      'local_names' => 
      array (
        'af' => 'Londen',
        'ar' => 'لندن',
        'ascii' => 'London',
        'az' => 'London',
        'bg' => 'Лондон',
        'ca' => 'Londres',
        'da' => 'London',
        'de' => 'London',
        'el' => 'Λονδίνο',
        'en' => 'London',
        'eu' => 'Londres',
        'fa' => 'لندن',
        'feature_name' => 'London',
        'fi' => 'Lontoo',
        'fr' => 'Londres',
        'gl' => 'Londres',
        'he' => 'לונדון',
        'hi' => 'लंदन',
        'hr' => 'London',
        'hu' => 'London',
        'id' => 'London',
        'it' => 'Londra',
        'ja' => 'ロンドン',
        'la' => 'Londinium',
        'lt' => 'Londonas',
        'mk' => 'Лондон',
        'nl' => 'Londen',
        'no' => 'London',
        'pl' => 'Londyn',
        'pt' => 'Londres',
        'ro' => 'Londra',
        'ru' => 'Лондон',
        'sk' => 'Londýn',
        'sl' => 'London',
        'sr' => 'Лондон',
        'th' => 'ลอนดอน',
        'tr' => 'Londra',
        'vi' => 'Luân Đôn',
        'zu' => 'ILondon',
      ),
      'lat' => 51.5085,
      'lon' => -0.1257,
      'country' => 'GB',
    ),
    2 => 
    array (
      'name' => 'Islington',
      'local_names' => 
      array (
        'ascii' => 'Islington',
        'az' => 'İslinqton',
        'fa' => 'ایزلینتن',
        'feature_name' => 'Islington',
        'fr' => 'District londonien d\'Islington',
        'he' => 'איזלינגטון',
        'ja' => 'イズリントン',
        'ru' => 'Ислингтон',
      ),
      'lat' => 51.5362,
      'lon' => -0.103,
      'country' => 'GB',
    ),
    3 => 
    array (
      'name' => 'Lewisham',
      'local_names' => 
      array (
        'ascii' => 'Lewisham',
        'de' => 'London Borough of Lewisham',
        'en' => 'Lewisham',
        'feature_name' => 'Lewisham',
        'fi' => 'Lewisham',
        'fr' => 'Lewisham',
        'hu' => 'Lewisham kerület',
        'nl' => 'Lewisham',
        'no' => 'Lewisham',
        'ro' => 'Lewisham',
      ),
      'lat' => 51.4535,
      'lon' => -0.018,
      'country' => 'GB',
    ),
    4 => 
    array (
      'name' => 'Islington',
      'local_names' => 
      array (
        'ascii' => 'Islington',
        'de' => 'London Borough of Islington',
        'en' => 'Islington',
        'feature_name' => 'Islington',
        'fr' => 'Islington',
        'nl' => 'Islington',
        'no' => 'Islington',
        'ro' => 'Islington',
      ),
      'lat' => 51.547,
      'lon' => -0.1094,
      'country' => 'GB',
    ),
  );

sendResponse("geo-done", $exampleResponse);
?>