// setting up map in #mapid
var mymap = L.map('mapid').setView([45.00, 0.00], 2.5);

// adding layer topographical
var topoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
    maxZoom: 17,
});

var mapnikMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});


// adding control
L.control.layers({"OpenTopoMap": topoMap, "OpenSteetMap": mapnikMap}).addTo(mymap);
L.control.scale().addTo(mymap);

// setting up popups - details
var detailsPopup = L.popup();
var detailsPopupContent = "<div id='popup-content'>Unable to fetch data.</div>";

mymap.on("click", (e) => {
	detailsPopup.setLatLng(e.latlng).setContent(detailsPopupContent).openOn(mymap);
});

// setting up capital markers
var capitalMarker = L.marker(null, {title: "Capital city."});
function showCapitalOnMap(coords) {
	capitalMarker.setLatLng(coords).addTo(mymap);
};

// adding country polygon to map
var countryPolygon = L.polygon([], {color: 'black', weight: 1, opacity: 0.3, fillOpacity: 0.2});
function showCountryOnMap(points) {
	countryPolygon.setLatLngs(points).addTo(mymap);
	mymap.fitBounds(countryPolygon.getBounds());
}

// removing marker and polygon
function removeCountry() {
	capitalMarker.remove();
	countryPolygon.remove();
}
