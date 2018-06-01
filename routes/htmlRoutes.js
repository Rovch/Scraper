var path = require("path");


module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads view.html
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/main.html"))
  });

  // Route to the cms page
  app.get("/cms", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/test.html"));
  });

  // // blog route loads blog.html
  // app.get("/blog", function(req, res) {
  //   res.sendFile(path.join(__dirname, "../public/blog.html"));
  // });

};