    /*/////////////////////////////
    //         article models
    // *//////////////////////////////    
// app.service('articleDataService', ['$http', function($http){
//     return { 
//         get : function(){
//             $scope.documents = [];
//             $http.get('/project/:primaryID').then(function(result){
//                 $scope.documents = result.data;
//                 console.log("werkt: "+result);
//             });

//         }
//     }
// }]);

// var articlesList = {};
   

        // {
        //     id: 'melkweg',
        //     title: 'Melkweg',
        //     sub_title: 'Omschrijving',
        //     paragraphs: [
        //         {'paragraph' :"Het refactoren van de geschreven CSS/SASS code van de Melkweg."},
        //         {'paragraph' :"Ik kreeg de taak om code te vereenvoudigen aan de hand van SMACCS en BEM methodes. Tijdens het herschrijven van de code, heb ik ook de suggestie gedaan om de gemoduleerde SASS bestanden in een subfolder te plaatsen. Dit zorgde voor een betere overzicht binnen de SASS structuur van de melkweg."},
        //     ],
        //     image_thumb: '../assets/images/melkweg.png',
        //     images_src:[
        //         {'src' : '../assets/images/melkweg_v1.png'},
        //         {'src' : '../assets/images/melkweg_v2.png'},
        //     ],
        //     datavisual : [
        //         {'name': "GIT", 'score': 15},
        //         {'name': "SASS", 'score': 20},
        //         {'name': "HTML", 'score': 10},
        //     ],
        //     link: 'http://www.melkweg.nl/nl',
        // },
        // {
        //     id: 'score-app',
        //     title: 'Score-app',
        //     sub_title: 'Omschrijving',
        //     paragraphs: [
        //         {'paragraph' :'Score webapp is een applicatie waarbij je scores van een wedstrijd kunt bijhouden zowel op mobiel als op pc.'},
        //         {'paragraph' :'Deze webapp werkt aan de hand van de Leaguevine API en meerder javascript libraries. Hierdoor is het mogelijk om van de toegevoegde partijen de scores te veranderen.'},
        //     ],
        //     image_thumb:'../assets/images/score-app-logo.png',
        //     images_src:[
        //         { 'src' : '../assets/images/score-app_v1.png'},
        //         { 'src' : '../assets/images/score-app_v2.png'},
        //     ],
        //     datavisual : [
        //         {'name': "CSS", 'score': 15},
        //         {'name': "Mobile Dev", 'score': 10},
        //         {'name': "HTML", 'score': 10},
        //         {'name': "zepto.js", 'score': 17},
        //         {'name': "quo.js", 'score': 15},
        //         {'name': "leaguevine API", 'score': 15},
        //     ],
        //     link: '/score-app-prototype',
        // },
        // {
        //     id: 'klassiekwijzer',
        //     title: 'Klassiekwijzer',
        //     sub_title: 'Omschrijving',
        //     paragraphs: [
        //         {'paragraph' :'Dit moest zowel op pc als op tablet en mobiel goed te gebruiken zijn. Verder moest er ook een stap terug in de vragen reeks mogelijk worden. Uiteindelijk kon je de resultaten delen via social media.'},
        //         {'paragraph' :'Dit is een vragen reeks die uiteindelijk moet laten zien wat voor klassiekemuziek het beste bij jou past.'},
        //     ],
        //     image_thumb:'../assets/images/klassiekwijzer.png',
        //     images_src:[
        //         {'src' :'../assets/images/klassiekwijzer_v1.png'},
        //         {'src' :'../assets/images/klassiekwijzer_v2.png'},
        //     ],
        //     datavisual : [
        //         {'name': "CSS", 'score': 18},
        //         {'name': "SMACCS", 'score': 15},
        //         {'name': "BEM CSS", 'score': 15},
        //         {'name': "GIT", 'score': 17},
        //         {'name': "PHP", 'score': 13} 
        //     ],
        //     link: 'http://klassiekwijzer.avro.nl/',
        // },
        // {
        //     id: 'resizer',
        //     title: 'Resizer',
        //     sub_title: 'Omschrijving',
        //     paragraphs: [
        //         {'paragraph' :'Schaal je afbeeldingen naar je eigen gewenste dimensies. Samen met de Antialiasering van de afbeeldingen zullen je geschaalde afbeeldingen er nog goed uitzien. Download de afbeeldingen direct via een zip bestand. Je kunt als je wilt ook meedere afbeeldingen tegelijkertijd schalen.'},
        //         {'paragraph' :'Grrr heeft een CMS systeem voor hun klanten dat Garp heet. Zij zochten een toevoegingen waarbij je gemakkelijk meerdere afbeeldingen kan schalen. Hier werd mijn product dus voor gemaakt dat nu de Resizer heet.'},
        //     ],
        //     image_thumb:'../assets/images/og_grrr.png',            
        //     images_src:[
        //         { 'src' : '../assets/images/resizer_v1.png'},
        //         { 'src' : '../assets/images/resizer_v2.png'},
        //     ],
        //     datavisual : [
        //         {'name': "GIT", 'score': 15},
        //         {'name': "SASS", 'score': 20},
        //         {'name': "HTML", 'score': 10},
        //     ],
        //     link: '/resizer-prototype',
        // },
        // {
        //     id: 'datavisualisatie',
        //     title: 'Datavisualisatie',
        //     sub_title: 'Omschrijving',
        //     paragraphs: [
        //         {'paragraph' :'Een datavisualisatie van de toevoegingen en verwijderingen van regels code die in repositories van Grrr staan.'},
        //         {'paragraph' :'Een indicatie maken van de actuele code veranderingen per project van Grrr. Het was de bedoeling om gegevens van de geschreven code te laten zien door contact te maken met de API van Bitbucket.com en deze gegevens werden dan gevisualiseerd met behulp van d3.js.'},
        //     ],
        //     image_thumb:'../assets/images/datavis-logo.png',            
        //     images_src:[
        //            {'src' : ''},
        //     ],
        //     datavisual : [
        //         {'name': "GIT", 'score': 10},
        //         {'name': "Javascript", 'score': 18},
        //         {'name': "CSS / SASS", 'score': 18},
        //         {'name': "HTML", 'score': 20},
        //         {'name': "D3.js", 'score': 16},
        //         {'name': "Node.js", 'score': 17},
        //         {'name': "unirest.js", 'score': 16}
        //     ],
        // },
        // {
        //     id: 'pathogen',
        //     title: 'Pathogen',
        //     sub_title: 'Omschrijving',
        //     paragraphs: [
        //         {'paragraph' :'Pathogen is een realtime strategy game gemaakt met javascript. Je speelt in de game als de partij van het imuunsysteem en je vecht tegen de slechte bacteriën in verschillende locaties van het menselijk lichaam.'},
        //         {'paragraph' :'Je gaat de locaties af van het lichaam waar de ziektes zich bevinden. Jij bent een nanorobot die het gevecht aan gaat met de ziektes die in het lichaam zit. Je bouwt je imuunsysteem op en vecht met de antilichamen samen om het lichaam weer beter te maken.'},
        //     ],
        //     image_thumb:'../assets/images/pathogen_logo.png',            
        //     images_src:[
        //         {'src' :'../assets/images/pathogen_v1.png'},
        //         {'src' :'../assets/images/pathogen_v2.png'},
        //     ],
        //     datavisual : [
        //         {'name': "Javascript", 'score': 20},
        //         {'name': "HTML", 'score': 14},
        //         {'name': "CSS", 'score': 13},
        //         {'name': "Game Dev", 'score': 20}
        //     ],
        //     link: '/pathogen-prototype',
        // },