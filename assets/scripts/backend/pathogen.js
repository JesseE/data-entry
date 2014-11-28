//pathogen content

module.exports.create = function(request, response) {
	var name = [
        {'name': "Javascript", 'score': 20},
        {'name': "HTML", 'score': 14},
        {'name': "CSS", 'score': 13},
        {'name': "Game Dev", 'score': 20}
    ]; 
    var itemEntry = {  
        entry: [
            {
                "title": "Pathogen",     
                "links" : "/pathogen-prototype"
            },
        ],
        text : [
            {
                "sub-title": "Omschrijving",
                "text" :"Pathogen is een realtime strategy game gemaakt met javascript. Je speelt in de game als de partij van het imuunsysteem en je vecht tegen de slechte bacteriën in verschillende locaties van het menselijk lichaam.",
            },
            {
                "sub-title": "Doelstelling",
                "text" :"Je gaat de locaties af van het lichaam waar de ziektes zich bevinden. Jij bent een nanorobot die het gevecht aan gaat met de ziektes die in het lichaam zit. Je bouwt je imuunsysteem op en vecht met de antilichamen samen om het lichaam weer beter te maken.",   
            },    
        ],
        img : [
            {
                "img":"../assets/images/pathogen_v1.png"
            },
            {
                "img":"../assets/images/pathogen_v2.png"
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