<?php
function test($toPrint) {
    $file = fopen("text.txt", "w");
    fwrite($file, json_encode($toPrint));
    fclose($file);
}

?>