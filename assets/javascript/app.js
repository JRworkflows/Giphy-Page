function getGIFs() {
    // Grabbing and storing the data-activity property value from the button
    var activity = $(this).attr("data-activity");

    // Constructing a queryURL using the activity name
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        activity + "&api_key=UNshVf6PsKDUbJT41wMCC52Gnl6DWoKJ&limit=10";

    // Performing an AJAX request with the queryURL
    $.ajax({
        url: queryURL,
        method: "GET"
    })


    // After data comes back from the request
    .then(function(response) {
        console.log(response)
            // storing the data from the AJAX request in the results variable
        var results = response.data;

        // Looping through each result item
        for (var i = 0; i < results.length; i++) {

            // Creating and storing a div tag
            var activityDiv = $("<div>");

            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + results[i].rating);
            // Creating and storing an image tag
            var activityImage = $("<img>");
            // Setting the src attribute of the image to a property pulled off the result item
            activityImage.attr("src", results[i].images.fixed_height.url);

            // making source for animate/still

            activityImage.attr("data-state", "animate");
            activityImage.attr("data-animate", results[i].images.fixed_height.url);
            activityImage.attr("data-still", results[i].images.fixed_height_still.url);

            // Appending the paragraph and image tag to the animalDiv
            activityDiv.append(p);
            activityDiv.append(activityImage);
            activityDiv.prepend("#activities")

            // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
            activityImage.addClass("gifClass");

            $("#activities").prepend(activityDiv);
            $(activityDiv).prepend(activity);
        }

    });
}




$(document).on("click", ".actBtns", getGIFs)


$(document).on("click", ".gifClass", function() {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still", );
    }

});


$("#addBtn").on("click", function() {
        var newbtn = $("#addActivity").eq(0).val();
        console.log("hi");
        $('#activityButtons').append(`<button class="actBtns" data-activity='${newbtn}'>${newbtn}</button>`);
    })
    // Two parts, one is to class the buttons to have same properties as the prior buttons and Second is to give them a data activity