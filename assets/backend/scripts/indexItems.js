var mongoose = require('mongoose');
var db = mongoose.createConnection('mongodb://JAZZCODER:Eikema23@ds027521.mongolab.com:27521/jesseportfolio');

var schema = mongoose.Schema({ 
	title: String,
	paragraph: String,
	img: String,
	mod_block: String,
	link: String
});

var indexItem = db.model('indexitem', schema);
//creation of a model
var articles = new indexItem(
			      
);

// articles.save(function(err, articles){
//     if(err) return console.error(err);
//     return articles;      
// });
module.exports = {
    indexItem : indexItem
}