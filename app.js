/*
 * Express Dependencies
 */
var express = require('express');
var app = express(); 
var fs = require('fs');
var imageDataBucket = [];
var mongoClient = require('mongodb'),
    format = require('util').format;

// var mongoose = require('mongoose');
mongoClient.connect('mongodb://localhost:27017', function(err, db) {
    // mongoose.connect('mongodb://localhost:27017', function(err, db) {
    if(err){throw err;}
    
    var collection = db.collection('test_insert');
    // collection.insert({a:2}, function(err, docs) {
    //     collection.count(function(err, count) {
    //         console.log(format("count = %s",count));   
    //     });
    // });  

    //remove values
    collection.remove({_id: null}, function(){});

    // var imageData = fs.readFile(__dirname + '/assets/images/klassiekwijzer.png', function(err, results){
    //     if(err){throw err;}
    //     imageDataBucket = results;
    //     // collection.update({'$pull': imageData});
    //     // collection.update({'$push': imageData});
    // });  


    //initial document to be added
    // var article = {
    //     _id: 4, 
    //     name: 'JesseE',
    //     title: 'Datavisualisatie'
    // };

    //add new entries
    // collection.insert(article, {w: 1}, function(err, results){
    //     //console.log(results);
    // });
    console.log(imageDataBucket);
    //update values
    collection.update(
        { title: 'Datavisualisatie'},
        {
            $set: { title: 'Eikema'}

        }, 
        { multi: true }, 
        function( err, results ) { 
            if( err ){  throw err; }
        }
    );
    collection.remove({id : 2}, function(){});
    collection.update(
        { _id : 2},
        { src : imageData}, function() {}
    );
    var image = {
        name: 'image_1',
        src: imageData
    };
    //locate all entries using find
    collection.find().toArray(function(err, results){
        console.log(results); 
    });   
});

var path = require('path');     
var port = 3000;
var router = express.Router();
var exphbs = require('express3-handlebars');
    
// a bot to prevent heroku from going to sleep
var minutes = 20, the_interval = minutes * 60 * 1000;

setInterval(function() {
    var options = {
        host: 'www.jesseeikema.nl'
    };
    http.get(options, function (http_res) {
        console.log("Sent http request to www.jesseeikema.nl to stay awake.");
    });
}, the_interval);

// modules
var index = require('./assets/scripts/backend/index.js');
var datavisual = require('./assets/scripts/backend/datavisual.js'); 
var resizer = require('./assets/scripts/backend/resizer.js'); 
var melkweg = require('./assets/scripts/backend/melkweg.js');
var scoreapp = require('./assets/scripts/backend/scoreapp.js');
var pathogen = require('./assets/scripts/backend/pathogen.js');
var klassiekwijzer = require('./assets/scripts/backend/klassiekwijzer.js');

// page conditionals/booleans
var homePage = {};
var contentPage = {};
var actionPage = {};
// For gzip compression
app.use(express.compress());

app.engine('handlebars', exphbs({
    defaultLayout: 'main',
    layoutsDir: 'views/layouts/',
    partialsDir: 'views/partials/'
}));

// Locate the views
app.set('views', __dirname + '/views');
// Locate the assets
app.use(express.static(__dirname + '/')); 
app.use(express.static(__dirname + '/assets'));

// Set Handlebars
app.set('view engine', 'handlebars');
/*
 * Routes
 */
// Index Page
app.get('/', index.create);
// posts page
app.get('/datavisualisatie', datavisual.create);
app.get('/datavis', function(request, response, next) {
    response.render('partials/datavis' ,{
        normal: true,
        footer: true,
        helpers:{
            images: function() { return "../assets/images/placeholder-image.jpg"}
    }});
});
app.get('/resizer', resizer.create);
app.get('/resizer-prototype', function(request, response, next) {
    
    contentPage = false;
    homePage = false;
    actionPage = true;
    console.log('homepage = '+homePage, 'contentpage = '+contentPage, 'actionpage = '+ actionPage); 
    
    response.render('partials/resizer',{
        normal: true,
        footer: false,
        resizer: true,
        helpers:{
            images: function() { return "../assets/images/placeholder-image-2.jpg"}
    }}); 
});
app.get('/melkweg', melkweg.create);
app.get('/score-app', scoreapp.create);
app.get('/score-app-prototype', function(request, response, next) {
    response.render('layouts/score-app',{
        normal: false,
        nav_1: false,
        nav_2: false,
        footer: false,
        helpers:{
    }}); 
});
app.get('/pathogen', pathogen.create);
app.get('/pathogen-prototype', function(request, response, next) {
    response.render('layouts/pathogen',{
        normal: false,
        nav_1: false,
        nav_2: false,
        footer: false,
        helpers:{
            title: function () { return 'Score App'; }
    }}); 
});
app.get('/klassiekwijzer', klassiekwijzer.create);
/*
 * Start the server
 */
app.listen(process.env.PORT || port );
console.log('Express started on port ' + port);