function displayResults(articles) {
  // First, empty the table
  $("#articles").empty();
  console.log("cool");
  // Then, for each entry of that json...
  articles.forEach(function(article) {
    // Append each of the animal's properties to the table
    $("#articles").append("<div class=card>" + "<img class=card-img-top src=liverbird.png alt=Card image cap>"
    + "<div class=card-body>" + "<h5 class=card-title>" + article.title + "</h5" + 
    "<p class=card-text>Some quick example text to build on the card title and make up the bulk of the card's content.</p>" + 
    "<a href=# class=btn btn-primary>Save</a>" + "</div>" + "</div>");
    
    // $("#articles").append("<img class=card-img-top src=liverbird.png alt=Card image cap>");
    // $("#articles").append("<div class=card-body>");
    // $("#articles").append("<h5 class=card-title>" + article.title + "</h5");
    // $("#articles").append("<p class=card-text>Some quick example text to build on the card title and make up the bulk of the card's content.</p>");
    // $("#articles").append("<a href=# class=btn btn-primary>Save</a>");
    // $("#articles").append("</div>");
    // $("#articles").append("</div>");





    
    
    
   
  });
}

// Grab the articles as a json
$.getJSON("/articles", function(data) {
    // For each one
    // for (var i = 0; i < data.length; i++) {
    //   // Display the apropos information on the page
    //   $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
  // }
    displayResults(data);
    
  });
  
  
  // Whenever someone clicks a p tag
  $(document).on("click", "p", function() {
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
      .then(function(data) {
        console.log(data);
        // The title of the article
        $("#comments").append("<h2>" + data.title + "</h2>");
        // An input to enter a new title
        $("#comments").append("<input id='titleinput' name='title' >");
        // A textarea to add a new note body
        $("#comments").append("<textarea id='bodyinput' name='body'></textarea>");
        // A button to submit a new note, with the id of the article saved to it
        $("#comments").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");
  
        // If there's a note in the article
        if (data.comment) {
          // Place the title of the note in the title input
          $("#titleinput").val(data.comment.title);
          // Place the body of the note in the body textarea
          $("#bodyinput").val(data.comment.body);
        }
      });
  });
  
  // When you click the savenote button
  $(document).on("click", "#savenote", function() {
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
      .then(function(data) {
        // Log the response
        console.log(data);
        // Empty the notes section
        $("#notes").empty();
      });
  
    // Also, remove the values entered in the input and textarea for note entry
    $("#titleinput").val("");
    $("#bodyinput").val("");
  });