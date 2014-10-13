
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
        {"img":"../assets/images/modularv4.png"},
        {"img":"../assets/images/reusable.png"},
        {"img":"../assets/images/modularv2.png"}
    ];
    var titleEntry = [
        {"title": "Datavisualisatie"},
        {"title": "Resizer"},
        {"title": "Melkweg"},
        {"title": "Score app"},
        {"title": "Klassiekwijzer"},
        {"title": "Pathogen"},
    ];
    var paragraphEntry =[
        {"paragraph": "visualisatie van coding activiteit"},
        {"paragraph": "Pas de dimensies van je afbeelding"},
        {"paragraph": "SASS aanpassingen in de melkweg"},
        {"paragraph": "Toevoegen van actuele score's"},
        {"paragraph": "Kom erachter welke klassieke muziek bij je past"},
        {"paragraph": "RTS game gemaakt met javascript"},
    ];
    var textEntry = [
        {"text":"Schaal je afbeeldingen naar je eigen gewenste dimensies. Samen met de Antialiasering van de afbeedlingen zullen je geschaalde afbeedlingen er nog goed uitzien."},
        {"text":"Download de afbeeedling direct via een zip bestand. Je kunt als je wilt ook meedere afbeedlingen tegelijk schalen."}
    ];
    response.render('index', {  
        img: imgEntry,
        text: textEntry,
        title: titleEntry,
        paragraph: paragraphEntry,
        normal: true,
        nav_1: true,
        nav_2: true,
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
            }
    }});
});


// posts page


app.get('/datavisualisatie', function(request, response, next) {
    response.render('partials/item' ,{
        normal: true,
        nav_1: true,
        nav_2: true,
        footer: true,
        helpers:{
            title: function () { return 'Datavisualisatie'},
            links: function () { return '/datavis'},
            paragraph: function () { return 'Donec purus turpis, pellentesque et viverra at, vestibulum vitae ipsum. Suspendisse efficitur tristique tempor.';},
            images: function() { return "../assets/images/placeholder-image.jpg"}
    }});
});
app.get('/datavis', function(request, response, next) {
    response.render('partials/datavis' ,{
        normal: true,
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
        normal: true,
        nav_1: true,
        nav_2: true,
        footer: true,
        helpers:{
            title: function () { return 'Resizer'; },
            links:function() {return '/resizer-prototype';}
    }}); 
});
app.get('/resizer-prototype', function(request, response, next) {
    response.render('partials/resizer',{
        normal: true,
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
        normal: true,
        nav_1: true,
        nav_2: true,
        footer: true,
        helpers:{
            title: function () { return 'Melkweg'; },
            links: function () { return 'http://www.melkweg.nl/nl';}
    }}); 
});


app.get('/score-app', function(request, response, next) {
    var imgEntry = [
        {"img":"../assets/images/score-appv1.png"},
        {"img":"../assets/images/score-appv2.png"},
        {"img":"../assets/images/resizer-2.png"}
    ];
    var textEntry = [
        {"text":"Schaal je afbeeldingen naar je eigen gewenste dimensies. Samen met de Antialiasering van de afbeedlingen zullen je geschaalde afbeedlingen er nog goed uitzien."},
        {"text":"Download de afbeeedling direct via een zip bestand. Je kunt als je wilt ook meedere afbeedlingen tegelijk schalen."}
    ];
    response.render('partials/item',{
        img: imgEntry,
        text: textEntry,
        normal: true,
        nav_1: true,
        nav_2: true,
        footer: true,
        helpers:{
            title: function () { return 'Score App'; },
            links: function () { return '/score-app-prototype'}
     }}); 
});
app.get('/score-app-prototype', function(request, response, next) {
    response.render('layouts/score-app',{
        normal: false,
        nav_1: false,
        nav_2: false,
        footer: false,
        helpers:{
    }}); 
});

app.get('/pathogen', function(request, response, next) {
     
    //  
    var imgEntry = [
        {"img":"../assets/images/pathogenv1.png"},
        {"img":"../assets/images/pathogenv2.png"},
        {"img":"../assets/images/pathogenv3.png"}
    ];
    var textEntry = [
        {"text":"Schaal je afbeeldingen naar je eigen gewenste dimensies. Samen met de Antialiasering van de afbeedlingen zullen je geschaalde afbeedlingen er nog goed uitzien."},
        {"text":"Download de afbeeedling direct via een zip bestand. Je kunt als je wilt ook meedere afbeedlingen tegelijk schalen."}
    ];
    response.render('partials/item',{
        img: imgEntry,
        text: textEntry,
        normal: true,
        nav_1: true,
        nav_2: true,
        footer: true,
        helpers:{
            title: function () { return 'Pathogen'; },
            links: function () { return '/pathogen-prototype';}
    }}); 
});

app.get('/pathogen-prototype', function(request, response, next) {
    response.render('layouts/pathogen',{
        normal: false,
        nav_1: false,
        nav_2: false,
        footer: false,
        helpers:{
            title: function () { return 'Score App'; },
            paragraph: function () { return 'Donec purus turpis, pellentesque et viverra at, vestibulum vitae ipsum. Suspendisse efficitur tristique tempor.';},
            images: function() { return "../assets/images/placeholder-image-4.jpg"}
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
        normal: true,
        nav_1: true,
        nav_2: true,
        footer: true,
        helpers:{
            title: function () { return 'Klassiekwijzer'; },
            paragraph: function () { return 'Donec purus turpis, pellentesque et viverra at, vestibulum vitae ipsum. Suspendisse efficitur tristique tempor.';},
            images: function() { return "../assets/images/placeholder-image-6.jpg"},
            links: function() { return "http://klassiekwijzer.avro.nl/"}
    }}); 
});

/*
 * Start the server
 */
app.listen(process.env.PORT || port );
console.log('Express started on port ' + port);