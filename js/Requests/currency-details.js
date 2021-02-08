function getCurrencyDetails(countryCode, currencyCode) {
    $.ajax({
        url: "php/currency.php",
        type: "POST",
        dataType: "json",
        data: {
            currency: currencyCode
        },
        success: function(response) {
            handleCurrencyResponse(response, this.currencyCode)
        },
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

function handleCurrencyResponse(response, currency) {
    console.log("currency");
    console.log(response);
    let rows = `<tr><th>Currency Code</th><td>${currency}</td></tr>`;
    rows += `<tr><th>Currency Name</th><td>${response.data.currencyFullName}</td></tr>`;
    rows += `<tr><th>Current exchange rate (data updated every hour)</th><td>${response.data.rates[currency]} (base: US Dollar)</td></tr>`;
    let table = `<table>${rows}</table>`;
    $("#details-currency-content").empty().append(table);
}

function handleGDPResponse(response) {
    console.log("gdp");
    console.log(response);
}



export {getCurrencyDetails};