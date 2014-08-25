var unirest = require('unirest');
var commitHash = [];
var repositories = ['melkweg'];
var owner = "grrr";
var username = 'jesseeikema',
    password = 'Eikema22';

var commit = require('./commit');

var getRepositories = function (){
    unirest.get('https://bitbucket.org/api/2.0/repositories/'+owner).auth({
      user: username,
      pass: password,
      sendImmediately: true
    }).end(function(response){
      var data = response.body.values;
      for (var i = 0; i < data.length; i++) {
        var repoList = data[i];
        //repositories.push(repoList.name);
      };
      getRepositoryCommits();
    console.log(repositories);
    });
}
var getRepositoryCommits = function (){
    unirest.get('https://bitbucket.org/api/2.0/repositories/'+owner+'/'+repositories+'/commits').auth({
      user: username,
      pass: password,
      sendImmediately: true
    }).end(function(response){
      var data = response.body.values;
      data.length =  13;
      for (var i = 0, len = data.length; i < len; i++) {
        var eachCommit = data[i];
        commitHash.push(eachCommit.hash);
      }
      commit.getEachCommitData();
    });
}
exports.commitHash = commitHash;
exports.getRepositories = getRepositories;
exports.getRepositoryCommits = getRepositoryCommits;