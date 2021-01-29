function getCountries(dataObj) {
    $.ajax({
        url: "php/countries.php",
        type: "POST",
        dataType: "json",
        data: {
            country: dataObj
        },
        success: handleCountryResponse,
        error: function(jqXHR, textStatus, errorThrown) {
            console.log("Bad request: " + textStatus);
            console.log(errorThrown);
            console.log(jqXHR);
        }
    });
}

function setOptionsInDatalist(namesObj) {
    let optionsArray = [];
    for(const key in namesObj) {
        let htmlOption = `<option value='${namesObj[key]}'>${namesObj[key]}</option>`;
        optionsArray.push(htmlOption);
    }
    return optionsArray;
}

function handleCountryResponse(response) {
        if(response.status.name == "ok") {
            showCountryOnMap(response.data.geometry);
            mymap.fitBounds(countryPolygon.getBounds());
            $("#search").val(response.data.properties.name).blur();
        } else {
            $("#countries").empty().append(setOptionsInDatalist(response.data));
        }
}



export {getCountries, handleCountryResponse}