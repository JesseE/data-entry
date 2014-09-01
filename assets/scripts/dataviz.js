 var additions = [];
    var removals = [];
    var filenames = [];
    var author = [];
    var comment = [];
    var commitHash = [];
    var allValues = [];
    var allCommits = [];
    var pushCommit = [];
    var repositories = ['melkweg'];
    var owner = "grrr";
    var username = 'jesseeikema',
        password = 'Eikema22';

    getRepositories();
    function getRepositories(){
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
          getRepositoryCommits(i);
        console.log(repositories);
        });
    }
    function getRepositoryCommits(){
      unirest.get('https://bitbucket.org/api/2.0/repositories/'+owner+'/'+repositories+'/commits').auth({
        user: username,
        pass: password,
        sendImmediately: true
      }).end(function(response){
        var data = response.body.values;
        data.length =  30;
        for (var i = 0, len = data.length; i < len; i++) {
          var eachCommit = data[i];
          commitHash.push(eachCommit.hash);
          // author.push(data[i].author.raw);
          // comment.push(data[i].message);
        }
        getEachCommitData();
        // console.log(commitHash);
      });
    };

    function getEachCommitData() {
      for (var i = 0; i < commitHash.length; i++) {
        commitHash[i];
        unirest.get('https://bitbucket.org/api/1.0/repositories/'+owner+'/'+repositories+'/changesets/'+commitHash[i]+'/diffstat').auth({
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
         getMeta(i);
      });
      };
      allValues.push(additions, removals);
    };

    function getMeta(i) {
      unirest.get('https://bitbucket.org/api/1.0/repositories/'+owner+'/'+repositories[0]+'/changesets/'+commitHash[i]).auth({
        user:username,
        pass:password,
        sendImmediately: true
      }).end(function(response){
        var dataCommit = response.body;
        author.push(dataCommit.author);
        comment.push(dataCommit.message);
        commitHash.push(author);
      });
      // console.log(author);
    };