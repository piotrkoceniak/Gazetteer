import {getWeather} from "./weather.js";

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
    $("#c-name").html("Details - " + response.data.details.countryName);
    $("#full-c-name").html(response.data.fullName);
    $("#c-population").html(formatPopulation(response.data.details.population));
    $("#c-area").html(formatArea(response.data.details.areaInSqKm));
    $("#c-currency").html(response.data.details.currencyCode);
    $("#c-neighbours").html(formatString(response, "neighbours") || "No borders on land.");
    $("#c-continent").html(response.data.details.continentName);
    $("#c-capital").html(response.data.details.capital);
    $("#c-cities").html(formatString(response, "cities"));
    $("#c-postal-code").html(response.data.details.postalCodeFormat);
    
    
    getWeather(response.data.details.capital);
}

function formatString(response, key) {
    let string = "";
    response.data[key].forEach(element => {
        string += string ? (", " + element.name) : element.name;
    });
    return string;
}

function formatPopulation(population) {
    let start = population.length % 3;
    let string = population[0];

    for(let i = 1; i < population.length; i++) {
        let spaceIndex = (3 - i) + start;
        if(spaceIndex % 3 === 0) {
            string += " ";
        }
        string += population[i];
    }
    return string;
}

function formatArea(area) {
    let number = parseFloat(area);
    number = number.toString();
    number = number.split(".");

    let start = number[0].length % 3;
    let string = number[0][0];

    for(let i = 1; i < number[0].length; i++) {
        let spaceIndex = (3 - i) + start;
        if(spaceIndex % 3 === 0) {
            string += " ";
        }
        string += number[0][i];
    }



    return string + "." + (number[1] || "0") + " km<sup>2</sup>";
}



export {getCountryDetails};