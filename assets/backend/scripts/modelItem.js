var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://JAZZCODER:Eikema23@ds027521.mongolab.com:27521/jesseportfolio');

var schema = mongoose.Schema({ 
	id: {type: String},
	title: {type: String},
	sub_title: {type: String},
	paragraphs: {type: String},
	image_thumb: {type: String},
	images_src: {type: String},
	name: {type: String},
	link: {type: String}, 
});

var modelItem = db.model('ModelItem', schema);

var articles = new modelItem(
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
        }
    
    );
    
    articles.save(function(err, articles){
        if(err) return console.error(err);
    });
module.exports = modelItem; // this is what you want