function getPictures(countryName) {
    $.ajax({
        url: "./php/pictures.php",
        type: "POST",
        dataType: "json",
        data: {
            country: encodeURI(countryName)
        },
        success: handlePicturesResponse,
        error: function(jqXHR, textStatus, errorThrown) {
            console.log("Bad request: " + textStatus);
            console.log(errorThrown);
            console.log(jqXHR);
        }
    });
}

function handlePicturesResponse(response) {
    console.log(response);
    $("#pictures-indicators").empty();
    $("#pictures-carousel-inner").empty();
    /*let indicators = "";
    let carouselItems = "";
    let index = 0;

    response.data.articles.forEach(article => {
        let indicator = `<button type="button" data-bs-target="#pictures-carousel" data-bs-slide-to="${index}" aria-label="News ${index}" ${index === 0 ? 'class="active"' : ''}></button>`;
    
        indicators += indicator;

        let image = `<img src="${article.urlToImage === null ? "./images/news-no-image.svg" : article.urlToImage}" alt="News image not available" class="d-block w-100">`;
        let heading = `<p>${article.title}</p>`;
        let paragraph = `<p>Author: ${article.author ? article.author : 'Not specified'}, Source: <a href="${article.url}">${article.source.name}</a></p>`;
        let item = `<div class="carousel-item ${index === 0 ? 'active' : ''}">${image}<div class="carousel-caption position-relative bottom-0 start-0 bg-dark mb-4">${heading}${paragraph}</div></div>`;

        carouselItems += item;
        index++;
    });
    $("#pictures-indicators").html(indicators);
    $("#pictures-carousel-inner").html(carouselItems);*/
}

export {getPictures};