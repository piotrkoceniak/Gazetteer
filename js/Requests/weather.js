function getWeather(capitalName) {
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
    let time = new Date(response.data.dt * 1000);
    let iconUrl = `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;
    let content = `<img src=${iconUrl} alt="Weather icon"> ${response.data.weather[0].description}, ${response.data.main.temp} &#8451; (data time: ${time.toLocaleTimeString()})`;
    content += `<button id="weather-button" data-city-lon=${response.data.coord.lon} data-city-lat=${response.data.coord.lat}>Show More</button>`;
    $("#c-current-weather").html(content);

    if($("#details-weather").is(":visible")) {
        $("#weather-button").trigger("click");
    }
}



export {getWeather};