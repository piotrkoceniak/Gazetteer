function getCountryFromGeocodes(lonlatObj, handleType) {
    $.ajax({
        url: "php/geocodes.php",
        type: "POST",
        dataType: "json",
        handle: handleType,
        data: {
            lng: lonlatObj.lng,
            lat: lonlatObj.lat
        },
        success: function(response) {
            handleGeoResponse(response, this.handle);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log("Bad request: " + textStatus);
            console.log(errorThrown);
            console.log(jqXHR);
        }
    });
}
// TODO!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
function handleGeoResponse(response, type) {
    if(type == "same") {
        setPopupContent(response.data.countryName, response.data[0].name, response.data[0].country.toLowerCase());
    } else if(type == "new" || type == "empty") {
        setPopupContent(response.data.countryName, response.data[0].name, response.data[0].country.toLowerCase());
        //getCountryDetails(response.data[0].country.toLowerCase(), true);
    }
    console.log(response);
}

export {getCountryFromGeocodes}