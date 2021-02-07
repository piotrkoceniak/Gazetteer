function getCurrencyDetails(countryCode) {
    $.ajax({
        url: "php/currency.php",
        type: "POST",
        dataType: "json",
        data: {
            country: countryCode
        },
        success: handleCurrencyResponse,
        error: function(jqXHR, textStatus, errorThrown) {
            console.log("Bad request: " + textStatus);
            console.log(errorThrown);
            console.log(jqXHR);
        }
    });
    
    $.ajax({
        url: "php/gdp.php",
        type: "POST",
        dataType: "json",
        data: {
            country: countryCode
        },
        success: handleGDPResponse,
        error: function(jqXHR, textStatus, errorThrown) {
            console.log("Bad request: " + textStatus);
            console.log(errorThrown);
            console.log(jqXHR);
        }
    });
    
}

function handleCurrencyResponse(response) {
    console.log("currency");
    console.log(response);
}

function handleGDPResponse(response) {
    console.log("gdp");
    console.log(reposnse);
}



export {getCurrencyDetails};