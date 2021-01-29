<?php
    include("../test.php");

    function sendResponse($status, $data) {
        $output['status']['code'] = "200";
        $output['status']['name'] = $status;
        $output['data'] = $data;
    
        header('Content-Type: application/json; charset=UTF-8');
        
        test($output);
        echo json_encode($output);
    }

?>