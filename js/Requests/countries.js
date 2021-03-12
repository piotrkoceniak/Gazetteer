import {getCountryFromGeocodes} from './geocodes.js';

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

function setOptionsInSelect(namesArr) {
    let optionsArray = [`<option value='' selected>--- Select country ---</option>`,];
    for(const key in namesArr) {
        let htmlOption = `<option value='${namesArr[key]["code"]}'>${namesArr[key]["name"]}</option>`;
        optionsArray.push(htmlOption);
    }
    return optionsArray;
}

function handleCountryResponse(response) {
        if(response.status.name == "ok") {
            setPopupContent(response.data.properties.name, "Click on map for info.", response.data.properties.iso_a2);
            showCountryOnMap(response.data.geometry);
            mymap.fitBounds(countryPolygon.getBounds());
        } else {
            $("#search").empty().append(setOptionsInSelect(response.data));
        }
}



export {getCountries, handleCountryResponse}