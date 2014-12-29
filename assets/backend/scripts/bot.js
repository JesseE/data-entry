/*
 * a bot to prevent heroku from going to sleep FOREVER! ~(^L^)~ 
 */
var http = require('http');

var bot = function() {

var minutes = 20, the_interval = minutes * 60 * 1000;

setInterval(function() {
    var options = {
        host: 'www.jesseeikema.nl'
    };
    http.get(options, function (http_res) {
        console.log("Sent http request to www.jesseeikema.nl to stay awake.");
    });
	}, the_interval);
}
module.exports = bot;