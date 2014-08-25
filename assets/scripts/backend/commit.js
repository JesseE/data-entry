var unirest = require('unirest');
var additions = [];
var removals = [];
var commitHash = [];
var allValues = [];
var repositories = ['melkweg'];
var owner = "grrr";
var username = 'jesseeikema',
    password = 'Eikema22';
var meta = require('../backend/meta');
var repo = require('../backend/repositories');
// need to fix this!
// if hash already exists remove the old one

var getEachCommitData = function() {
  for (var i = 0; i < repo.commitHash.length; i++) {
    repo.commitHash[i];
    unirest.get('https://bitbucket.org/api/1.0/repositories/'+owner+'/'+repositories+'/changesets/'+repo.commitHash[i]+'/diffstat').auth({
    user: username,
    pass: password,
    sendImmediately: true
  }).end(function(response){
    var dataSet = response.body;
    console.log(dataSet);
    for (var i = 0, len = dataSet.length; i < len; i++) {
      dataSet[i];
      additions.push(dataSet[i].diffstat.added);
      removals.push(dataSet[i].diffstat.removed);
      var oneCommit = [];
      oneCommit.push(dataSet[i].diffstat.added, dataSet[i].diffstat.removed);
    };
     meta.getMeta(i);
  });
  };
  allValues.push(additions, removals);
}
exports.getEachCommitData = getEachCommitData;