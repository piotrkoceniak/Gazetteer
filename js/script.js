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

//  CHECK - TODO
mymap.on("click", (e) => {
    console.log("map event");
    console.log(e);

    getCountryFromGeocodes(e.latlng);

	detailsPopup.setLatLng(e.latlng).openOn(mymap);
});