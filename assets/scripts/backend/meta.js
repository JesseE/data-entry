var unirest = require('unirest');
var author = [];
var comment = [];
var commitHash = [];
var repositories = ['melkweg'];
var owner = "grrr";
var username = 'jesseeikema',
    password = 'Eikema22';
var commit = require('./commit');
var repo = require('../backend/repositories');

var getMeta = function (i) {
  unirest.get('https://bitbucket.org/api/1.0/repositories/'+owner+'/'+repositories[0]+'/changesets/'+repo.commitHash[i]).auth({
    user:username,
    pass:password,
    sendImmediately: true
  }).end(function(response){
    var dataCommit = response.body;
    author.push(dataCommit.author);
    comment.push(dataCommit.message);
    commitHash.push(author);
  });
  console.log(author);
}
exports.getMeta = getMeta;
exports.author = author;