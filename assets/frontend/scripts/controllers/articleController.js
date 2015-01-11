var articleDataName = [];
var articleDataScore = [];

//spa routing with angular

var app = angular.module('myApp', ["ngRoute"]).
  config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
      $locationProvider.html5Mode(true).hashPrefix('!');
      $routeProvider
        .when("/project/:primaryID", {
            templateUrl: "/views/app.html",
            controller: "ArticleController",
            controllerAs: "article"
        })
    }
  ]     
);

app.controller('ArticleController',[ "$scope", "$routeParams", "$http", "$q", function($scope, $routeParams, $http, $q) {
    //spa routing data request
    var first = $http.get('/project/'+$routeParams.primaryID+'/data');
    //data containers
    var articleDataScore = [];
    var articleDataName = [];

    //use promises for requesting and handling the returned data
    $q.all([first]).then(function(result) {
        //create article container
        var article = [];
        //return the response results
        angular.forEach(result, function(response) {
            article.push(response.data[0]);
        }
    );
       return article[0];
    }).then(function(tmpResult) {
        //save the temporary results
        $scope.article = tmpResult;

    }).then(function(){     
        //collect data in article variable for usage in template
        article = $scope.article;
        var articleData = article.datavisual;
        //push data into their respective containers
        for (var i = 0, len = articleData.length; i < len; i++) {
            articleData[i];
            articleDataScore.push(articleData[i].score);
            articleDataName.push(articleData[i].name);
        };

    }).then(function(){
        //tools d3 visualisation
        var width = 400,
            gitBarHeight = 9,
            barHeight = 20;
    
        var xAr = d3.scale.linear()
            .domain([0, d3.max(articleDataScore)])
            .range([0, width]);

        var chartAr = d3.select(".block-list--articletools-container")
            .attr("width", width)
            .attr("height", barHeight * articleDataScore.length);

        var barAr = chartAr.selectAll("g")
            .data(articleDataScore)
          .enter().append("g")
            .attr("transform", function(d, i) { return "translate(0," +i * barHeight*2 + ")"; })
            .attr("fill", "#344E58");
        
        barAr.append("rect")
            .attr("width", xAr)
            .attr("height", barHeight - 1);

        var barArtext = d3.select('.skills__articletext').append("div");

        barArtext.selectAll("div")
            .data(articleDataName)
            .enter().append("text") 
            .attr("class", "block-list--articletools-container__text")
            .attr("x", function(d) { return  width-500; })
            .attr("y", barHeight / 2)
            .attr("dy", ".35em")
            .attr("fill", "#344E58")
            .text(function(d) { return d; }); 
    });
}]);