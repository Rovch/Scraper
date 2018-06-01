// ------------npm packs------------
var cheerio = require("cheerio");
var request = require("request");
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var test = require("./public/js/articles.js")

// ------------express------------
var app = express();
var port = 8080;

// ------------body-parser------------
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

// ------------linking files------------
var models = ("./models");
// require("./routes/apiRoutes.js")(app);
require("./routes/htmlRoutes.js")(app);
require("./public//js/articles.js")

app.listen(port, function() {
  console.log(`Server is live on port: http://localhost:${port}`)
})