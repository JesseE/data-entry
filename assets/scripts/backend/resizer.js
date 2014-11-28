//resizer content

module.exports.create = function(request,response){
    var name = [
        {'name': "GIT", 'score': 15},
        {'name': "SASS", 'score': 20},
        {'name': "HTML", 'score': 13},
        {'name': 'Javascript', 'score': 20},
        {'name': "JavaScript-Load-Image", 'score': 10}
    ];
    var itemEntry = {  
        entry: [
            {
                "title": "Resizer",     
                "links" : "/resizer-prototype"
            },
        ],
        text : [
            {
                "sub-title": "Omschrijving",
                "text" :"Schaal je afbeeldingen naar je eigen gewenste dimensies. Samen met de Antialiasering van de afbeeldingen zullen je geschaalde afbeeldingen er nog goed uitzien. Download de afbeeldingen direct via een zip bestand. Je kunt als je wilt ook meedere afbeeldingen tegelijkertijd schalen.",
            },
            {
                "sub-title": "Doelstelling",
                "text" :"Grrr heeft een CMS systeem voor hun klanten dat Garp heet. Zij zochten een toevoegingen waarbij je gemakkelijk meerdere afbeeldingen kan schalen. Hier werd mijn product dus voor gemaakt dat nu de Resizer heet.",   
            },    
        ],
        img : [
            {
                "img":"../assets/images/resizer_v1.png"
            },
            {
                "img":"../assets/images/resizer_v2.png"
            },
        ] 
    };
    response.render('partials/item',{
        item: itemEntry,
        normal: true,
        nav_1: true,
        nav_2: true,
        footer: true,
        helpers:{
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