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

    $("#news-indicators").empty();
    $("#news-carousel-inner").empty();
    let indicators = "";
    let carouselItems = "";
    let index = 0;

    response.data.articles.forEach(article => {
        let indicator = `<button type="button" class="mx-1 ${index === 0 ? 'active' : ''}" data-bs-target="#news-carousel" data-bs-slide-to="${index}" aria-label="News ${index}"></button>`;
    
        indicators += indicator;
        let imageUrl = article.urlToImage === null ? "./images/news-no-image.svg" : article.urlToImage;
        imageUrl = imageUrl.split(',');

        let image = `<img src="${imageUrl[0]}" alt="News image not available" class="img-fluid mx-auto d-block w-auto" onerror="this.src='./images/news-no-image.svg'">`;
        let heading = `<p>${article.title}</p>`;
        let paragraph = `<p>Author: ${article.author ? article.author : 'Not specified'}, Source: <a href="${article.url}">${article.source.name}</a></p>`;
        let item = `<div class="text-center h-100 carousel-item ${index === 0 ? 'active' : ''}">${image}<div class="carousel-caption position-relative bottom-0 start-0 bg-dark mb-4">${heading}${paragraph}</div></div>`;

        carouselItems += item;
        index++;
    });
    $("#news-indicators").html(indicators);
    $("#news-carousel-inner").html(carouselItems);
}

export {getNews};