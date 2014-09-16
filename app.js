
/*
 * Express Dependencies
 */
var express = require('express');
var app = express();
var path = require('path');
var port = 3000;
var express = require('express');
var router = express.Router();
var unirest = require('unirest');
var d3 = require('d3');
var exphbs = require('express-handlebars');

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

/* needs to become a module */

//github request repos
var username = "JesseE";
var password = "Eikema22";
var header = {'user-agent': 'node.js'};

var commitsHash = [];
var commitContainer = [];
var gitStats = [];
commitsHash.length = 20;

getAllCommits();

function getAllCommits (){ unirest.get('https://api.github.com/repos/JesseE/data-entry/commits?sha=master').auth({
    user: username,
    pass: password,
    sendImmediately: true
}).headers(header).end(function(response){
    for(var i = 0, len = commitsHash.length; i < len; i ++ ){
        commitContainer.push(response.body[i].sha);    
    }
    getAllStats();    
    });
};

function getAllStats () { 
    for(var i = 0, len = commitsHash.length; i < len; i ++ ){
        unirest.get('https://api.github.com/repos/JesseE/data-entry/commits/'+commitContainer[i]).auth({
            user: username,
            pass: password,
            sendImmediately: true
        }).headers(header).end(function(response){
            gitStats.push(response.body.stats);   
        });
    };
};

/*
 * Routes
 */

// Index Page
app.get('/', function(request, response, next) {
    response.render('index', {  
        headbg:true,
        maps: true,
        helpers:{
            added: function() {
                if(gitStats.length > 15) {
                    var added = [];
                    for ( var i = 0, len = gitStats.length; i < len; i ++ ){
                        added.push(gitStats[i].additions);
                    };
                    if(added.length > 15){
                        return added;
                    }
                }
            },
            removed: function() {
                if(gitStats.length > 15) {
                    var removed = [];
                    for(var i = 0, len = gitStats.length; i < len; i ++ ){
                        removed.push(gitStats[i].deletions);
                    }
                    if(removed.length > 15) {
                        return removed;
                    }

                }
            },
            title: function () { return 'Jesse Eikema'; },
            paragraph: function () { return 'bitches bitch like to RESIZE bitch about those bitches'; }
    }});
});

// posts page
app.get('/post-1', function(request, response, next) {
    response.render('partials/item' ,{
        helpers:{
            title: function () { return 'Datavisualisatie'},
            paragraph: function () { return 'bitches bitch like to Datavisualisatie bitch about those bitches';},
            images: function() { return "../assets/images/placeholder-image.jpg"}
    }});
});
app.get('/post-2', function(request, response, next) {
    response.render('partials/item',{
        helpers:{
            title: function () { return 'Resizer'; },
            paragraph: function () { return 'bitches bitch like to RESIZE bitch about those bitches';},
            images: function() { return "../assets/images/placeholder-image-2.jpg"}
    }}); 
});
app.get('/post-3', function(request, response, next) {
    response.render('partials/item',{
        helpers:{
            title: function () { return 'Melkweg'; },
            paragraph: function () { return 'bitches bitch like to Melkweg bitch about those bitches';},
            images: function() { return "../assets/images/placeholder-image-3.jpg"}
    }}); 
});
app.get('/post-4', function(request, response, next) {
    response.render('partials/item',{
        helpers:{
            title: function () { return 'Score App'; },
            paragraph: function () { return 'bitches bitch like to Score App bitch about those bitches';},
            images: function() { return "../assets/images/placeholder-image-4.jpg"}
    }}); 
});
app.get('/post-5', function(request, response, next) {
    response.render('partials/item',{
        helpers:{
            title: function () { return 'Eikema Reintegratie'; },
            paragraph: function () { return 'bitches bitch like to Eikema Reintegratie bitch about those bitches';},
            images: function() { return "../assets/images/placeholder-image-5.jpg"}
    }}); 
});
app.get('/post-6', function(request, response, next) {
    response.render('partials/item',{
        helpers:{
            title: function () { return 'Klassiekwijzer'; },
            paragraph: function () { return 'bitches bitch like to Eikema Reintegratie bitch about those bitches';},
            images: function() { return "../assets/images/placeholder-image-6.jpg"}
    }}); 
});

/*
 * Start the server
 */
app.listen(process.env.PORT || port );
console.log('Express started on port ' + port);