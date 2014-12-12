var articleDataName = [];
var articleDataScore = [];

//spa routing with angular
var app = angular.module('myApp', ["ngRoute"]).
  config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
      $locationProvider.html5Mode(true).hashPrefix('!');
      $routeProvider
        .when("/projects/:primaryId", {
            templateUrl: "views/app.html",
            controller: "ArticleController",
            controllerAs: "article"
        })
    }
  ]     
);

app.controller('ArticleController',["$scope", "$routeParams", function($scope, $routeParams) {      
   var articles = [];
    
    //check what itemId is requested in the routingParams
    for (var i = 0, len = articlesList.length; i < len; i++) {
        var articleItem = {},
        articleItem = articlesList[i];
        console.log(articleItem);
        if(articleItem.id === $routeParams.primaryId){
            articleItem; 
            articles.push(articleItem);
        }
    };
    
    this.items = articles;

    //render info about the datavisual for tools used

    var articleData = this.items[0].name;

    // reset/clear the existing variables
    articleDataScore = [];
    articleDataName = [];
    
    for (var i = 0, len = articleData.length; i < len; i++) {
        articleData[i];
        articleDataScore.push(articleData[i].score);
        articleDataName.push(articleData[i].name);            
    };

    if(articleDataScore.length>2){
    
    console.log(articleDataScore, articleDataName);

    /*/////////////////////////////
        tools visualisation
    *//////////////////////////////

    var xAr = d3.scale.linear()
        .domain([0, d3.max(articleDataScore)])
        .range([0, width]);

    var chartAr = d3.select(".block-list--articletools-container")
        .attr("width", width)
        .attr("height", barHeight * articleDataScore.length);

    var barAr = chartAr.selectAll("g")
        .data(articleDataScore)
      .enter().append("g")
        .attr("transform", function(d, i) { console.log(d); return "translate(0," +i * barHeight*2 + ")"; })
        .attr("fill", "#344E58");
    
    barAr.append("rect")
        .attr("width", xAr)
        .attr("height", barHeight - 1);

    var barArtext = d3.select('.skills__articletext').append("div");

    barArtext.selectAll("div")
        .data(articleDataName)
        .enter().append("text") 
        .attr("class", "block-list--articletools-container__text")
        .attr("x", function(d) { return  width-500; })
        .attr("y", barHeight / 2)
        .attr("dy", ".35em")
        .attr("fill", "#344E58")
        .text(function(d) { return d; });
    }
}]);

    /*/////////////////////////////
            article models
    *//////////////////////////////
    var articlesList = [
        {
            id: 'melkweg',
            title: 'Melkweg',
            sub_title: 'Omschrijving',
            paragraphs: [
                "Het refactoren van de geschreven CSS/SASS code van de Melkweg.",
                "Ik kreeg de taak om code te vereenvoudigen aan de hand van SMACCS en BEM methodes. Tijdens het herschrijven van de code, heb ik ook de suggestie gedaan om de gemoduleerde SASS bestanden in een subfolder te plaatsen. Dit zorgde voor een betere overzicht binnen de SASS structuur van de melkweg.",
            ],
            image_thumb: '../assets/images/melkweg.png',
            images_src:[
                '../assets/images/melkweg_v1.png',
                '../assets/images/melkweg_v2.png',
            ],
            name : [
                {'name': "GIT", 'score': 15},
                {'name': "SASS", 'score': 20},
                {'name': "HTML", 'score': 10},
            ],
            link: 'http://www.melkweg.nl/nl',
        },
        {
            id: 'score-app',
            title: 'Score-app',
            sub_title: 'Omschrijving',
            paragraphs: [
                'Score webapp is een applicatie waarbij je scores van een wedstrijd kunt bijhouden zowel op mobiel als op pc.',
                'Deze webapp werkt aan de hand van de Leaguevine API en meerder javascript libraries. Hierdoor is het mogelijk om van de toegevoegde partijen de scores te veranderen.',
            ],
            image_thumb:'../assets/images/score-app-logo.png',
            images_src:[
                '../assets/images/score-app_v1.png',
                '../assets/images/score-app_v2.png',
            ],
            name : [
                {'name': "CSS", 'score': 15},
                {'name': "Mobile Dev", 'score': 10},
                {'name': "HTML", 'score': 10},
                {'name': "zepto.js", 'score': 17},
                {'name': "quo.js", 'score': 15},
                {'name': "leaguevine API", 'score': 15},
            ],
            link: '/score-app-prototype',
        },
        {
            id: 'klassiekwijzer',
            title: 'Klassiekwijzer',
            sub_title: 'Omschrijving',
            paragraphs: [
                'Dit moest zowel op pc als op tablet en mobiel goed te gebruiken zijn. Verder moest er ook een stap terug in de vragen reeks mogelijk worden. Uiteindelijk kon je de resultaten delen via social media.',
                'Dit is een vragen reeks die uiteindelijk moet laten zien wat voor klassiekemuziek het beste bij jou past.',
            ],
            image_thumb:'../assets/images/klassiekwijzer.png',
            images_src:[
                '../assets/images/klassiekwijzer_v1.png',
                '../assets/images/klassiekwijzer_v2.png',
            ],
            name : [
                {'name': "CSS", 'score': 18},
                {'name': "SMACCS", 'score': 15},
                {'name': "BEM CSS", 'score': 15},
                {'name': "GIT", 'score': 17},
                {'name': "PHP", 'score': 13} 
            ],
            link: 'http://klassiekwijzer.avro.nl/',
        },
        {
            id: 'resizer',
            title: 'Resizer',
            sub_title: 'Omschrijving',
            paragraphs: [
                'Schaal je afbeeldingen naar je eigen gewenste dimensies. Samen met de Antialiasering van de afbeeldingen zullen je geschaalde afbeeldingen er nog goed uitzien. Download de afbeeldingen direct via een zip bestand. Je kunt als je wilt ook meedere afbeeldingen tegelijkertijd schalen.',
                'Grrr heeft een CMS systeem voor hun klanten dat Garp heet. Zij zochten een toevoegingen waarbij je gemakkelijk meerdere afbeeldingen kan schalen. Hier werd mijn product dus voor gemaakt dat nu de Resizer heet.',
            ],
            image_thumb:'../assets/images/og_grrr.png',            
            images_src:[
                '../assets/images/resizer_v1.png',
                '../assets/images/resizer_v2.png',
            ],
            name : [
                {'name': "GIT", 'score': 15},
                {'name': "SASS", 'score': 20},
                {'name': "HTML", 'score': 10},
            ],
            link: '/resizer-prototype',
        },
        {
            id: 'datavisualisatie',
            title: 'Datavisualisatie',
            sub_title: 'Omschrijving',
            paragraphs: [
                'Een datavisualisatie van de toevoegingen en verwijderingen van regels code die in repositories van Grrr staan.',
                'Een indicatie maken van de actuele code veranderingen per project van Grrr. Het was de bedoeling om gegevens van de geschreven code te laten zien door contact te maken met de API van Bitbucket.com en deze gegevens werden dan gevisualiseerd met behulp van d3.js.',
            ],
            image_thumb:'../assets/images/datavis-logo.png',            
            images_src:[

            ],
            name : [
                {'name': "GIT", 'score': 10},
                {'name': "Javascript", 'score': 18},
                {'name': "CSS / SASS", 'score': 18},
                {'name': "HTML", 'score': 20},
                {'name': "D3.js", 'score': 16},
                {'name': "Node.js", 'score': 17},
                {'name': "unirest.js", 'score': 16}
            ],
        },
        {
            id: 'pathogen',
            title: 'Pathogen',
            sub_title: 'Omschrijving',
            paragraphs: [
                'Pathogen is een realtime strategy game gemaakt met javascript. Je speelt in de game als de partij van het imuunsysteem en je vecht tegen de slechte bacteriën in verschillende locaties van het menselijk lichaam.',
                'Je gaat de locaties af van het lichaam waar de ziektes zich bevinden. Jij bent een nanorobot die het gevecht aan gaat met de ziektes die in het lichaam zit. Je bouwt je imuunsysteem op en vecht met de antilichamen samen om het lichaam weer beter te maken.',
            ],
            image_thumb:'../assets/images/pathogen_logo.png',            
            images_src:[
                '../assets/images/pathogen_v1.png',
                '../assets/images/pathogen_v2.png',
            ],
            name : [
                {'name': "Javascript", 'score': 20},
                {'name': "HTML", 'score': 14},
                {'name': "CSS", 'score': 13},
                {'name': "Game Dev", 'score': 20}
            ],
            link: '/pathogen-prototype',
        },
    ]   


// itemUri();

// function itemUri () {
//     var itemUri = [];
//     itemsAttribute(itemUri);
// };

// function itemsAttribute (itemUri) {
//     for (var i = 0, len = articlesList.length; i < len; i++) {
//         articlesList[i];
//         itemUri.push(articlesList[i].id);
//     };
//     logResults(itemUri);
// };
// function getCurrentItem () {

// }


// function logResults (itemUri){
//     console.log(itemUri);
// }


