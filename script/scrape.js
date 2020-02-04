// var request = require("request");
// var cheerio = require("cheerio");

// var scrape = function (cb) {
//     request("https://www.nytimes.com/section/world", function (err, res, body) {
//         console.log("scrape called");
//         var $ = cheerio.load(body);
//         var articles = [];
//         $("div.css-1l4spti").each(function (i, element) {
//             //             //pushing title and link of the article into results array from NYT times
//             var head = $(element).text();
//             var sum = $(element).children().attr("href");

//             if (head && sum) {
//                 var dataToAdd = {
//                     title: head,
//                     summary: sum
//                 };

//                 articles.push(dataToAdd);
//             }

//         });
//         console.log(articles);
//         cb(articles);
//     });

// };

// module.exports = scrape; 