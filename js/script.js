import {getCountries} from "./Requests/countries.js";
import {getCountryFromGeocodes} from "./Requests/geocodes.js";

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

var clickedCoutry = "";
//  CHECK - TODO
mymap.on("click", (e) => {
    console.log("map event");
    console.log(e.latlng);
    getCountryFromGeocodes(e.latlng, clickedCoutry);

	detailsPopup.setLatLng(e.latlng).openOn(mymap);
});