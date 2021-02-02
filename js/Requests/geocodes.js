import {getCountries} from "./countries.js";

function getCountryFromGeocodes(lonlatObj) {
    $.ajax({
        url: "./php/geocodes.php",
        type: "POST",
        dataType: "json",
        data: {
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

function handleGeoResponse(response) {
        if(response.status.name == "ok") {
            showCountryOnMap(response.data.geometry);
            $("#search").val(response.data.properties.name).blur();
            setPopupContent(response.data.properties.name, response.data.geocodes.adminName1, response.data.geocodes.countryCode);
        } else {
            removeCountry();
            setPopupContent("", "Unavailable", false);
            getCountries("");
        }

}

export {getCountryFromGeocodes}