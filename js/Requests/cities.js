function setCityMarkers(countryCode) {
    $.ajax({
        url: "./php/cityMarkers.php",
        type: "POST",
        dataType: "json",
        data: {
            country: countryCode
        },
        success: handleCitiesResponse,
        error: function(jqXHR, textStatus, errorThrown) {
            console.log("Bad request: " + textStatus);
            console.log(errorThrown);
            console.log(jqXHR);
        }
    });
}

function handleCitiesResponse(response) {
    markers.clearLayers();
    response.data.cities.forEach(city => {
        const marker = L.marker([city.lat, city.lng]);
        let populationString = formatPopulation(city.population.toString());

        marker.bindTooltip(`City: ${city.name}<br/>Population: ${populationString}`);
        markers.addLayer(marker);
    });
    mymap.addLayer(markers);
}

function formatPopulation(population) {
    let start = population.length % 3;
    let string = population[0];

    for(let i = 1; i < population.length; i++) {
        let spaceIndex = (3 - i) + start;
        if(spaceIndex % 3 === 0) {
            string += " ";
        }
        string += population[i];
    }
    return string;
}


export {setCityMarkers};