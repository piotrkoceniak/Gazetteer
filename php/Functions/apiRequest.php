<?php
    function sendRequest($url) {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_URL,$url);
    
        $result=curl_exec($ch);
    
        curl_close($ch);
    
        $response = json_decode($result,true);

        return($response);
    }


?>