import {getCountries, handleCountryResponse} from "./countries.js";

function getCountryFromGeocodes(lonlatObj, lastClicked) {
    console.log("Requesting");
    $.ajax({
        url: "./php/geocodes.php",
        type: "POST",
        dataType: "json",
        data: {
            lastSelected: lastClicked,
            lng: lonlatObj.lng,
            lat: lonlatObj.lat
        },
        success: handleGeoResponse,
        error: function(jqXHR, textStatus, errorThrown) {
            console.log("Bad request: " + textStatus);
            console.log(errorThrown);
            console.log(jqXHR);
        }
    });
}
// TODO!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
function handleGeoResponse(response) {
        if(response.status.name == "ok") {
            showCountryOnMap(response.data.geometry);
            $("#search").val(response.data.properties.name).blur();
            setPopupContent(response.data.properties.name, response.data.geocodes[0].name, response.data.geocodes[0].country);
        } else {
            removeCountry();
            setPopupContent("", "Unavailable", false);
            getCountries("");
        }

        // Create thing below
        //getCountryDetails(response.data[0].country, true);
        console.log("Geo Response is:");
        console.log(response);
}

export {getCountryFromGeocodes}