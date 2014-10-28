//klassiekwijzer content

module.exports.create = function(request, response){
    var name = [
        {'name': "CSS", 'score': 18},
        {'name': "SMACCS", 'score': 15},
        {'name': "BEM CSS", 'score': 15},
        {'name': "GIT", 'score': 17},
        {'name': "PHP", 'score': 13}
    ];
    var imgEntry = [
        {"img":"../assets/images/klassiekwijzer_v1.png"},
        {"img":"../assets/images/klassiekwijzer_v2.png"}
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
        }
    }); 
};