function getPictureInfo(photoId, photoSecret, carouselId) {
    $.ajax({
        url: "./php/pictureInfo.php",
        type: "POST",
        dataType: "json",
        data: {
            id: photoId,
            secret: photoSecret
        },
        success: function(response) {
            handlePictureInfoResponse(response, carouselId)
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log("Bad request: " + textStatus);
            console.log(errorThrown);
            console.log(jqXHR);
        }
    });
}

function handlePictureInfoResponse(response, carouselId) {
    let title = response.data.photo.title._content === "" ? "Not specified" : response.data.photo.title._content;
    let author = response.data.photo.owner.username === "" ? "Not specified" : response.data.photo.owner.username;

    let locationCountry = "Not specified";
    let locationCounty = "";

    if(response.data.photo.location !== undefined) {
        locationCountry = response.data.photo.location.country._content;
        locationCounty = response.data.photo.location.county._content === "" ? "" : (", " + response.data.photo.location.county._content);
    }

    $(`#country-image-heading-${carouselId}`).html(`Title: ${title}`);
    $(`#country-image-paragraph-${carouselId}`).html(`Owner: ${author}<br/>Location: ${locationCountry}${locationCounty}`);
}

export {getPictureInfo};