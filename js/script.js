console.log("Script loaded");

$("#countries option").click(function (e) {
    console.log("Clicked!!!");
    console.log("value changed");
    $("#search").triggerHandler("keypress", true);
    console.log("Sending message!");
    
});

$("#search").on("keypress", function (e, submit) {
    if(e.which == 13 || submit) {
        $.ajax({
            url: "php/countries.php",
            type: "POST",
            dataType: "json",
            data: {
                country: $("#search").val()
            },
            success: function(response) {
                console.log(response);
    
                if(response.status.name == "ok") {
                    console.log("Resonse success");
                }
                
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log("Bad request: " + textStatus);
                console.log(errorThrown);
            }
    
        });
    }
});