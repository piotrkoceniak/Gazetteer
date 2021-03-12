import {setCityMarkers} from "./cities.js";

function getCountryFromGeocodes(latlngObj) {
    $.ajax({
        url: "./php/geocodes.php",
        type: "POST",
        dataType: "json",
        data: {
            lng: latlngObj.lng,
            lat: latlngObj.lat
        },
        success: function(response) {
            handleGeoResponse(response, latlngObj)
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log("Bad request: " + textStatus);
            console.log(errorThrown);
            console.log(jqXHR);
        }
    });
}

function handleGeoResponse(response, latlngObj) {
        if(response.status.name == "ok") {
            if($(`#search option[attr="selected"]`).val() === response.data["properties"]["iso_a2"]) {
                setPopupContent(response.data.properties.name, response.data.geocodes.adminName1, response.data.geocodes.countryCode);
                showCountryOnMap(response.data.geometry, latlngObj);
            } else {
                setPopupContent(response.data.properties.name, response.data.geocodes.adminName1, response.data.geocodes.countryCode);
                showCountryOnMap(response.data.geometry, latlngObj);
                $(`#search option[attr="selected"]`).prop("selected", false);
                $(`#search option[value=${response.data["properties"]["iso_a2"]}`).prop("selected", true);
                setCityMarkers(response.data.geocodes.countryCode);
            }
        } else {
            removeCountry();
            $(`#search option[attr="selected"]`).prop("selected", false);
            $(`#search option[value=""]`).prop("selected", true);
        }

}

export {getCountryFromGeocodes}