var modelItem = require('./modelItem').modelItem;
module.exports.create = function(req, res){
    var async = require('async');
     async.series({
        findItem : function() {
            modelItem.find({id: req.params.primaryID},function(err, articles){
                if(err) return console.error(err);
                res.json(articles); 
            }); 
        }
    });
}   