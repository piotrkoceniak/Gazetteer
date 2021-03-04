import {getWeather} from "./weather.js";
import {getWiki} from "./wiki.js";

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
    
    $("#c-name").html("Details - " + response.data.details.countryName);
    $("#full-c-name").html(response.data.fullName);
    $("#c-population").html(formatPopulation(response.data.details.population) + ` <a id="population-button" class="btn btn-info btn-sm" role="button" href="#details-population" data-country=${response.data.details.countryCode.toLowerCase()} >Show More</a>`);
    $("#c-area").html(formatArea(response.data.details.areaInSqKm));
    $("#c-currency").html(response.data.details.currencyCode + ` <a id="currency-button" class="btn btn-info btn-sm" role="button" href="#details-currency" data-country=${response.data.details.countryCode.toLowerCase()} data-currency=${response.data.details.currencyCode} >Show More</a>`);
    $("#c-neighbours").html(formatString(response, "neighbours") || "No land boundaries.");
    $("#c-continent").html(response.data.details.continentName);
    $("#c-capital").html(response.data.details.capital);
    $("#c-cities").html(formatString(response, "cities"));
    $("#c-postal-code").html(response.data.details.postalCodeFormat);
    
    
    getWeather(response.data.details.capital);
    getWiki(response.data.details.countryName, response.data.details.capital);

    if($("#details-population").is(":visible")) {
        $("#population-button").trigger("click");
    }
    if($("#details-currency").is(":visible")) {
        $("#currency-button").trigger("click");
    }

}

function formatString(response, key) {
    let string = "";
    if(key == "cities") {
        let i = 0;
        response.data[key].forEach(element => {
            if(i < 5) {
                string += string ? (", " + element.name) : element.name;
            }
            i++;
        });
    } else {
        response.data[key].forEach(element => {
            string += string ? (", " + element.name) : element.name;
        });
    }
    
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