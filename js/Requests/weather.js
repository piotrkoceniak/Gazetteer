function getWeather(capitalName) {
    console.log("sent");

    $.ajax({
        url: "php/weather.php",
        type: "POST",
        dataType: "json",
        data: {
            capital: capitalName
        },
        success: handleWeatherResponse,
        error: function(jqXHR, textStatus, errorThrown) {
            console.log("Bad request: " + textStatus);
            console.log(errorThrown);
            console.log(jqXHR);
        }
    });
}

function handleWeatherResponse(response) {
    console.log("received");
    console.log(response);
    let iconUrl = `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;
    
}



export {getWeather};