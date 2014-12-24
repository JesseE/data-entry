/*
 * Express Dependencies
 */
var express = require('express');
var app = express(); 
var path = require('path');     
var port = 3000;
var exphbs = require('express3-handlebars');
var mongoose = require('mongoose');
//require('newrelic');
//var item_model = require('./assets/backend/scripts/modelItem');
// var Item = require('db');
// item_model('Item', function(Items){
//     console.log(Items);
// });
var modelItem = require('./assets/backend/scripts/modelItem');

// var peter = new modelItem();

modelItem.find(function(err, items){
    if(err) return console.error()        
});
// console.log(modelItem);

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
// Index Page
app.get('/', index.create, function(req, res){
    item_model.find(function(err, items){
        if(err) return next(err)
            console.log(items);
        // res.json(items);
    });
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
/*
 * a bot to prevent heroku from going to sleep FOREVER! ~(^L^)~ 
 */
var minutes = 20, the_interval = minutes * 60 * 1000;

setInterval(function() {
    var options = {
        host: 'www.jesseeikema.nl'
    };
    http.get(options, function (http_res) {
        console.log("Sent http request to www.jesseeikema.nl to stay awake.");
    });
}, the_interval);
/*
 * Start the server
 */
app.listen(process.env.PORT || port );
console.log('Express started on port ' + port);