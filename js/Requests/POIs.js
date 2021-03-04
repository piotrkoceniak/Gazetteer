function setPOIsMarkers(latLngObj) {
    $.ajax({
        url: "./php/POIsMarkers.php",
        type: "POST",
        dataType: "json",
        data: {
            lat: latLngObj.lat,
            lng: latLngObj.lng
        },
        success: handlePOIsResponse,
        error: function(jqXHR, textStatus, errorThrown) {
            console.log("Bad request: " + textStatus);
            console.log(errorThrown);
            console.log(jqXHR);
        }
    });
}

function handlePOIsResponse(response) {
    console.log(response);
    POIsMarkers.clearLayers();
    response.data.poi.forEach(point => {
        const marker = L.marker([point.lat, point.lng]);
        let typeNameString = point.typeName.replace('_', " ");
        marker.bindTooltip(`Name: ${point.name}<br/>Type: ${typeNameString}`);
        POIsMarkers.addLayer(marker);
    });
    mymap.addLayer(POIsMarkers);
}

export {setPOIsMarkers};