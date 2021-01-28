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

let layer = false;
let lastLayer;
//  CHECK - TODO
mymap.on("click", (e) => {
    console.log("map event");
    console.log(e);
    if(layer) {
        console.log(layer);
        if(layer === lastLayer) {
            console.log("same layer");
            layer = false;
            getCountryFromGeocodes(e.latlng, "same")
        } else {
            lastLayer = layer;
            layer = false;
            console.log("new layer");
            getCountryFromGeocodes(e.latlng, "new");
        }
    } else {
        console.log("no layer");
        getCountryFromGeocodes(e.latlng, "empty");
    }
	detailsPopup.setLatLng(e.latlng).setContent(detailsPopupContent).openOn(mymap);
});

countryPolygon.on("click", function(e) {
    layer = e.layer;
});