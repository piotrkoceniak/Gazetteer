<?php
    function sendResponse($status, $data) {
        $output['status']['code'] = "200";
        $output['status']['name'] = $status;
        $output['data'] = $data;
    
        header('Content-Type: application/json; charset=UTF-8');
    
        echo json_encode($output);
    }

?>