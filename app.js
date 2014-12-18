/*
 * Express Dependencies
 */
var express = require('express');
var app = express(); 
<<<<<<< HEAD
var fs = require('fs');
var imageDataBucket = [];
var mongoClient = require('mongodb'),
    format = require('util').format;
=======
var path = require('path');     
var port = 3000;
var router = express.Router();
var exphbs = require('express3-handlebars');
// var fs = require('fs');
// // var imageData = [];
// var mongoClient = require('mongodb'),
//     format = require('util').format;
>>>>>>> a7a6fe280a90046c7bc5b948c249fbb866e5c4cf

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

//passport implementation
// var passport = require('passport');
// var mongoose = require('mongoose');
// var LocalStrategy = require('passport-local').Strategy;
// var Account = require('./assets/backend/scripts/account');
//mongoose config

// var Schema = mongoose.Schema;
// var itemSchema = new Schema ({
//     title: String
//     // link: String,
//     // mod_description: String,
//     // mod_description_datavis: String,

// });
// var Items = mongoose.model('Item', itemSchema);
// var Item_resizer = new Item({
//     title: 'Resizer'
// });
// console.log(itemSchema);

//passport config
// passport.use( new LocalStrategy(Account.authenticate()));
// passport.serializeUser(Account.serializeUser());
// passport.deserializeUser(Account.deserializeUser());

// //mongoose config
// mongoose.connect('mongodb://localhost/passport_local_mongoose');

// a bot to prevent heroku from going to sleep FOREVER! ~(^L^)~ 
var minutes = 20, the_interval = minutes * 60 * 1000;

setInterval(function() {
    var options = {
        host: 'www.jesseeikema.nl'
    };
    http.get(options, function (http_res) {
        console.log("Sent http request to www.jesseeikema.nl to stay awake.");
    });
}, the_interval);

app.set('views', __dirname + '/views');
app.set('view engine', 'html');
// For gzip compression
app.use(express.compress());

app.engine('handlebars', exphbs({
    defaultLayout: 'main',
    layoutsDir: 'views/handlebars/layouts/',
    partialsDir: 'views/handlebars/partials/'   
}));

// Locate the views
app.set('views', __dirname + '/views/handlebars');
// Locate the assets
app.use(express.static(__dirname + '/')); 
app.use(express.static(__dirname + '/assets'));
// Set Handlebars
app.set('view engine', 'handlebars');

/*
 * Routes
 */

// ROUTING NOW DONE WITH ANGULAR TO CREATE SPA
// STILL USING HANDLEBARS FOR STATIC FILE TEMPLATE INDEX PAGE

var index = require('./assets/backend/scripts/index');
// var model_item = require('./assets/backend/scripts/model-item');
// var gitFeed = require('./assets/backend/scripts/gitvisual_request')
// var datavisual = require('./assets/backend/scripts/datavisual'); 
// var resizer = require('./assets/backend/scripts/resizer'); 
// var melkweg = require('./assets/backend/scripts/melkweg');
// var scoreapp = require('./assets/backend/scripts/scoreapp');
// var pathogen = require('./assets/backend/scripts/pathogen');
// var klassiekwijzer = require('./assets/backend/scripts/klassiekwijzer');
// Index Page
app.get('/', index.create, function(){
});
app.get('/datavisualisatie',index.create);
app.get('/klassiekwijzer',index.create);
app.get('/resizer', index.create);
app.get('/resizer-prototype', function(request, response, next) { 
    response.render('partials/resizer',{
        normal: true,
        footer: false,
        resizer: true
    }); 
});
app.get('/melkweg',index.create);
app.get('/score-app',index.create);
app.get('/score-app-prototype', function(request, response, next) {
    response.render('layouts/score-app',{
        normal: false,
        nav_1: false,
        nav_2: false,
        footer: false
    }); 
});
app.get('/pathogen',index.create);
app.get('/pathogen-prototype', function(request, response, next) {
    response.render('layouts/pathogen',{
        normal: false,
        nav_1: false,
        nav_2: false,
        footer: false
    }); 
});

// ROUTING WITH EXPRESS & HANDLEBARS
var handlebars_routing = require('./assets/backend/scripts/handlebars_routing');

/*
 * Start the server
 */
app.listen(process.env.PORT || port );
console.log('Express started on port ' + port);