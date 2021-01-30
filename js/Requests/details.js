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
    console.log("Received");
    console.log(response);

    $("#c-name").html("Details - " + response.data.details.countryName);
    $("#full-c-name").html(response.data.fullName);
    $("#c-population").html(response.data.details.population);
    $("#c-area").html(response.data.details.areaInSqKm + " km<sup>2</sup>");
    $("#c-currency").html(response.data.details.currencyCode);
    $("#c-neighbours").html(returnAsString(response, "neighbours"));
    $("#c-continent").html(response.data.details.continentName);
    $("#c-capital").html(response.data.details.capital);
    //$("#c-current-weather").html(response);
    $("#c-cities").html(returnAsString(response, "cities"));
    $("#c-postal-code").html(response.data.details.postalCodeFormat);
    console.log("Applied"); 
}

function returnAsString(response, key) {
    let string = "";
    response.data[key].forEach(element => {
        string += string ? (", " + element.name) : element.name;
    });
    return string;
}


export {getCountryDetails};