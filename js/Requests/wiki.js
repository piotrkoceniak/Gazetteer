function getWiki(country, capital) {
    $.ajax({
        url: "php/wiki.php",
        type: "POST",
        dataType: "json",
        data: {
            country: encodeURI(country + " "),
            capital: encodeURI(capital + " ")
        },
        success: handleWikiResponse,
        error: function(jqXHR, textStatus, errorThrown) {
            console.log("Bad request: " + textStatus);
            console.log(errorThrown);
            console.log(jqXHR);
        }
    });
}

function handleWikiResponse(response) {
    $("#c-wiki").empty();
    
    $("#c-wiki").append(`<li><p>${response.data.country.geonames[0].summary}</p><p><a href=${"http://" + response.data.country.geonames[0].wikipediaUrl} target="_blank">Wikipedia</a></p></li>`);
    $("#c-wiki").append(`<li><p>${response.data.country.geonames[1].summary}</p><p><a href=${"http://" + response.data.country.geonames[1].wikipediaUrl} target="_blank">Wikipedia</a></p></li>`);
    $("#c-wiki").append(`<li><p>${response.data.capital.geonames[0].summary}</p><p><a href=${"http://" + response.data.capital.geonames[0].wikipediaUrl} target="_blank">Wikipedia</a></p></li>`);
}


export {getWiki};