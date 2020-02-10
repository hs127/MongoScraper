require('dotenv').config();
const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


var PORT = process.env.PORT || 3000;

const app = express();


app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }));
app.use(bodyParser.text({ type: 'text/html' }));

require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);


var MONGODB_URI = process.env.MONGODB_URI || "mongodb://user:password1@ds037997.mlab.com:37997/heroku_20tztjz0";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

app.listen(PORT, function () {
    console.log("App running on port " + PORT);
});

//build collection and add records 
//scrape function 
//displaying scarp info on page
//save functionality 
//add note functionality
//Delete functionilty 

//id
//Title
//link
//summary
//saved? 
//Comments 

