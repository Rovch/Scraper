var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
var db = require("./models");

var PORT = process.env.PORT||3000;

// Initialize Express
var app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));
mongoose.Promise = Promise;

// Connect to the Mongo DB
var MONGODB_URI = "mongodb://rovch:3673wj@ds251240.mlab.com:51240/heroku_qz72vj6g"
let dbUrl = "mongodb://localhost/Scraper";

if (MONGODB_URI) {
	mongoose.connect("mongodb://rovch:3673wj@ds251240.mlab.com:51240/heroku_qz72vj6g");
}
else {
	mongoose.connect("mongodb://localhost/Scraper");
};

// Routes

// A GET route for scraping the echoJS website
app.get("/scrape", function (req, res) {
  console.log("herererererer")
  // First, we grab the body of the html with request
  axios.get("http://www.nytimes.com/").then(function (response) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    var $ = cheerio.load(response.data);

    // Now, we grab every h2 within an article tag, and do the following:
    $(".theme-summary").each(function (i, element) {
      // Save an empty result object
      var result = {};

      result.title = $(this)
        .children("a")
        .text().trim();
      result.link = $(this)
        .children("a")
        .attr("href")

        console.log(result);
      // Create a new Article using the `result` object built from scraping
      db.Article.create(result)
        .then(function (dbArticle) {
          // View the added result in the console
          console.log(dbArticle);
        })
        .catch(function (err) {
          // If an error occurred, send it to the client
          // return res.json(err);
        });
    });

    // If we were able to successfully scrape and save an Article, send a message to the client
    res.send("Scrape Complete");
  });
});

// Route for getting all Articles from the db
app.get("/articles", function (req, res) {
  db.Article.find({})
    .then(function(dbArticle) {
      // If we were able to successfully find Articles, send them back to the client
      res.json(dbArticle);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});


app.listen( process.env.PORT|| PORT, function() {
  console.log("App listening on PORT " + PORT);
});
