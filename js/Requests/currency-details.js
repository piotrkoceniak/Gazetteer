function getCurrencyDetails(countryCode, currencyCode) {
    $.ajax({
        url: "php/currency.php",
        type: "POST",
        dataType: "json",
        currencyCode,
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
    let rows = `<tr><th>Currency Code</th><td>${currency}</td></tr>`;
    rows += `<tr><th>Currency Name</th><td>${response.data.currencyFullName}</td></tr>`;
    rows += `<tr><th>Current exchange rate (data updated every hour)</th><td>${response.data.rates[currency]} (price for 1 US Dollar)</td></tr>`;
    let table = `<table class="table table-striped table-hover">${rows}</table>`;
    $("#details-currency-content").empty().append(table).append(`<p>Exchange rates by: <a href='https://openexchangerates.org/license' target='_blank'>openexchange.org</a></p>`);
}

function handleGDPResponse(response) {
    $("#currency-gdp-content").empty().append("<div id='gdp-chart' class='center-chart'></div>");
    if(response.data[1] !== null) {
        let dataAsCSV = "";
        response.data[1].forEach(function(year) {  
            let string = "";
            if(year.value) {
                string = `${year.date}, ${year.value}\n`;
            }
            dataAsCSV = string + dataAsCSV;
        });
        dataAsCSV = `Year, GDP in US Dollar\n` + dataAsCSV;

        const options = {
            labelsKMB: true,
            plotter: barChartPlotter,
        };

        const graph = new Dygraph(document.getElementById(`gdp-chart`), dataAsCSV, options);
    } else {
        $("#currency-gdp-content").append("<p>GDP data unavailable.</p>");
    }
}



export {getCurrencyDetails};




   // Darken a color
   function darkenColor(colorStr) {
    // Defined in dygraph-utils.js
    var color = Dygraph.toRGB_(colorStr);
    color.r = Math.floor((255 + color.r) / 2);
    color.g = Math.floor((255 + color.g) / 2);
    color.b = Math.floor((255 + color.b) / 2);
    return 'rgb(' + color.r + ',' + color.g + ',' + color.b + ')';
  }

  // This function draws bars for a single series. See
  // multiColumnBarPlotter below for a plotter which can draw multi-series
  // bar charts.
  function barChartPlotter(e) {
    var ctx = e.drawingContext;
    var points = e.points;
    var y_bottom = e.dygraph.toDomYCoord(0);

    ctx.fillStyle = darkenColor(e.color);

    // Find the minimum separation between x-values.
    // This determines the bar width.
    var min_sep = Infinity;
    for (var i = 1; i < points.length; i++) {
      var sep = points[i].canvasx - points[i - 1].canvasx;
      if (sep < min_sep) min_sep = sep;
    }
    var bar_width = Math.floor(2.0 / 3 * min_sep);

    // Do the actual plotting.
    for (var i = 0; i < points.length; i++) {
      var p = points[i];
      var center_x = p.canvasx;

      ctx.fillRect(center_x - bar_width / 2, p.canvasy,
          bar_width, y_bottom - p.canvasy);

      ctx.strokeRect(center_x - bar_width / 2, p.canvasy,
          bar_width, y_bottom - p.canvasy);
    }
  }
