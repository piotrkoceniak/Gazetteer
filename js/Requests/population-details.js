function getPopulationDetails(countryCode) {
    $.ajax({
        url: "php/populationDetails.php",
        type: "POST",
        dataType: "json",
        data: {
            country: countryCode
        },
        success: handlePopulationDetailsResponse,
        error: function(jqXHR, textStatus, errorThrown) {
            console.log("Bad request: " + textStatus);
            console.log(errorThrown);
            console.log(jqXHR);
        }
    });
}

function handlePopulationDetailsResponse(response) {
    console.log(response);
}