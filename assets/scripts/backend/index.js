//request js lib 
var unirest = require('unirest');

//github request repos
var username = "JesseE";
var password = "Eikema22";
var header = {'user-agent': 'node.js'};
var repository = "data-entry";
var branch = "master";
var done = false;

var commitsHash = [];
var commitContainer = [];
var checker = [];
var gitStats = [];
var gitMessage = [];

commitsHash.length = 30;
var commitContainerNumber = {};
commitContainerNumber.length = 90;

// get all commit hashes
getAllCommitPageOne();
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
            var object = response.body.commit.message;
            object = object.replace(/(\r\n|\n|\r)/gm,"");
            gitMessage.push(object); 
            completeReq();  
        });

    };
};
function completeReq() {
    done = true;
};

homePage = true;
actionPage = false;
contentPage = false;

console.log('homepage = '+homePage, 'contentpage = '+contentPage, 'contentpage = '+ actionPage);

//module index create function
module.exports.create = function(request, response){ 
    //make sure you have values in github response
    //console.log(gitMessage);
    var container = [];
    for ( var i = 0, len = gitMessage.length; i < len; i ++ ){
        gitMessage[i];
        var bucket = gitMessage[i];
        JSON.parse("[\"bucket[i]\"]");  
        container.push(bucket);
    };
    var itemEntry = {   
        entry: [
            {
                "title": "Datavisualisatie",
                "paragraph": "visualisatie van coding activiteit",
                "img": "./assets/images/datavis-logo.png",
                "mod-block": "odd"
            },
            {
                "title": "Resizer",
                "paragraph": "Pas de dimensies van je afbeelding aan",
                "img": "./assets/images/og_grrr.png",
                "mod-block": "even bla"
            },
            {
                "title": "Melkweg",
                "paragraph": "SASS aanpassingen in de melkweg",
                "img": "./assets/images/melkweg.png",
                "mod-block": "odd blo"
            },
            {
                "title": "Score app",
                "paragraph": "Toevoegen van actuele score's",
                "img": "./assets/images/score-app-logo.png",
                "mod-block": "even fourth"
            },
            {
                "title": "Klassiekwijzer",
                "paragraph": "Kom erachter welke klassieke muziek bij je past",
                "img": "./assets/images/klassiekwijzer.png",
                "mod-block": "odd fifth"
            },
            {
                "title": "Pathogen",
                "paragraph": "RTS game gemaakt met javascript",
                "img": "./assets/images/pathogen_logo.png",
                "mod-block": "even sixth"
            },
        ]
    };
    var textEntry = {
        visie: [
            {
                "title": "Werkwijze",
                "text":"Als Frontend Developer is het mijn taak om ervoor te zorgen dat interactie tussen de gebruiker en digitale interactieve producten vloeiend en gebruiksvriendelijk gebeurt.",
                "img": "../assets/images/modularv1.png",
                "mod-description":"right",
                "mod-container":"left"
            },   
            {
                "title": "Modulair",
                "text":"Tijdens het programeren splits ik mijn code afhankelijk van zijn functies op in aparte modules, zodat het achteraf makkelijk te onderhouden is",
                "img": "../assets/images/modularv4.png",
                "mod-description":"reverse",
                "mod-container":"reverse"
            },
            {
                "title": "Herbruikbaar",
                "text":"Naast dat aparte modules een duidelijk overzicht maakt van de geschreven code, is het ook eenvoudig om het in een andere project toe te voegen. Dit maakt de code een stuk beter herbruikbaar. Je hoeft dus niet meer van niks te beginnen, dit scheelt veel tijd.",
                "img": "../assets/images/modularv2.png",
                "mod-description":"right",
                "mod-container":"left"
            },
        ],
        tijdlijn: [
            {
                "title": "Haboes",
                "link":"http://www.haboes.nl",
                "mod-period": "--left",
                "mod-item":"--left",
                "mod-description": "--left",
                "sub-title": "Javascript",
                "text":"Begonnen met het gebruiken van javascript op een hogere niveau. Importeren van library's en API's aanroepen. De concepten van OOP beginnen door te dringen."
            },
            {
                "title": "Datavisualisatie",
                "link":"http://d3js.org",
                "mod-period": "",
                "mod-item":"",
                "mod-description": "",
                "sub-title": "D3",
                "text":"Tijdens het volgen van lessen over datavisualisatie leerde ik d3.js gebruiken. Hiermee kwam de concepten van het bouwen van visualisaties naar voren. Denk aan enter(), update() en exit()."
            },
            {
                "title": "Grrr",
                "link":"http://www.grrr.nl",
                "mod-period": "--left",
                "mod-item":"--left",
                "mod-description": "--left",
                "sub-title": "GIT & SASS",
                "text":"Veel geleerd in deze periode over hoe handig GIT cli kan zijn. En de eerste stappen met SASS gemaakt. Denk hierbij aan het toepassen van SMACSS en BEM methodes voor gestructureerde en herbruikbare CSS."
            },
            {
                "title": "afstuderen",
                "link":"http://expressjs.com/",
                "mod-period": "--active",
                "mod-item":"",
                "mod-description": "",
                "sub-title": "Express",
                "text":"Naarmate ik steeds grotere projecten ging doen, werd een betere stuctuur steeds  meer essentieel, daarom ben ik begonnen met een framework genaamd Express.js."
            },
        ]
    };
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
    //if true start rendering
    response.render('index', {  
        text: textEntry,
        item: itemEntry,
        datavisual: true,
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
                if(gitStats.length == 90){
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
        }
    });
};