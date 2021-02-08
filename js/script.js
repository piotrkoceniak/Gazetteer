import {getCountries} from "./Requests/countries.js";
import {getCountryFromGeocodes} from "./Requests/geocodes.js";
import {getCountryDetails} from "./Requests/details.js";
import {getWeatherDetails} from "./Requests/weather-details.js";
import {getPopulationDetails} from "./Requests/population-details.js";
import {getCurrencyDetails} from "./Requests/currency-details.js";

console.log("Script loaded");
getCountries("");

$("#details").hide();
$("#details-content").hide();
$("#details-weather").hide();
$("#details-population").hide();
$("#details-currency").hide();

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
$("#population-close-button").click(function() {
    $("#details-population").hide();
});
$("#currency-close-button").click(function() {
    $("#details-currency").hide();
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

$("#details").on("click", "#population-button", function(e) {
    getPopulationDetails($("#population-button").attr("data-country"));
    $("#details-population").show();
});

$("#details").on("click", "#currency-button", function(e) {
    getCurrencyDetails($("#currency-button").attr("data-country"), $("#currency-button").attr("data-currency"));
    $("#details-currency").show();
    $("#details-gdp").show();
});
