var indexItem = require('./indexItems').indexItem;
module.exports.create = function(req, res){
    var async = require('async');
     async.series({
        findItem : function() {
            indexItem.find({},function(err, articles){
                if(err) return console.error(err);
                res.json(articles); 
            }); 
        }
    });
}   