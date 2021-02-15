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
            $(`#search option[attr="selected"]`).prop("selected", false);
            $(`#search option[value=${response.data["properties"]["iso_a2"]}`).prop("selected", true);
            setPopupContent(response.data.properties.name, response.data.geocodes.adminName1, response.data.geocodes.countryCode);
        } else {
            removeCountry();
            setPopupContent("", "Unavailable", false);
            $(`#search option[attr="selected"]`).prop("selected", false);
            $(`#search option[value=""]`).prop("selected", true);
        }

}

export {getCountryFromGeocodes}