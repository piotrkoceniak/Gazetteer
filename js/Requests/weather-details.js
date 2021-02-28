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
    setCurrent(response);
    setForecast(response);
    setHistory(response);
    $("#details-weather-content").show();
    $("#details-weather-content > div").show();
}

function setHistory(response) {
  $("#details-weather-history").append("<div class='margin-top-bottom'><div id='temperature-history' class='center-chart'></div></div>");
  $("#details-weather-history").append("<div class='margin-top-bottom'><div id='rain-history' class='center-chart'></div></div>");

  chart('temperature-history', response.data.historical.hourly, ["temp", "feels_like"], ["Temperature (celsius)", "Feels like (celsius)"], "Temperature and feels like in last 24 hours.");
  chart('rain-history', response.data.historical.hourly, ["rain", "snow"], ["Rain (mm)", "Snow (mm)"], "Rainfall and snowfall in last 24 hours.");
}

function setForecast(response) {
  $("#details-weather-forecast").empty();
  $("#details-weather-forecast").append("<h4>Next hour</h4>");
  $("#details-weather-forecast").append("<div id='forecast-hour' class='background-5 margin-left margin-top-bottom'></div>");
  $("#details-weather-forecast").append("<h4>Next 48 hours</h4>");
  $("#details-weather-forecast").append("<div id='forecast-2days' class='background-5 margin-left margin-top-bottom'></div>");
  $("#details-weather-forecast").append("<h4>Next week</h4>");
  $("#details-weather-forecast").append("<div id='forecast-week' class='margin-left margin-top-bottom'></div>");

  createHourChart(response.data.forecast.minutely);
  create48Chart(response.data.forecast.hourly);
  createWeekDays(response.data.forecast.daily, response.data.forecast.timezone_offset);
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
    
    let table = `<table class="table table-striped table-hover">${rows}</table>`;
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

function createHourChart(data) {
  if(data != undefined) {
    $("#forecast-hour").empty().append("<div id='hour-chart' class='center-chart'><div>");
    chart("hour-chart", data, ["precipitation"], ["Precipitation volume (mm)"], "Precipitation in next 60 minutes.");
  } else {
    $("#forecast-hour").html("Forecast unavailable.");
  }
}

function create48Chart(data) {
  if(data != undefined) {
    //`Time, Temperature (celsius), Feels like (celsius), Pressure (hPa), Humidity (%), Cloudiness (%), Rain/Snow (mm)\n`;
    $("#forecast-2days").empty();
    $("#forecast-2days").append("<div id='temperature-2days' class='center-chart'></div>");
    $("#forecast-2days").append("<div id='pressure-2days' class='center-chart'></div>");
    $("#forecast-2days").append("<div id='humidity-2days' class='center-chart'></div>");
    $("#forecast-2days").append("<div id='cloudiness-2days' class='center-chart'></div>");
    $("#forecast-2days").append("<div id='rain-2days' class='center-chart'></div>");
    
    chart('temperature-2days', data,["temp", "feels_like"], ["Temperature (celsius)", "Feels like (celsius)"], "Temperature and feels like in next 48 hours.");
    chart('pressure-2days', data, ["pressure"], ["Pressure (hPa)"], "Pressure in next 48 hours.");
    chart('humidity-2days', data, ["humidity"], ["Humidity (%)"], "Humidity in next 48 hours.");
    chart('cloudiness-2days', data, ["clouds"], ["Cloudiness (%)"], "Cloudiness in next 48 hours.");
    chart('rain-2days', data, ["rain", "snow"], ["Rain (mm)", "Snow (mm)"], "Rainfall and snowfall in next 48 hours.");
    
  } else {
    $("#forecast-2days").html("Forecast unavailable.");
  }
}

function createWeekDays(data, time_Offset) {
  let div = $("#forecast-week").empty();
  var weekday = new Array(7);
  weekday[0] = "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";

  data.forEach(function(day, index) {
    let rows = "";

    // time - timezone, sunrise, sunset
    let timeOffset = time_Offset;
    let sunrise = new Date((day.sunrise + timeOffset) * 1000);
    let sunset = new Date((day.sunset + timeOffset) * 1000);
  
    rows += `<tr><th>Sunrise</th><td>${sunrise.toLocaleTimeString()} local time</td></tr>`;
    rows += `<tr><th>Sunset</th><td>${sunset.toLocaleTimeString()} local time</td></tr>`;
    
    // temperature - current, feels like
    rows += `<tr><th>Max temperature</th><td>${day.temp.max}&nbsp;&#8451;</td></tr>`;
    rows += `<tr><th>Feels like</th><td>${day.feels_like.day}&nbsp;&#8451;</td></tr>`;
    rows += `<tr><th>Humidity</th><td>${day.humidity}&nbsp;%</td></tr>`;
    rows += `<tr><th>Atmospheric pressure (on sea level)</th><td>${day.pressure}&nbsp;hPa</td></tr>`;

    // wind
    let windSpeed = (day.wind_speed / 1000) * (60 * 60);

    rows += `<tr><th>Wind speed</th><td>${windSpeed.toFixed(2)}&nbsp;km/h</td></tr>`;
    rows += `<tr><th>Wind direction</th><td>${windDirection(day.wind_deg)}</td></tr>`;

    // clouds, rain or snow
    rows += `<tr><th>Cloudiness</th><td>${day.clouds}&nbsp;%</td></tr>`;
    rows += `<tr><th>Clouds</th><td><img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon">${day.weather[0].description}</td></tr>`;
    if(day.snow) {
        rows += `<tr><th>Snow</th><td>${day.snow}&nbsp;mm</td></tr>`;
    } else if(day.rain) {
        rows += `<tr><th>Rain</th><td>${day.rain}&nbsp;mm</td></tr>`;
    }

    rows += `<tr><th>Ultraviolet radiation index</th><td>${day.uvi}</td></tr>`;
    
    let dataTime = new Date(day.dt * 1000);
    let table = `<div id="forecast-week-${index}" class='background-5 padding-left'><h5>${weekday[dataTime.getDay()]}</h5><table class="table table-striped table-hover background-6">${rows}</table></div>`;
    div.append(table);
  });
}

function chart(id, data, keys, labels, title) {
  let dataAsCSV = `Time`;
  labels.forEach(function (label) {
    dataAsCSV += ", " + label;
  });
  dataAsCSV += "\n";
    
  data.forEach(function(object) {
    let time = new Date(object.dt * 1000);
    let string = `${time.toISOString()}`
    
    keys.forEach(function (key) {
      if(key === "rain" || key === "snow") {
        string += `,${object[key] != undefined ? object[key]["1h"] : 0}`;
      } else {
        string += `,${object[key] != undefined ? object[key] : 0}`;
      }
    });
    string += "\n";
    
    dataAsCSV += string;
  });
  let options = {
    title: title,
    xlabel: 'Time',
    ylabel: labels[0],
    y2label: labels[1] || null,
  };

  const graph = new Dygraph(document.getElementById(`${id}`), dataAsCSV, options);
}

export {getWeatherDetails};