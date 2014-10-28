// datavisual content

module.exports.create = function(request, response, next) {  
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
        {"img":"../assets/images/datavis_v1.png"}
    ];
    var textEntry = [
        {"text":"Een datavisualisatie van de toevoegingen en verwijderingen van regels code die in repositories van Grrr staan. "},
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