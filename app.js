
/*
 * Express Dependencies
 */
var express = require('express');
var app = express();
var path = require('path');
var port = 3050;
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
           // var object = {"comment" : response.body.commit.message};     
            var object = response.body.commit.message;
            gitMessage.push(object);        
        });
    };
};
/*
 * Routes
 */

// Index Page
app.get('/', function(request, response, next) {    
    // console.log(gitMessage);
    var container = [];
    for ( var i = 0, len = gitMessage.length; i < len; i ++ ){
                gitMessage[i];
                var bucket = gitMessage[i];
                JSON.parse("[\"bucket[i]\"]");
                container.push(bucket);
    };
    var imgEntry = [
        {"img":"../assets/images/modular.png"},
        {"img":"../assets/images/reusable.png"},
        {"img":"../assets/images/modularv2.png"}
    ];
    var textEntry = [
        {"text":"Schaal je afbeeldingen naar je eigen gewenste dimensies. Samen met de Antialiasering van de afbeedlingen zullen je geschaalde afbeedlingen er nog goed uitzien."},
        {"text":"Download de afbeeedling direct via een zip bestand. Je kunt als je wilt ook meedere afbeedlingen tegelijk schalen."}
    ];
    
    response.render('index', {  
        img: imgEntry,
        text: textEntry,
        headbg:true,
        maps: true,
        footer: true,
        helpers:{
            added: function() {
                if(gitStats.length == 30) {
                    var added = [];
                    for ( var i = 0, len = gitStats.length; i < len; i ++ ){
                        added.push(gitStats[i].additions);
                    };
                    if(added.length == 30){
                        return added;
                    }
                }
            },
            removed: function() {
                if(gitStats.length == 30) {
                    var removed = [];
                    for(var i = 0, len = gitStats.length; i < len; i ++ ){
                        removed.push(gitStats[i].deletions);
                    }
                    if(removed.length == 30) {
                        return removed;
                    }

                }
            },
            comments: function() {
                if(gitStats.length > 19){
                     var comments = container;
                    return comments;       
                }
            },
            title: function () { return 'Jesse Eikema'; },
            paragraph: function () { return 'Donec purus turpis, pellentesque'; }
    }});
});

// posts page
app.get('/datavisualisatie', function(request, response, next) {
    response.render('partials/item' ,{
        footer: true,
        helpers:{
            title: function () { return 'Datavisualisatie'},
            links: function () { return 'datavis'},
            paragraph: function () { return 'Donec purus turpis, pellentesque et viverra at, vestibulum vitae ipsum. Suspendisse efficitur tristique tempor.';},
            images: function() { return "../assets/images/placeholder-image.jpg"}
    }});
});
app.get('/datavis', function(request, response, next) {
    response.render('partials/datavis' ,{
        footer: true,
        helpers:{
            images: function() { return "../assets/images/placeholder-image.jpg"}
    }});
});
app.get('/resizer', function(request, response, next) {
    var imgEntry = [
        {"img":"../assets/images/resizer-1.png"},
        {"img":"../assets/images/resizer-3.png"},
        {"img":"../assets/images/resizer-2.png"}
    ];
    var textEntry = [
        {"text":"Schaal je afbeeldingen naar je eigen gewenste dimensies. Samen met de Antialiasering van de afbeedlingen zullen je geschaalde afbeedlingen er nog goed uitzien."},
        {"text":"Download de afbeeedling direct via een zip bestand. Je kunt als je wilt ook meedere afbeedlingen tegelijk schalen."}
    ];
    response.render('partials/item',{
        img: imgEntry,
        text: textEntry,
        footer: true,
        helpers:{
            title: function () { return 'Resizer'; },
            links:function() {return 'resizer-prototype';}
    }}); 
});
app.get('/resizer-prototype', function(request, response, next) {
    response.render('partials/resizer',{
        footer: false,
        resizer: true,
        helpers:{
            images: function() { return "../assets/images/placeholder-image-2.jpg"}
    }}); 
});
app.get('/melkweg', function(request, response, next) {
    var imgEntry = [
        {"img":"../assets/images/melkwegv1.png"},
        {"img":"../assets/images/melkwegv2.png"},
        {"img":"../assets/images/resizer-2.png"}
    ];
    var textEntry = [
        {"text":"Schaal je afbeeldingen naar je eigen gewenste dimensies. Samen met de Antialiasering van de afbeedlingen zullen je geschaalde afbeedlingen er nog goed uitzien."},
        {"text":"Download de afbeeedling direct via een zip bestand. Je kunt als je wilt ook meedere afbeedlingen tegelijk schalen."}
    ];
    response.render('partials/item',{
        img: imgEntry,
        text: textEntry,
        footer: true,
        helpers:{
            title: function () { return 'Melkweg'; },
            paragraph: function () { return 'Donec purus turpis, pellentesque et viverra at, vestibulum vitae ipsum. Suspendisse efficitur tristique tempor.';},
            images: function() { return "../assets/images/placeholder-image-3.jpg"}
    }}); 
});
app.get('/score-app', function(request, response, next) {
    response.render('partials/item',{
        footer: true,
        helpers:{
            title: function () { return 'Score App'; },
            paragraph: function () { return 'Donec purus turpis, pellentesque et viverra at, vestibulum vitae ipsum. Suspendisse efficitur tristique tempor.';},
            images: function() { return "../assets/images/placeholder-image-4.jpg"}
    }}); 
});
app.get('/eikema-reintegratie', function(request, response, next) {
    var imgEntry = [
        {"img":"../assets/images/eikemav1.png"},
        {"img":"../assets/images/eikemav2.png"},
        {"img":"../assets/images/resizer-2.png"}
    ];
    var textEntry = [
        {"text":"Schaal je afbeeldingen naar je eigen gewenste dimensies. Samen met de Antialiasering van de afbeedlingen zullen je geschaalde afbeedlingen er nog goed uitzien."},
        {"text":"Download de afbeeedling direct via een zip bestand. Je kunt als je wilt ook meedere afbeedlingen tegelijk schalen."}
    ];
    response.render('partials/item',{
        img: imgEntry,
        text: textEntry,
        footer: true,
        helpers:{
            title: function () { return 'Eikema Reintegratie'; },
            paragraph: function () { return 'Donec purus turpis, pellentesque et viverra at, vestibulum vitae ipsum. Suspendisse efficitur tristique tempor.';},
            images: function() { return "../assets/images/placeholder-image-5.jpg"}
    }}); 
});
app.get('/klassiekwijzer', function(request, response, next) {
     var imgEntry = [
        {"img":"../assets/images/klassiekwijzerv1.png"},
        {"img":"../assets/images/klassiekwijzerv2.png"},
        {"img":"../assets/images/resizer-2.png"}
    ];
    var textEntry = [
        {"text":"Schaal je afbeeldingen naar je eigen gewenste dimensies. Samen met de Antialiasering van de afbeedlingen zullen je geschaalde afbeedlingen er nog goed uitzien."},
        {"text":"Download de afbeeedling direct via een zip bestand. Je kunt als je wilt ook meedere afbeedlingen tegelijk schalen."}
    ];
    response.render('partials/item',{
        img: imgEntry,
        text: textEntry,
        footer: true,
        helpers:{
            title: function () { return 'Klassiekwijzer'; },
            paragraph: function () { return 'Donec purus turpis, pellentesque et viverra at, vestibulum vitae ipsum. Suspendisse efficitur tristique tempor.';},
            images: function() { return "../assets/images/placeholder-image-6.jpg"}
    }}); 
});

/*
 * Start the server
 */
app.listen(process.env.PORT || port );
console.log('Express started on port ' + port);