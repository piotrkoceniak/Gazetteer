import {getCountries} from "./Requests/countries.js";
import {getCountryFromGeocodes} from "./Requests/geocodes.js";
import {getCountryDetails} from "./Requests/details.js";
import {getWeatherDetails} from "./Requests/weather-details.js";
import {getPopulationDetails} from "./Requests/population-details.js";
import {getCurrencyDetails} from "./Requests/currency-details.js";
import {setPOIsMarkers} from "./Requests/POIs.js";

console.log("Script loaded");

// centering map on users location if user's browser allows it
let location = window.navigator.geolocation;

location.getCurrentPosition(
    function(pos) {
        let latitude = Number.parseFloat(pos.coords.latitude).toFixed(2);
        let longitude = Number.parseFloat(pos.coords.longitude).toFixed(2);
        getCountryFromGeocodes({lat: latitude, lng: longitude});
        mymap.setView([latitude, longitude], 10.0);
    }
);


// setting countries list in select
getCountries("");

// setting markers on map if map is zoomed enouch
mymap.on('zoomstart', function() {
    let zoomLevel = mymap.getZoom();
    if(zoomLevel >= 15) {
        let latLng = mymap.getCenter();
        setPOIsMarkers(latLng);
    } else {
        POIsMarkers.clearLayers();
    }
});

$("#details-weather").hide();
$("#details-population").hide();
$("#details-currency").hide();

$("#weather-close-button").click(function() {
    $("#details-weather").hide();
});
$("#population-close-button").click(function() {
    $("#details-population").hide();
});
$("#currency-close-button").click(function() {
    $("#details-currency").hide();
});


// select change event - getting and setting country on map
$("#search").on("change", function (e) {
    getCountries(e.target.value);
});

// opening popup on click - getting country and region from geocodes and setting it up on map and pop up
mymap.on("click", (e) => {
    getCountryFromGeocodes(e.latlng);
	detailsPopup.setLatLng(e.latlng).openOn(mymap);
});

// opening modal - getting country details and setting data in modal
$("#mapid").on("click", "#details-button", function(e) {
    getCountryDetails($("#details-button").attr("data-country"));
    $('#details-modal').modal({backdrop: 'static', show: true});
});

// in modal - getting and setting weather details for country's capital
$("#details").on("click", "#weather-button", function(e) {
    getWeatherDetails($("#weather-button").attr("data-city-lon"), $("#weather-button").attr("data-city-lat"));
    $("#details-weather").show();
});

// in modal - getting and setting population details for country
$("#details").on("click", "#population-button", function(e) {
    getPopulationDetails($("#population-button").attr("data-country"));
    $("#details-population").show();
});

// in modal - getting and setting currency exchange rates and gdp for a country
$("#details").on("click", "#currency-button", function(e) {
    getCurrencyDetails($("#currency-button").attr("data-country"), $("#currency-button").attr("data-currency"));
    $("#details-currency").show();
    $("#details-gdp").show();
});
