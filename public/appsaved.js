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
      "<a class=comment data-id=" + article._id +  ">Comment</a>" + "<a class=delete data-id=" + article._id +  
      ">Delete</a>" +  "</div>" + "</div>");

      $("a.comment").addClass("btn-outline-danger");
      $("a.comment").addClass("btn");
      $("a.delete").addClass("btn");
      $("a.delete").addClass("btn-outline-primary");
      // $("a.btn").addClass("save");
      // $("a.btn").attr("id", "btn-position");
      
 });
}

// 1: On Load
// ==========

// Get JSON of all saved articles from the backend

// Grab the articles as a json
$.getJSON("/savedarticles", function (data) {

  displayResults(data);

});


// $("#saved-articles").click(function () {
//   $.ajax({
//     method: "GET",
//     url: "/savedarticles"
//   })

  
 
  
// });

// $.getJSON("/savedarticles", function(data) {

//   displayResults(data);

// }

// Scrape new articles

// $("#scrape").click(function () {
//   // alert("The scrape button was clicked.");
//   $.ajax({
//     method: "GET",
//     url: "/scrape"
//   })
  
// });

// Whenever someone clicks delete button
$(document).on("click", ".delete", function () {
  // alert("article saved");
  var thisID = $(this).attr("data-id");
  $.ajax({
    method: "POST",
    url: "/articles/delete/" + thisID
  })
});
// Whenever someone clicks save button
// $(document).on("click", ".save", function () {
//   // alert("article saved");
//   var thisID = $(this).attr("data-id");
//   $.ajax({
//     method: "POST",
//     url: "/articles/" + thisID
//   })
// });
// ====================================================
// need to work on this- how to get thisID from click? 


$(document).on("click", ".comment", function () {
  // Empty the notes from the note section
  $("#comments").empty();
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the note information to the page
    .then(function (data) {
      console.log(data);
      // The title of the article
      $("#comments").append("<h2>" + data.title + "</h2>");
      // An input to enter a new title
      $("#comments").append("<input id='titleinput' name='title' >");
      // A textarea to add a new note body
      $("#comments").append("<textarea id='bodyinput' name='body'></textarea>");
      // A button to submit a new note, with the id of the article saved to it
      $("#comments").append("<button data-id='" + data._id + "' id='savecomment'>Save Comment</button>");

      // If there's a comment in the article
      if (data.comment) {
        // Place the title of the note in the title input
        $("#titleinput").val(data.comment.title);
        // Place the body of the note in the body textarea
        $("#bodyinput").val(data.comment.body);
      }
    });
});

// When you click the savenote button
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