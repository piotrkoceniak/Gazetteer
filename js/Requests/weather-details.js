function getWeatherDetails(city) {
    $.ajax({
        url: "php/weatherDetails.php",
        type: "POST",
        dataType: "json",
        data: {
            city
        },
        success: handleWeatherDetailsResponse,
        error: function(jqXHR, textStatus, errorThrown) {
            console.log("Bad request: " + textStatus);
            console.log(errorThrown);
            console.log(jqXHR);
        }
    });
}

function handleWeatherDetailsResponse(response) {
    console.log(response);
}

export {getWeatherDetails};