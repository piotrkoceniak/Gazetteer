import {getCountries} from "./Requests/countries.js";
import {getCountryFromGeocodes} from "./Requests/geocodes.js";
import {getCountryDetails} from "./Requests/details.js";
//import {getWeather} from "./Requests/weather.js";
import {getWeatherDetails} from "./Requests/weather-details.js";

console.log("Script loaded");
getCountries("");

//$("#details, #details div").hide();

$("#details").mouseleave(function(e) {
    $("#details-content").hide();
    $("#details").click(function() {
        $("#details-content").show();
        $("#details-content").show();
    });
});
// closing buttons
$("#details-close-button").click(function() {
    $("#details").hide();
});
$("#weather-close-button").click(function() {
    $("#details-weather").hide();
});

// search events
$("#search").on("input", function (e) {
    getCountries(e.target.value);
});

$("#search").on("keypress", function (e, submit) {
    if(e.which == 13 || submit) {
        getCountries($("#search").val());
    }
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
    $("#details").show();
    $("#details-content").show();
    getCountryDetails($("#details-button").attr("data-country"));
});

$("#details").on("click", "#weather-button", function(e) {
    getWeatherDetails($("#weather-button").attr("data-city-lon"), $("#weather-button").attr("data-city-lat"));
    $("#details-weather").show();
});