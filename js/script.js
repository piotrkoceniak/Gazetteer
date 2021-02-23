import {getCountries} from "./Requests/countries.js";
import {getCountryFromGeocodes} from "./Requests/geocodes.js";
import {getCountryDetails} from "./Requests/details.js";
import {getWeatherDetails} from "./Requests/weather-details.js";
import {getPopulationDetails} from "./Requests/population-details.js";
import {getCurrencyDetails} from "./Requests/currency-details.js";

let location = window.navigator.geolocation;

location.getCurrentPosition(
    (pos) => {
        let latitude = Number.parseFloat(pos.coords.latitude).toFixed(2);
        let longitude = Number.parseFloat(pos.coords.longitude).toFixed(2);
        getCountryFromGeocodes({lat: latitude, lng: longitude});
        mymap.setView([latitude, longitude], 10.0);
    }
);



console.log("Script loaded");
getCountries("");

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


// search events
$("#search").on("change", function (e) {
    getCountries(e.target.value);
});

$("#search-icon").click(function() {
    $("#search").triggerHandler("keypress", true);
});


mymap.on("click", (e) => {
    getCountryFromGeocodes(e.latlng);
	detailsPopup.setLatLng(e.latlng).openOn(mymap);
});

// opening buttons
$("#mapid").on("click", "#details-button", function(e) {
    getCountryDetails($("#details-button").attr("data-country"));
    $('#details-modal').modal({backdrop: 'static', show: true});
});

$("#details").on("click", "#weather-button", function(e) {
    getWeatherDetails($("#weather-button").attr("data-city-lon"), $("#weather-button").attr("data-city-lat"));
    $("#details-weather").show();
});

$("#details").on("click", "#population-button", function(e) {
    getPopulationDetails($("#population-button").attr("data-country"));
    $("#details-population").show();
});

$("#details").on("click", "#currency-button", function(e) {
    getCurrencyDetails($("#currency-button").attr("data-country"), $("#currency-button").attr("data-currency"));
    $("#details-currency").show();
    $("#details-gdp").show();
});
