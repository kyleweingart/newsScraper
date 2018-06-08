// ===================================================================================================
// DEPENDENCIES
// Series of npm packages we will use to give our server functionality

var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

// Handlebars- lets see if i can figure this out
// ********************************************************


// app.engine("handlebars", exphbs({
//   defaultLayout:"main",
//   partialDir: path.join(__dirname, "views/layouts/partials")
// }));

// app.set("view engine", "handlebars");
// *******************************************************



// Our scraping tools

// var axios = require("axios");
// var cheerio = require("cheerio");

// Require all models (MongoDB data schemas)
// var db = require("./models");

var PORT = process.env.PORT || 3000;

// Initialize Express
var app = express();

// =====================================================================================================
// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));
// Use handlebars 
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ 
    defaultLayout: "main"
  }));
app.set("view engine", "handlebars");


// By default mongoose uses callbacks for async queries, we're setting it to use promises (.then syntax) instead

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/LFCPopulater");


// Import routes and give the server access to them.
var routes = require("./controllers/articles_controller.js");

app.use(routes);


// =========================================================================================================

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});

