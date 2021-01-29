function getCountryDetails(countryCode) {
    $.ajax({
        url: "php/details.php",
        type: "POST",
        dataType: "json",
        data: {
            country: countryCode
        },
        success: handleDetailsResponse,
        error: function(jqXHR, textStatus, errorThrown) {
            console.log("Bad request: " + textStatus);
            console.log(errorThrown);
            console.log(jqXHR);
        }
    });
}

function handleDetailsResponse(response) {
    console.log(response);
}


export {getCountryDetails};