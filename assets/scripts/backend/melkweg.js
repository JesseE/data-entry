//melkweg content

module.exports.create = function(request,response){
 	var name = [
        {'name': "GIT", 'score': 15},
        {'name': "SASS", 'score': 20},
        {'name': "HTML", 'score': 10},
    ];
    var imgEntry = [
        {"img":"../assets/images/melkweg_v1.png"},
        {"img":"../assets/images/melkweg_v2.png"}
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
 		}
 	}); 
};