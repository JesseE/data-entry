//score app content

module.exports.create = function(request, response){ 
	var name = [
        {'name': "CSS", 'score': 15},
        {'name': "Mobile Dev", 'score': 10},
        {'name': "HTML", 'score': 10},
        {'name': "zepto.js", 'score': 17},
        {'name': "quo.js", 'score': 15},
        {'name': "leaguevine API", 'score': 15},
	];
    var imgEntry = [
        {"img":"../assets/images/score-app_v1.png"},
        {"img":"../assets/images/score-app_v2.png"},
        {"img":"../assets/images/score-app_v3.png"}
    ];
    var textEntry = [
        {"text":"Score webapp is een applicatie waarbij je scores van een wedstrijd kunt bijhouden zowel op mobiel als op pc."},
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
        }
    }); 
};