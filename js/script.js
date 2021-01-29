import {getCountries} from "./Requests/countries.js";
import {getCountryFromGeocodes} from "./Requests/geocodes.js";
//import {getCountryDetails} from "./Requests/details.js";

console.log("Script loaded");
getCountries("");

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
    console.log(e.latlng);
    getCountryFromGeocodes(e.latlng);

	detailsPopup.setLatLng(e.latlng).openOn(mymap);
});

$("#details-button").click(function(e) {
    //getCountryDetails(e.target.attr("data-country"));
});