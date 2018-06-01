var request = require('request');
var cheerio = require('cheerio');
// var test = document.querySelector('.btn-test');


// test.addEventListener('click', function (e) {
//     e.preventDefault();
//     console.log('Congrats! You have reached the clickController!');
// });

var url = "https://www.nytimes.com/";

request(url, function (error, response, body) {
    if (!error) {


        var $ = cheerio.load(body)
        var freeArticles = $('.theme-summary').each(function (i, element) {
            var result = {};
            result._id = $(this)
                .attr("data-story-id")
            result.title = $(this)
                .children("a")
                .text().trim();
            result.link = $(this)
                .children("a")
                .attr("href")

                console.log(result);
        });

        // console.log('URL: ' + url);
        // console.log('Title: ' + title);
        // console.log('EN articles: ' + freeArticles);
    }
    else {
        console.log("We’ve encountered an error: " + error);
    }
});
