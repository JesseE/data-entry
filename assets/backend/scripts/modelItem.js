// var mongoose = require('mongoose');
//     mongoose.connect('mongodb://localhost:27017/test', function(err, db) {
        
//         var db = mongoose.connection;
        
//         db.on('error',console.error.bind(console, 'connection error:'));
//         db.once('open',function (callback){
            
//             var itemSchema = mongoose.Schema({
//                 name: String
//             })

//             var Item = mongoose.model('Item', itemSchema)
//             // var melkweg = new Item({name: 'Melkweg'})

//             // melkweg.save(function(err, melkweg){
//             //     if(err) return console.error(err);
//             // });

//             Item.find(function(err, items){
//                 if(err) return console.error(err);
//                 return items;
//             })
//             module.exports = Item;
//             //Item.find({name: 'Melkweg'}).remove().exec();            
//         });
    
//     }); 
var mongoose = require('mongoose');
var db = mongoose.createConnection('' , 'test');

var schema = mongoose.Schema({ name: 'string' });

var modelItem = db.model('ModelItem', schema);

var melkweg = new modelItem({ name: "Melkweg"});
    melkweg.save(function(err, melkweg){
        if(err) return console.error(err);
    });



module.exports = modelItem; // this is what you want