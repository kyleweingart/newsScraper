// =======================================================================================================

var express = require("express");

var router = express.Router();

// Scraping Tools
var axios = require("axios");
var cheerio = require("cheerio");

// Import the models to use its database functions.
var db = require("../models");





// ROUTES
// =======================================================================================================

// A GET route for scraping the Liverpool Offside website
router.get("/scrape", function (req, res) {
  // First, we grab the body of the html with request
  axios.get("https://liverpooloffside.sbnation.com/").then(function (response) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    var $ = cheerio.load(response.data);

    // Now, we grab every h2 within an article tag, and do the following:
    $("div.c-entry-box--compact__body").each(function (i, element) {
      // Save an empty result object
      var result = {};

      // Add the text and href of every link, and save them as properties of the result object
      result.title = $(this).find("h2.c-entry-box--compact__title").text();

      result.link = $(this).find("a").attr("href");

      result.summary = $(this).find("p").text();

      result.byline = $(this).find("span").children("a").text();


      // Create a new Article using the `result` object built from scraping
      db.Article.create(result)
        .then(function (dbArticle) {
          // View the added result in the console
          console.log(dbArticle);
        })
        .catch(function (err) {
          // If an error occurred, send it to the client
          return res.json(err);
        });
    });

  });
});


// GET Route for getting all unsaved articles from MongoDB
router.get("/", function (req, res) {
  // Grab every document in the Articles collection
  db.Article.find({ saved: false })
    .then(function (dbArticle) {
      res.render("index", { article: dbArticle });
    });

});


// GET Route for getting all saved articles from MongoDB
router.get("/savedarticles", function (req, res) {

  db.Article.find({ saved: true })
    .then(function (dbArticle) {
      res.render("saved", { article: dbArticle });
    });

});


// GET route for grabbing a specific Article by id and then populate it with it's comment  *********** needs work
router.get("/articles/:id", function (req, res) {
  // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
  db.Article.findOne({ _id: req.params.id })
    // ..and populate all of the comments associated with it
    .populate("comment")
    .then(function (dbArticle) {
      // If we were able to successfully find an Article with the given id, send it back to the client
      res.json(dbArticle);
    })
    .catch(function (err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});






// Route for saving/updating an Article's associated Comment ************ needs work
router.post("/comments/saved/:id", function (req, res) {
  // Create a new note and pass the req.body to the entry
  db.Comment.create({
    title: req.body.title,
    body: req.body.text,
    article: req.params.id


  })
    .then(function (dbComment) {
      // If a Comment was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
      // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
      // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
      return db.Article.findOneAndUpdate({ _id: req.params.id }, { comment: dbComment._id }, { new: true });
    })
    .then(function (dbArticle) {
      // If we were able to successfully update an Article, send it back to the client
      res.json(dbArticle);
    })
    .catch(function (err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});





// Route for saving an article
router.post("/articles/saved/:id", function (req, res) {

  db.Article.findOneAndUpdate(
    {
      "_id": req.params.id
    },

    {
      $set: {
        "saved": true
      }
    })
    .then(function (err, result) {
      // show any errors
      if (err) {
        console.log(err);
        res.send(err);
      }
      else {
        // Otherwise, send the result of our update to the browser
        console.log(result);
        res.send(result);
      }
    });

});





//  Route for deleting previously saved article
router.post("/articles/delete/:id", function (req, res) {

  db.Article.findOneAndUpdate(
    {
      "_id": req.params.id
    },

    {
      $set: {
        "saved": false
      }
    })
    .then(function (err, result) {
      // show any errors
      if (err) {
        console.log(err);
        res.send(err);
      }
      else {
        // Otherwise, send the result of our update to the browser
        console.log(result);
        res.send(result);
      }
    });

});


// Export routes 
module.exports = router;