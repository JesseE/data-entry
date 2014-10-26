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
var repository = "data-entry";
var branch = "master";

var commitsHash = [];
var commitContainer = [];
var checker = [];
var gitStats = [];
var gitMessage = [];
commitsHash.length = 30;
var commitContainerNumber = {};
commitContainerNumber.length = 90;

getAllCommitPageOne();
// getAllCommits();
// get all commit hashes
function getAllCommitPageOne (){ unirest.get('https://api.github.com/repos/JesseE/'+repository+'/commits?page=1>sha=master').auth({
    user: username,
    pass: password,
    sendImmediately: true
}).headers(header).end(function(response){
    for(var i = 0, len = commitsHash.length; i < len; ++i){
        commitContainer.push(response.body[i].sha);
    }
    getAllCommitPageTwo();   
    });
};
function getAllCommitPageTwo (){ unirest.get('https://api.github.com/repos/JesseE/'+repository+'/commits?page=2>sha=master').auth({
    user: username,
    pass: password,
    sendImmediately: true
}).headers(header).end(function(response){
    for(var i = 0, len = commitsHash.length; i < len; ++i){
        commitContainer.push(response.body[i].sha);
    }
    getAllCommitPageThree();
    });
};
function getAllCommitPageThree (){ unirest.get('https://api.github.com/repos/JesseE/'+repository+'/commits?page=3>sha=master').auth({
    user: username,
    pass: password,
    sendImmediately: true
}).headers(header).end(function(response){
    for(var i = 0, len = commitsHash.length; i < len; ++i){
        commitContainer.push(response.body[i].sha);
    }
    
    getAllStats();  
    });
};
// function getAllCommits (){ unirest.get('https://api.github.com/repos/JesseE/data-entry/commits?page=1>sha=master').auth({
//     user: username,
//     pass: password,
//     sendImmediately: true
// }).headers(header).end(function(response){
//     for(var i = 0, len = commitsHash.length; i < len; ++i){
//         commitContainer.push(response.body[i].sha);
//     }
//     getAllStats();    
//     });
// };
//addtions deletions total adjustments in a commit
function getAllStats () { 
    for(var i = 0, len = commitContainerNumber.length; i < len; ++i){
        unirest.get('https://api.github.com/repos/JesseE/'+repository+'/commits/'+commitContainer[i]).auth({
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
    for(var i = 0, len = commitContainerNumber.length; i < len; ++i){
        unirest.get('https://api.github.com/repos/JesseE/'+repository+'/commits/'+commitContainer[i]).auth({
            user: username,
            pass: password,
            sendImmediately: true
        }).headers(header).end(function(response){  
           // var object = {"comment" : response.body.commit.message};     
           console.log(gitStats);
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
        {"paragraph": "Pas de dimensies van je afbeelding aan"},
        {"paragraph": "SASS aanpassingen in de melkweg"},
        {"paragraph": "Toevoegen van actuele score's"},
        {"paragraph": "Kom erachter welke klassieke muziek bij je past"},
        {"paragraph": "RTS game gemaakt met javascript"},
    ];
    var textEntry = [
        {"text":"Als Frontend Developer is het mijn taak om ervoor te zorgen dat interactie tussen de gebruiker en digitale interactieve producten soepel en gebruiksvriendelijk gebeurt."},
        {"text":"Tijdens het programeren splits ik mijn code afhankelijk van zijn functies in aparte modules, zodat het achteraf makkelijk te onderhouden is"},
        {"text":"Naast dat aparte modules een duidelijk overzicht maakt van de geschreven code, is het ook eenvoudig om het in een andere project toe te voegen. Dit maakt de code een stuk beter herbruikbaar. Je hoeft dus niet meer van niks te beginnen, dit scheelt veel tijd."}
    ];
    var name = [
        {'name': "GIT", 'score': 10},
        {'name': "Javascript", 'score': 18},
        {'name': "SASS", 'score': 18},
        {'name': "HTML", 'score': 20},
        {'name': "D3.js", 'score': 16},
        {'name': "Node.js", 'score': 17},
        {'name': "Express.js", 'score': 18},
        {'name': "Heroku", 'score': 16},
        {'name': "Game Dev", 'score': 16},
        {'name': "Mobile Dev", 'score': 15}
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
                if(gitStats.length == 90) {
                    var added = [];
                    for ( var i = 0, len = gitStats.length; i < len; i ++ ){
                        added.push(gitStats[i].additions);
                    };
                    if(added.length == 90){
                        return added;
                    }
                }
            },
            removed: function() {
                if(gitStats.length == 90) {
                    var removed = [];
                    for(var i = 0, len = gitStats.length; i < len; i ++ ){
                        removed.push(gitStats[i].deletions);
                    }
                    if(removed.length == 90) {
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
            name: function () {
               
                var nameBucket = [];

                for (var i = 0, len = name.length; i < len; i ++){
                    name[i];
                    nameBucket.push(name[i].name);
                  
                }
                return nameBucket;
            },
            score: function() {
                var scoreBucket = [];

                for (var i = 0, len = name.length; i < len; i ++){
                    name[i];
                    scoreBucket.push(name[i].score);
                }
                return scoreBucket;
            }

    }});
});


// posts page
app.get('/datavisualisatie', function(request, response, next) {
    var name = [
        {'name': "GIT", 'score': 10},
        {'name': "Javascript", 'score': 18},
        {'name': "CSS / SASS", 'score': 18},
        {'name': "HTML", 'score': 20},
        {'name': "D3.js", 'score': 16},
        {'name': "Node.js", 'score': 17},
        {'name': "unirest.js", 'score': 16}
    ];
    var imgEntry = [
        {"img":"../assets/images/datavisV1.png"},
        {"img":"../assets/images/resizer-11.png"},
        {"img":"../assets/images/resizer-2.png"}
    ];
    var textEntry = [
        {"text":"Datavisualisatie van toevoegingen en verwijderijgen van code die op Bitbucket staat van de werknemers van Grrr. "},
        {"text":"Een indicatie maken van de actuele code veranderingen per project van Grrr. Het was de bedoeling om gegevens van de geschreven code te laten zien door contact te maken met de API van Bitbucket.com en deze gegevens werden dan gevisualiseerd met behulp van d3.js."}
    ];
    response.render('partials/item' ,{
        img: imgEntry,
        text: textEntry,
        normal: true,
        nav_1: true,
        nav_2: true,
        footer: true,
        helpers:{
            title: function () { return 'Datavisualisatie'},
            links: function () { return ''},
            paragraph: function () { return 'Donec purus turpis, pellentesque et viverra at, vestibulum vitae ipsum. Suspendisse efficitur tristique tempor.';},
            images: function() { return "../assets/images/placeholder-image.jpg"},
            name: function () {
               
                var nameBucket = [];

                for (var i = 0, len = name.length; i < len; i ++){
                    name[i];
                    nameBucket.push(name[i].name);
                  
                }
                return nameBucket;
            },
            score: function() {
                var scoreBucket = [];

                for (var i = 0, len = name.length; i < len; i ++){
                    name[i];
                    scoreBucket.push(name[i].score);
                }
                return scoreBucket;
            }
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
    var name = [
        {'name': "GIT", 'score': 15},
        {'name': "SASS", 'score': 20},
        {'name': "HTML", 'score': 13},
        {'name': 'Javascript', 'score': 20},
        {'name': "JavaScript-Load-Image", 'score': 10}
    ];
    var imgEntry = [
        {"img":"../assets/images/resizer-08.png"},
        {"img":"../assets/images/resizer-11.png"},
        {"img":"../assets/images/resizer-2.png"}
    ];
    var textEntry = [
        {"text":"Schaal je afbeeldingen naar je eigen gewenste dimensies. Samen met de Antialiasering van de afbeedlingen zullen je geschaalde afbeedlingen er nog goed uitzien. Download de afbeeldingen direct via een zip bestand. Je kunt als je wilt ook meedere afbeedlingen tegelijk schalen."},
        {"text":"Grrr heeft een CMS systeem voor hun klanten dat Garp heet. En ze zochten een toevoegingen waarbij je gemakkelijk meerdere afbeeldingen kan schalen. Hier werd mijn product dus voor gemaakt dat nu de Resizer heet."}
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
            links:function() {return '/resizer-prototype';},
            name: function () {
               
                var nameBucket = [];

                for (var i = 0, len = name.length; i < len; i ++){
                    name[i];
                    nameBucket.push(name[i].name);
                  
                }
                return nameBucket;
            },
            score: function() {
                var scoreBucket = [];

                for (var i = 0, len = name.length; i < len; i ++){
                    name[i];
                    scoreBucket.push(name[i].score);
                }
                return scoreBucket;
            }
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
    var name = [
        {'name': "GIT", 'score': 15},
        {'name': "SASS", 'score': 20},
        {'name': "HTML", 'score': 10},
    ];
    var imgEntry = [
        {"img":"../assets/images/melkwegv1.png"},
        {"img":"../assets/images/melkwegv2.png"},
        {"img":"../assets/images/resizer-2.png"}
    ];
    var textEntry = [
        {"text":"Het refactoren van de geschreven CSS/SASS code van de Melkweg."},
        {"text":"Ik kreeg de taak om code te vereenvoudigen aan de hand van SMACCS en BEM methodes. Tijdens het herschrijven van de code, heb ik ook de suggestie gedaan om de gemoduleerde SASS bestanden in een subfolder te plaatsen. Dit zorgde voor een betere overzicht binnen de SASS structuur van de melkweg."}
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
            links: function () { return 'http://www.melkweg.nl/nl';},
            name: function () {
               
                var nameBucket = [];

                for (var i = 0, len = name.length; i < len; i ++){
                    name[i];
                    nameBucket.push(name[i].name);
                  
                }
                return nameBucket;
            },
            score: function() {
                var scoreBucket = [];

                for (var i = 0, len = name.length; i < len; i ++){
                    name[i];
                    scoreBucket.push(name[i].score);
                }
                return scoreBucket;
            }
    }}); 
});


app.get('/score-app', function(request, response, next) {
    var name = [
        {'name': "CSS", 'score': 15},
        {'name': "Mobile Dev", 'score': 10},
        {'name': "HTML", 'score': 10},
        {'name': "zepto.js", 'score': 17},
        {'name': "quo.js", 'score': 15},
        {'name': "leaguevine API", 'score': 15},
    ];
    var imgEntry = [
        {"img":"../assets/images/score-appv1.png"},
        {"img":"../assets/images/score-appv2.png"},
        {"img":"../assets/images/resizer-2.png"}
    ];
    var textEntry = [
        {"text":"Score webapp is een applicatie waarbij je scores van een wedstrijd kunt bij houden zowel op mobiel als op pc."},
        {"text":"Deze webapp werkt aan de hand van de Leaguevine API en meerder javascript libraries. Hierdoor is het mogelijk om van de toegevoegde partijen de scores te veranderen."}
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
            links: function () { return '/score-app-prototype'},
            name: function () {
               
                var nameBucket = [];

                for (var i = 0, len = name.length; i < len; i ++){
                    name[i];
                    nameBucket.push(name[i].name);
                  
                }
                return nameBucket;
            },
            score: function() {
                var scoreBucket = [];

                for (var i = 0, len = name.length; i < len; i ++){
                    name[i];
                    scoreBucket.push(name[i].score);
                }
                return scoreBucket;
            }
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
    var name = [
        {'name': "Javascript", 'score': 20},
        {'name': "HTML", 'score': 14},
        {'name': "CSS", 'score': 13},
        {'name': "Game Dev", 'score': 20}
    ]; 
    var imgEntry = [
        {"img":"../assets/images/pathogenv1.png"},
        {"img":"../assets/images/pathogenv2.png"},
        {"img":"../assets/images/pathogenv3.png"}
    ];
    var textEntry = [
        {"text":"Pathogen is een realtime strategy game gemaakt met javascript. Je speelt in de game als de partij van het imuunsysteem en je vecht tegen de slechte bacteriën in verschillende locaties van het menselijk lichaam."},
        {"text":"Je gaat de locaties af van het lichaam waar de ziektes zich bevinden. Jij bent een nanorobot die het gevecht aan gaat met de ziektes die in het lichaam zit. Je bouwt je imuunsysteem op en vecht met de antilichamen samen om het lichaam weer beter te maken."}
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
            links: function () { return '/pathogen-prototype';},
            name: function () {
               
                var nameBucket = [];

                for (var i = 0, len = name.length; i < len; i ++){
                    name[i];
                    nameBucket.push(name[i].name);
                  
                }
                return nameBucket;
            },
            score: function() {
                var scoreBucket = [];

                for (var i = 0, len = name.length; i < len; i ++){
                    name[i];
                    scoreBucket.push(name[i].score);
                }
                return scoreBucket;
            }
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
    var name = [
        {'name': "CSS", 'score': 18},
        {'name': "SMACCS", 'score': 15},
        {'name': "BEM CSS", 'score': 15},
        {'name': "GIT", 'score': 17},
        {'name': "PHP", 'score': 13}
    ];
    var imgEntry = [
        {"img":"../assets/images/klassiekwijzerv1.png"},
        {"img":"../assets/images/klassiekwijzerv2.png"},
        {"img":"../assets/images/resizer-2.png"}
    ];
    var textEntry = [
        {"text":"Dit is een vragen reeks die uiteindelijk moet laten zien wat voor klassiekemuziek het beste bij jou past."},
        {"text":"Dit moest zowel op pc als op tablet en mobiel goed te gebruiken zijn. Verder moest er ook een stap terug in de vragen reeks mogelijk worden. Uiteindelijk kon je de resultaten delen via social media."}
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
            links: function() { return "http://klassiekwijzer.avro.nl/"},
            name: function () {
                var nameBucket = [];

                for (var i = 0, len = name.length; i < len; i ++){
                    name[i];
                    nameBucket.push(name[i].name);
                  
                }
                return nameBucket;
            },
            score: function() {
                var scoreBucket = [];

                for (var i = 0, len = name.length; i < len; i ++){
                    name[i];
                    scoreBucket.push(name[i].score);
                }
                return scoreBucket;
            }
    }}); 
});

/*
 * Start the server
 */
app.listen(process.env.PORT || port );
console.log('Express started on port ' + port);