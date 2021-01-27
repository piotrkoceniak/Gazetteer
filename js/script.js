import {getCountries, handleCountryResponse, setOptionsInDatalist} from "./Requests/countries.js";

console.log("Script loaded");

$("#search").on("input", function (e) {
    getCountries(e.target.value, function(response) {
        handleCountryResponse(response);
    });
});

$("#search").on("keypress", function (e, submit) {
    if(e.which == 13 || submit) {
        getCountries($("#search").val() , function(response) {
            handleCountryResponse(response);
        });
    }
});