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
    cityMarkers.clearLayers();
    response.data.cities.forEach(city => {
        var cityMarker = L.icon({
            iconUrl: './images/icons/building.svg',
            iconAnchor: [0, 8],
            tooltipAnchor: [24, 4]
          });

        const marker = L.marker([city.lat, city.lng], {icon: cityMarker});
        let populationString = formatPopulation(city.population.toString());

        marker.bindTooltip(`${city.population >= 100000 ? 'City' : 'Town'}: ${city.name}<br/>Population: ${populationString}`);
        cityMarkers.addLayer(marker);
    });
    mymap.addLayer(cityMarkers);
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