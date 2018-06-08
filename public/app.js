$(document).ready(function () {


  // GET all saved articles
  $("#saved-articles").click(function () {

    $.ajax({
      method: "GET",
      url: "/savedarticles"
    })

  });

  // Scrape for new articles
  $("#scrape").click(function () {
    // alert("The scrape button was clicked.");
    $.ajax({
      method: "GET",
      url: "/scrape"
    }).then(function () {
      location.reload();
    });

  });


  // Save article
  $(document).on("click", ".save", function () {
    // alert("article saved");
    var thisID = $(this).attr("data-id");
    $.ajax({
      method: "POST",
      url: "/articles/saved/" + thisID
    }).then(function () {
      location.reload();
    });
  });

  // Click delete button
  $(document).on("click", ".delete", function () {
    // alert("article saved");
    var thisID = $(this).attr("data-id");
    $.ajax({
      method: "POST",
      url: "/articles/delete/" + thisID
    }).then(function () {
      location.reload();
    });

  });

  // Save comment on article  ************************* needs work
  $(document).on("click", ".savecomment", function () {

    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");
    console.log(thisID);
    
    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
      method: "POST",
      url: "/comments/saved/" + thisId,
      data: {
        // Value taken from title input
        text: $("#commentText" + thisID).val()
        // Value taken from note textarea
      
      }
    })
      // With that done
      .then(function (data) {
        // Log the response
        console.log(data);
        $("#commentText" + thisID).val("");
        $(".mdlComment").modal("hide");
        location.reload();
        
        
      });

    
   
  });


});