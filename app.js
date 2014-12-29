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
// var modelItem = require('./assets/backend/scripts/modelItem');

// // var peter = new modelItem();

// modelItem.find(function(err, items){
//     if(err) return console.error()        
// });
// console.log(modelItem);
var bot = require('./assets/backend/scripts/bot');
(function(){ bot();})();

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
app.get('/', index.create, function(req, res){
    item_model.find(function(err, items){
        if(err) return next(err)
            console.log(items);
        // res.json(items);
    });
});
app.get('/project/:primaryID', index.create);
app.get('/resizer-prototype', function(request, response, next) { 
    response.render('partials/resizer',{
        normal: true,
        footer: false,
        resizer: true
    }); 
});
app.get('/score-app-prototype', function(request, response, next) {
    response.render('layouts/score-app',{
        normal: false,
        nav_1: false,
        nav_2: false,
        footer: false
    }); 
});
app.get('/pathogen-prototype', function(request, response, next) {
    response.render('layouts/pathogen',{
        normal: false,
        nav_1: false,
        nav_2: false,
        footer: false
    }); 
});
/*
 * Start the server
 */
app.listen(process.env.PORT || port );
console.log('Express started on port ' + port);