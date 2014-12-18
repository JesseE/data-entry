//requirements import modules
var express = require('express');
var app = express(); 
var index = require('./index');
var model_item = require('./model-item');
var gitFeed = require('./gitvisual_request')
var datavisual = require('./datavisual'); 
var resizer = require('./resizer'); 
var melkweg = require('./melkweg');
var scoreapp = require('./scoreapp');
var pathogen = require('./pathogen');
var klassiekwijzer = require('./klassiekwijzer');

app.use('/', index.create);
app.get('/datavisualisatie', datavisual.create);
app.get('/datavis', function(request, response, next) {
    response.render('partials/datavis' ,{
        normal: true,
        footer: true
    });
});
app.get('/resizer', resizer.create);
app.get('/resizer-prototype', function(request, response, next) { 
    response.render('partials/resizer',{
        normal: true,
        footer: false,
        resizer: true
    }); 
});
app.get('/melkweg', melkweg.create);
app.get('/score-app', scoreapp.create);
app.get('/score-app-prototype', function(request, response, next) {
    response.render('layouts/score-app',{
        normal: false,
        nav_1: false,
        nav_2: false,
        footer: false
    }); 
});
// app.get('/pathogen', pathogen.create);
app.get('/pathogen-prototype', function(request, response, next) {
    response.render('layouts/pathogen',{
        normal: false,
        nav_1: false,
        nav_2: false,
        footer: false
    }); 
});
// app.get('/klassiekwijzer', klassiekwijzer.create);