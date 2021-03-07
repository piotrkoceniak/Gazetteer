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
    console.log(response);
    $("#pictures-indicators").empty();
    $("#pictures-carousel-inner").empty();
    let indicators = "";
    let carouselItems = "";
    let index = 0;

    response.data.photos.photo.forEach(photo => {
        let indicator = `<button type="button" data-bs-target="#pictures-carousel" data-bs-slide-to="${index}" aria-label="Country related picture ${index}" ${index === 0 ? 'class="active"' : ''}></button>`;
    
        indicators += indicator;

        let imageUrl = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_z.jpg`;
        let image = `<img src="${imageUrl}" alt="Image not available" class="d-block w-100">`;
        let heading = `<p id="country-image-heading-${index}"></p>`;
        let paragraph = `<p id="country-image-paragraph-${index}"></p>`;
        let item = `<div class="carousel-item ${index === 0 ? 'active' : ''}">${image}<div class="carousel-caption position-relative bottom-0 start-0 bg-dark mb-4">${heading}${paragraph}</div></div>`;

        carouselItems += item;
        index++;
    });
    $("#pictures-indicators").html(indicators);
    $("#pictures-carousel-inner").html(carouselItems);

    index = 0;
    response.data.photos.photo.forEach(photo => {
        getPictureInfo(photo.id, photo.secret, index);
        index++;
    });
}

export {getPictures};