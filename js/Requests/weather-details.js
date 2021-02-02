function getWeatherDetails(lon, lat) {
    $.ajax({
        url: "php/weatherDetails.php",
        type: "POST",
        dataType: "json",
        data: {
            lon,
            lat
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
    console.log("Received");
    console.log(response);
    console.log("setting");
    setCurrent(response);
    console.log("SET");
    $("#details-weather-content").show();
}

function setCurrent(response) {
    let div = $("#details-weather-current").empty();
    let rows = "";

     // time - timezone, sunrise, sunset
    let timeOffset = response.data.forecast.timezone_offset;
    let timeOffsetFromUTC = timeOffset / (60*60);
    let sunrise = new Date((response.data.forecast.current.sunrise + timeOffset) * 1000);
    let sunset = new Date((response.data.forecast.current.sunset + timeOffset) * 1000);
   
    rows += `<tr><th>Timezone</th><td>${response.data.forecast.timezone} (${timeOffset > 0 ? `+${timeOffsetFromUTC}`: `${timeOffsetFromUTC}`} from UTC)</td></tr>`;
    rows += `<tr><th>Sunrise</th><td>${sunrise.toLocaleTimeString()} local time</td></tr>`;
    rows += `<tr><th>Sunset</th><td>${sunset.toLocaleTimeString()} local time</td></tr>`;
    
    // temperature - current, feels like
    let dataTime = new Date(response.data.forecast.current.dt * 1000);

    rows += `<tr><th>Current temperature (request time: ${dataTime.toLocaleTimeString()})</th><td>${response.data.forecast.current.temp}&nbsp;&#8451;</td></tr>`;
    rows += `<tr><th>Feels like</th><td>${response.data.forecast.current.feels_like}&nbsp;&#8451;</td></tr>`;
    rows += `<tr><th>Humidity</th><td>${response.data.forecast.current.humidity}&nbsp;%</td></tr>`;
    rows += `<tr><th>Atmospheric pressure (on sea level)</th><td>${response.data.forecast.current.pressure}&nbsp;hPa</td></tr>`;

    // wind
    let windSpeed = (response.data.forecast.current.wind_speed / 1000) * (60 * 60);

    rows += `<tr><th>Wind speed</th><td>${windSpeed.toFixed(2)}&nbsp;km/h</td></tr>`;
    rows += `<tr><th>Wind direction</th><td>${windDirection(response.data.forecast.current.wind_deg)}</td></tr>`;

    // clouds, rain or snow
    rows += `<tr><th>Cloudiness</th><td>${response.data.forecast.current.clouds}&nbsp;%</td></tr>`;
    rows += `<tr><th>Clouds</th><td><img src="http://openweathermap.org/img/wn/${response.data.forecast.current.weather[0].icon}@2x.png" alt="weather icon">${response.data.forecast.current.weather[0].description}</td></tr>`;
    if(response.data.forecast.current.snow) {
        rows += `<tr><th>Snow</th><td>${response.data.forecast.current.snow['1h']}&nbsp;mm in last hour</td></tr>`;
    } else if(response.data.forecast.current.rain) {
        rows += `<tr><th>Rain</th><td>${response.data.forecast.current.rain['1h']}&nbsp;mm in last hour</td></tr>`;
    }

    rows += `<tr><th>Average visibility</th><td>${response.data.forecast.current.visibility}&nbsp;m</td></tr>`;
    rows += `<tr><th>Ultraviolet radiation index</th><td>${response.data.forecast.current.uvi}</td></tr>`;
    
    let table = `<table>${rows}</table>`;
    div.append(table);
    div.show();
}

function windDirection(degree) {
    let deg = Math.floor(degree);
    switch (true) {
        case deg >= 360 || deg <= 21:
          deg = "N";
          break;
        case deg >= 22 && deg <= 44:
          deg = "NNE";
          break;
        case deg >= 45 && deg <= 66:
          deg = "NE";
          break;
        case deg >= 67 && deg <= 89:
          deg = "ENE";
          break;
        case deg >= 90 && deg <= 111:
          deg = "E";
          break;
        case deg >= 112 && deg <= 134:
          deg = "ESE";
          break;
        case deg >= 135 && deg <= 156:
          deg = "SE";
          break;
        case deg >= 157 && deg <= 179:
          deg = "SSE";
          break;
        case deg >= 180 && deg <= 201:
          deg = "S";
          break;
        case deg >= 202 && deg <= 224:
          deg = "SSW";
          break;
        case deg >= 225 && deg <= 246:
          deg = "SW";
          break;
        case deg >= 247 && deg <= 269:
          deg = "WSW";
          break;
        case deg >= 270 && deg <= 291:
          deg = "W";
          break;
        case deg >= 292 && deg <= 314:
          deg = "WNW";
          break;
        case deg >= 315 && deg <= 336:
          deg = "NW";
          break;
        case deg >= 337 && deg <= 359:
          deg = "NNW";
          break;
        default:
          deg = "No data";
      }
    return deg;
}

export {getWeatherDetails};