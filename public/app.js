$(document).ready(function () {

  // FUNCTION to display all articles
  function displayResults(articles) {
    // First, empty the table
    $("#articles").empty();
    console.log("cool");
    // Then, for each entry of that json...
    articles.forEach(function (article) {
      // Append each of the animal's properties to the table
      $("#articles").append("<div class=card>" + "<img class=card-img-top src=liverbird.png alt=Card image cap>"
        + "<div class=card-body>" + "<a href=" + article.link + ">" + "<h6 class=card-title>" + article.title + "</h6>" + "</a>" +
        "<p class=card-text>" + article.summary + "</p>" + "<p class=byline>" + "By: " + article.byline + "</p>" +
        "<a class=save data-id=" + article._id + ">Save</a>" + "</div>" + "</div>");

      $("a.save").addClass("btn-outline-danger");
      $("a.save").addClass("btn");
    });
  }


  // 1: On Load
  // ==========

  // GET JSON with all articles from back end

  // Grab the articles as a json
  $.getJSON("/articles", function (data) {

    displayResults(data);

  });

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
    })

  });


  // Save article
  $(document).on("click", ".save", function () {
    // alert("article saved");
    var thisID = $(this).attr("data-id");
    $.ajax({
      method: "POST",
      url: "/articles/saved/" + thisID
    })
  });

});