import {getPictureInfo} from "./pictureInfo.js";

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
    let indicators = "";
    let carouselItems = "";
    let index = 0;

    response.data.photos.photo.forEach(photo => {
        let indicator = `<button type="button" class="mx-1 ${index === 0 ? 'active' : ''}" data-bs-target="#pictures-carousel" data-bs-slide-to="${index}" aria-label="Country related picture ${index}"></button>`;
        indicators += indicator;

        let imageUrl = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_z.jpg`;
        let image = `<img src="${imageUrl}" alt="Image not available" class="img-fluid mx-auto d-block w-auto" onerror="this.src='./images/news-no-image.svg'">`;
        let heading = `<p id="country-image-heading-${index}"></p>`;
        let paragraph = `<p id="country-image-paragraph-${index}"></p>`;
        let item = `<div class="text-center h-100 carousel-item ${index === 0 ? 'active' : ''}">${image}<div class="carousel-caption position-relative bottom-0 start-0 bg-dark mb-4">${heading}${paragraph}</div></div>`;

        carouselItems += item;
        index++;
    });
    $("#pictures-indicators").empty();
    $("#pictures-indicators").html(indicators);

    $("#pictures-carousel-inner").empty();
    $("#pictures-carousel-inner").html(carouselItems);

    index = 0;
    response.data.photos.photo.forEach(photo => {
        getPictureInfo(photo.id, photo.secret, index);
        index++;
    });
}

export {getPictures};