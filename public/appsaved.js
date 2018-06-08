$(document).ready(function() {


// FUNCTION to dipslay saved articles
function displayResults(articles) {
  // First, empty the table
  $("#articles").empty();
  console.log("cool");
  // Then, for each entry of that json...
  articles.forEach(function (article) {
    // Append each of the animal's properties to the table
    $("#articles").append("<div class=card>" + "<img class=card-img-top src=liverbird.png alt=Card image cap>"
      + "<div class=card-body>" + "<a href=" + article.link + ">" + "<h6 class=card-title>"  + article.title + "</h6>" + "</a>" +
      "<p class=card-text>" + article.summary + "</p>" + "<p class=byline>" + "By: " + article.byline + "</p>" +
      "<a class=comment data-target=#comments data-toggle=modal data-id=" + article._id +  ">Comment</a>" + 
      "<a class=delete data-id=" + article._id +  
      ">Remove</a>" +  "</div>" + "</div>");

      $("a.comment").addClass("btn-outline-danger");
      $("a.comment").addClass("btn");
      $("a.delete").addClass("btn");
      $("a.delete").addClass("btn-outline-dark");
      // $("a.btn").addClass("save");
      // $("a.btn").attr("id", "btn-position");
      
 });
}

// 1: On Load
// ==========

// Get JSON of all saved articles from the backend

$.getJSON("/savedarticles", function (data) {

  // displayResults(data);

});






// click the savecomment button
$(document).on("click", "#savecomment", function () {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      title: $("#titleinput").val(),
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })
    // With that done
    .then(function (data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      $("#comments").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
});

});