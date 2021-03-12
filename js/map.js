// setting up map in #mapid
var mymap = L.map('mapid', {zoomControl: false}).setView([45.00, 0.00], 2.5);

// adding layer topographical
var topoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
    maxZoom: 17,
});

var mapnikMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mymap);
/*
var stadiaMap = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png', {
	maxZoom: 20,
	attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
});

var stadiaMap2 = L.tileLayer('https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png', {
	maxZoom: 20,
	attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
});
*/

// adding control
L.control.layers({"OpenTopoMap": topoMap, "OpenSteetMap": mapnikMap, /*"Stadia - smooth": stadiaMap, "Stadia - outdoors": stadiaMap2*/}, null, {position: "bottomright"}).addTo(mymap);
L.control.zoom({position: "bottomleft"}).addTo(mymap);
L.control.scale({position: "bottomleft"}).addTo(mymap);

// setting up popups - details
var detailsPopup = L.popup();
var detailsPopupContent = "<div id='popup-content'>Unable to fetch data.</div>";

// adding country polygon to map
var countryPolygon = L.geoJSON(null, {style: {color: 'black', weight: 1, opacity: 0.3, fillOpacity: 0.2}});
// binding popup to geojson layer
countryPolygon.bindPopup(detailsPopup);
function showCountryOnMap(points, latlngObj = null) {
	countryPolygon.clearLayers().addData(points).addTo(mymap);
	if(latlngObj === null) {
		countryPolygon.openPopup();
	} else {
		countryPolygon.openPopup(latlngObj);
	}
}

// removing popup and polygon
function removeCountry() {
	countryPolygon.clearLayers();
	countryPolygon.closePopup();
}

// setting popup content
function setPopupContent(countryName, locationName, countryCode) {
	detailsPopup.setContent("");
	let table = `<table id="popup-table" class="table table-striped table-hover">
		<tr>
			<th>Country:</th>
			<td>${countryName}</td>
		</tr>
		<tr>
			<th>Region:</th>
			<td>${locationName}</td>
		</tr></table>`;
	let image = countryCode ? `<img id="popup-country-flag" src="https://www.countryflags.io/${countryCode.toLowerCase()}/flat/64.png">` : '<img id="popup-country-flag" src="">';
	let detailsButton = `<button id="details-button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#details-modal" data-country=${countryCode}>Details</button>`;
	
	detailsPopupContent = `<div id='popup-content'>${table}${image} ${detailsButton}</div>`;
	detailsPopup.setContent(detailsPopupContent);
}

var cityMarkers = L.markerClusterGroup({
	showCoverageOnHover: false,
	zoomToBoundsOnClick: false
});

var POIsMarkers = L.markerClusterGroup({
	showCoverageOnHover: false,
	zoomToBoundsOnClick: false
});

