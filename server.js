// Dependencies
var express = require("express");
var mongojs = require("mongojs");
// Require axios and cheerio. This makes the scraping possible
var axios = require("axios");
var cheerio = require("cheerio");
var exphbs = require("express-handlebars");

// Initialize Express
var app = express();

// Database configuration
var databaseUrl = "NYT"; //mongodb://localhost/NYT
var collections = ["articles"];

//build collection and add records 
//scrape function 
//displaying scarp info on page
//save functionality 
//add note functionality (form and post to DB)
//Delete functionilty 

//id
//Title
//link
//summary
//saved? 
//Comments (diff schema) 

// Handlebars
app.engine(
    "handlebars",
    exphbs({
        defaultLayout: "main"
    })
);
app.set("view engine", "handlebars");


// Hook mongojs configuration to the db variable
var db = mongojs(databaseUrl, collections);
db.on("error", function (error) {
    console.log("Database Error:", error);
});

// Main route (simple Hello World Message)
// app.get("/", function (req, res) {
//     res.send("save");
// });


// Scrape data from one site and place it into the mongodb db
app.get("/scrape", function (req, res) {
    // Make a request via axios for the news section of `ycombinator`
    axios.get("https://www.nytimes.com/section/world").then(function (response) {

        // Load the HTML into cheerio
        var $ = cheerio.load(response.data);
        // Make an empty array for saving our scraped info
        var results = [];
        var articleArray = [];
        // With cheerio, look at each award-winning site, enclosed in "figure" tags with the class name "site"
        $("div.css-1l4spti").each(function (i, element) {
            //pushing title and link of the article into results array from NYT times 
            var article = $(element).text();
            var link = $(element).children().attr("href");
            results.push({
                article: article,
                link: link
            });
            return results;
        });


        if (results.article !== "" && results.link !== "") {
            if (articleArray.indexOf(results.article) == -1) {
                articleArray.push(results.article);
                db.articles.insert(results,
                    function (err, inserted) {
                        if (err) {
                            // Log the error if one is encountered during the query
                            console.log(err);
                        }
                        else {
                            // Otherwise, log the inserted data
                            console.log(inserted);
                        }
                    });

            }
        }
        console.log(results);

        // Send a "Scrape Complete" message to the browser
        //change to send to articl.ehandlabrs 

    });
});
app.get("/", function (req, res) {
    db.articles.find({}, function (error, found) {
        // Throw any errors to the console
        if (error) {
            console.log(error);
        }
        // If there are no errors, send the data to the browser as json
        else {
            res.render("article", {
                stories: found
            });
        }
    });
})


// Listen on port 3000
app.listen(3000, function () {
    console.log("App running on port 3000!");
});
