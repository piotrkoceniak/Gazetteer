function getCountries(dataObj, successFuntion) {
    $.ajax({
        url: "php/countries.php",
        type: "POST",
        dataType: "json",
        data: {
            country: dataObj
        },
        success: successFuntion ,
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
    console.log(response);

        if(response.status.name == "ok") {
            //showCountryOnMap(response.data.geometry.coordinates);
            showCountryOnMap(response.data.geometry);
            $("#search").val(response.data.properties.name).blur();
        } else if(response.status.name == "hints") {
            $("#countries").empty().append(setOptionsInDatalist(response.data));
        } else if(response.status.name == "empty") {
            $("#countries").empty().append(setOptionsInDatalist(response.data));
        }
}

export {getCountries, setOptionsInDatalist, handleCountryResponse}