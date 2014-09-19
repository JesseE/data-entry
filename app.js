
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
var exphbs = require('express3-handlebars');

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
var gitMessage = [];
commitsHash.length = 30;

getAllCommits();
// get all commit hashes
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
//addtions deletions total adjustments in a commit
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
    getAllMessage();
};
// commit comments
function getAllMessage () { 
    for(var i = 0, len = commitsHash.length; i < len; i ++ ){
        unirest.get('https://api.github.com/repos/JesseE/data-entry/commits/'+commitContainer[i]).auth({
            user: username,
            pass: password,
            sendImmediately: true
        }).headers(header).end(function(response){
            gitMessage.push(response.body.commit.message); 
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
                if(gitStats.length > 19) {
                    var added = [];
                    for ( var i = 0, len = gitStats.length; i < len; i ++ ){
                        added.push(gitStats[i].additions);
                    };
                    if(added.length > 19){
                        return added;
                    }
                }
            },
            removed: function() {
                if(gitStats.length > 19) {
                    var removed = [];
                    for(var i = 0, len = gitStats.length; i < len; i ++ ){
                        removed.push(gitStats[i].deletions);
                    }
                    if(removed.length > 19) {
                        return removed;
                    }

                }
            },
            comments: function() {
                if(gitMessage.length > 19){
                    return gitMessage;
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