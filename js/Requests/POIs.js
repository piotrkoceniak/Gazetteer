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
        var POIMarker = L.icon({
            iconUrl: switchIconUrls(point.typeClass, point.typeName),
            iconAnchor: [0, 8],
            tooltipAnchor: [24, 4]
          });


        const marker = L.marker([point.lat, point.lng], {icon: POIMarker});
        let typeNameString = point.typeName.replaceAll('_', " ");
        marker.bindTooltip(`Name: ${point.name}<br/>Type: ${typeNameString}`);
        POIsMarkers.addLayer(marker);
    });
    mymap.addLayer(POIsMarkers);
}

function switchIconUrls(typeClass, typeName) {
    let iconUrl = './images/icons/';
    switch(typeClass) {
        case 'amenity':
            if(typeName === 'bicycle_rental') {
                return iconUrl + 'bicycle.svg';
            } else {
                return iconUrl + 'arrow-down-square.svg';
            }
        case 'railway':
            return iconUrl + 'train.svg';
        case 'tourism':
            if(typeName === 'hotel') {
                return iconUrl + 'house-fill.svg';
            } else {
                return iconUrl + 'info-square.svg';
            }
        case 'shop':
            return iconUrl + 'cart3.svg';
        default:
            return './css/Leaflet/images/marker-icon.png';
    }
}

export {setPOIsMarkers};