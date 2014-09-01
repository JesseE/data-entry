
/*
 * Express Dependencies
 */
var express = require('express');
var app = express();
var port = 3000;

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
    response.render('index'); 
});
app.get('/post-1', function(request, response, next) {
    response.render('partials/item' ,{
        helpers:{
            title: function () { return 'Datavisualisatie'; },
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


/*
 * Start it up
 */
app.listen(process.env.PORT || port );
console.log('Express started on port ' + port);