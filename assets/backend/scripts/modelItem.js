var mongoose = require('mongoose');
var db = mongoose.createConnection('mongodb://JAZZCODER:Eikema23@ds027521.mongolab.com:27521/jesseportfolio');

var schema = mongoose.Schema({ 
	id: String,
	title: String,
	sub_title: String,
	paragraphs: String,
	image_thumb: String,
	images_src: [{src: String}],
	name: [{name: String , score: Number}],
	link: String, 
});

var modelItem = db.model('ModelItem', schema);
//creation of a model
var articles = new modelItem(
// {
//             id: 'pathogen',
//             title: 'Pathogen',
//             sub_title: 'Omschrijving',
//             paragraphs: [
//                 'Pathogen is een realtime strategy game gemaakt met javascript. Je speelt in de game als de partij van het imuunsysteem en je vecht tegen de slechte bacteriën in verschillende locaties van het menselijk lichaam.',
//                 'Je gaat de locaties af van het lichaam waar de ziektes zich bevinden. Jij bent een nanorobot die het gevecht aan gaat met de ziektes die in het lichaam zit. Je bouwt je imuunsysteem op en vecht met de antilichamen samen om het lichaam weer beter te maken.',
//             ],
//             image_thumb:'../assets/images/pathogen_logo.png',            
//             images_src:[
//                 {'src' :'../assets/images/pathogen_v1.png'},
//                 {'src' :'../assets/images/pathogen_v2.png'},
//             ],
//             name : [
//                 {'name': "Javascript", 'score': 20},
//                 {'name': "HTML", 'score': 14},
//                 {'name': "CSS", 'score': 13},
//                 {'name': "Game Dev", 'score': 20}
//             ],
//             link: '/pathogen-prototype',
//         }
);

// articles.save(function(err, articles){
//     if(err) return console.error(err);
//     return articles;      
// });
module.exports = {
    modelItem : modelItem
}