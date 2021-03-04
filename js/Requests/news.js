function getNews(countryName) {
    $.ajax({
        url: "./php/news.php",
        type: "POST",
        dataType: "json",
        data: {
            country: encodeURI(countryName)
        },
        success: handleNewsResponse,
        error: function(jqXHR, textStatus, errorThrown) {
            console.log("Bad request: " + textStatus);
            console.log(errorThrown);
            console.log(jqXHR);
        }
    });
}

function handleNewsResponse(response) {
    console.log(response);
}



export {getNews};