
/*
 * Express Dependencies
 */
var express = require('express');
var app = express();
var port = 3000;
var express = require('express');
var router = express.Router();
var unirest = require('unirest');
var repositories = ['melkweg'];
var jade = require('jade');
/*
 * Use Handlebars for templating
 */
var exphbs = require('express3-handlebars');
var hbs;

// For gzip compression
app.use(express.compress());

/*
 * Config for Production and Development
 */
if (process.env.NODE_ENV === 'production') {
    // Set the default layout and locate layouts and partials
    app.engine('handlebars', exphbs({
        defaultLayout: 'main',
        layoutsDir: 'dist/views/layouts/',
        partialsDir: 'dist/views/partials/'
    }));

    // Locate the views
    app.set('views', __dirname + '/dist/views');
    
    // Locate the assets
    app.use(express.static(__dirname + '/dist/assets'));

} else {
    app.engine('handlebars', exphbs({
        // Default Layout and locate layouts and partials
        defaultLayout: 'main',
        layoutsDir: 'views/layouts/',
        partialsDir: 'views/partials/'
    }));

    // Locate the views
    app.set('views', __dirname + '/views');

    // Locate the assets
    app.use(express.static(__dirname + '/')); 
    app.use(express.static(__dirname + '/assets'));

}

// Set Handlebars
app.set('view engine', 'handlebars');



/*
 * Routes
 */
// Index Page
app.get('/', function(request, response, next) {
    response.render('index', {
      helpers:{
            title: function () { return 'Resizer'; },
            paragraph: function () { return 'bitches bitch like to RESIZE bitch about those bitches';}
    }}); 
});

app.get('/post-1', function(request, response, next) {
    // var additions = [];
    // var removals = [];
    // var filenames = [];
    // var author = [];
    // var comment = [];
    // var commitHash = [];
    // var allValues = [];
    // var allCommits = [];
    // var pushCommit = [];
    // var repositories = ['melkweg'];
    // var owner = "grrr";
    // var username = 'jesseeikema',
    //     password = 'Eikema22';

    // getRepositories();
    // function getRepositories(){
    //     unirest.get('https://bitbucket.org/api/2.0/repositories/'+owner).auth({
    //       user: username,
    //       pass: password,
    //       sendImmediately: true
    //     }).end(function(response){
    //       var data = response.body.values;
    //       for (var i = 0; i < data.length; i++) {
    //         var repoList = data[i];
    //         //repositories.push(repoList.name);
    //       };
    //       getRepositoryCommits(i);
    //     console.log(repositories);
    //     });
    // }
    // function getRepositoryCommits(){
    //   unirest.get('https://bitbucket.org/api/2.0/repositories/'+owner+'/'+repositories+'/commits').auth({
    //     user: username,
    //     pass: password,
    //     sendImmediately: true
    //   }).end(function(response){
    //     var data = response.body.values;
    //     data.length =  30;
    //     for (var i = 0, len = data.length; i < len; i++) {
    //       var eachCommit = data[i];
    //       commitHash.push(eachCommit.hash);
    //       // author.push(data[i].author.raw);
    //       // comment.push(data[i].message);
    //     }
    //     getEachCommitData();
    //     // console.log(commitHash);
    //   });
    // };

    // function getEachCommitData() {
    //   for (var i = 0; i < commitHash.length; i++) {
    //     commitHash[i];
    //     unirest.get('https://bitbucket.org/api/1.0/repositories/'+owner+'/'+repositories+'/changesets/'+commitHash[i]+'/diffstat').auth({
    //     user: username,
    //     pass: password,
    //     sendImmediately: true
    //   }).end(function(response){
    //     var dataSet = response.body;
    //     // console.log(dataSet);
    //     for (var i = 0, len = dataSet.length; i < len; i++) {
    //       dataSet[i];
    //       additions.push(dataSet[i].diffstat.added);
    //       removals.push(dataSet[i].diffstat.removed);
    //       var oneCommit = [];
    //       oneCommit.push(dataSet[i].diffstat.added, dataSet[i].diffstat.removed);
    //     };
    //      getMeta(i);
    //   });
    //   };
    //   allValues.push(additions, removals);
    // };

    // function getMeta(i) {
    //   unirest.get('https://bitbucket.org/api/1.0/repositories/'+owner+'/'+repositories[0]+'/changesets/'+commitHash[i]).auth({
    //     user:username,
    //     pass:password,
    //     sendImmediately: true
    //   }).end(function(response){
    //     var dataCommit = response.body;
    //     author.push(dataCommit.author);
    //     comment.push(dataCommit.message);
    //     commitHash.push(author);
    //   });
    // };
   

    var html = jade.renderFile('views/jade/scripts.jade');
    response.render('partials/item' ,{
        // title: repositories,
        // comment: comment,
        // author: author,
        // additions: additions,
        // removals: removals,
        // allValues: allValues,
        helpers:{
            title: function () { return 'Datavisualisatie'},
            paragraph: function () { return 'bitches bitch like to Datavisualisatie bitch about those bitches';}
    }});
});
app.get('/post-2', function(request, response, next) {
    response.render('partials/item',{
        helpers:{
            title: function () { return 'Resizer'; },
            paragraph: function () { return 'bitches bitch like to RESIZE bitch about those bitches';}
    }}); 
});
app.get('/post-3', function(request, response, next) {
    response.render('partials/item',{
        helpers:{
            title: function () { return 'Melkweg'; },
            paragraph: function () { return 'bitches bitch like to Melkweg bitch about those bitches';}
    }}); 
});
app.get('/post-4', function(request, response, next) {
    response.render('partials/item',{
        helpers:{
            title: function () { return 'Score App'; },
            paragraph: function () { return 'bitches bitch like to Score App bitch about those bitches';}
    }}); 
});
app.get('/post-5', function(request, response, next) {
    response.render('partials/item',{
        helpers:{
            title: function () { return 'Eikema Reintegratie'; },
            paragraph: function () { return 'bitches bitch like to Eikema Reintegratie bitch about those bitches';}
    }}); 
});
app.get('/post-6', function(request, response, next) {
    response.render('partials/item',{
        helpers:{
            title: function () { return 'Klassiekwijzer'; },
            paragraph: function () { return 'bitches bitch like to Eikema Reintegratie bitch about those bitches';}
    }}); 
});

/*
 * Start it up
 */
app.listen(process.env.PORT || port );
console.log('Express started on port ' + port);