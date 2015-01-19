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
        .when("/", {
            templateUrl: "/views/index.html",
            controller: "IndexController",
            controllerAs: "indexArticles"
        });
    }
  ]     
);

app.controller('IndexController', ['$scope','$http','$q', function($scope, $http, $q){
    var indexReq = $http.get('/data');
    $q.all([indexReq]).then(function(results){
        var indexArticles = [];
         
        angular.forEach(results, function(response){
            indexArticles.push(response.data);  
        });

        return indexArticles[0];
    }).then(function(currentCollection){
        $scope.indexArticles = currentCollection;

    }).then(function(){
        var indexArt = $scope.indexArticles;
        var indexArticle = [];
        for (var i = 0, len = indexArt.length; i < len; i++) {
            var indexItem = indexArt[i];
            indexArticle.push(indexItem);  
        };     
        indexArticles = $scope.indexArticles;
    });
        
}]);

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
        });
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

    }).then(
    function creatPie (){
        //tools d3 visualisation
        var width_pie = 250,
            height_pie = 300,
             outerRadius = 95,
            radius = Math.min(width_pie, height_pie) / 2 - 5;

        var pieData = d3.range(articleDataScore.length).map(function(d,i){ return articleDataScore[i]; }).sort(d3.descending);

        var color = ['#344E58','#527B8B','#7FBFD7','#436471', '#ACD2D7','#6F878B','#3C494B'];

        var arc = d3.svg.arc()
            .outerRadius(radius);

        var pie = d3.layout.pie();

        var svg = d3.select(".pie_container")
            .datum(pieData)
            .attr("width", width_pie)
            .attr("height", height_pie)
          .append("g")
            .attr("transform", "translate(" + 175 + "," + 175 + ")");

        var arcs = svg.selectAll("g.arc")
            .data(pie)
          .enter().append("g")
            .attr("class", "arc");


        arcs.append("path")
            .attr("fill", function(d, i) { return color[i]; })
          .transition()
            .duration(1000)
            .attrTween("d", tweenPie);

        arcs.append("svg:text")
            .attr("transform", function(d) { //set the label's origin to the center of the arc
             //we have to make sure to set these before calling arc.centroid
                d.outerRadius = outerRadius + 90; // Set Outer Coordinate
                d.innerRadius = outerRadius + 85; // Set Inner Coordinate
                return "translate(" + arc.centroid(d) + ")";
            })
            .attr("text-anchor", "middle") //center the text on it's origin
            .style("fill", "Black")
            .style("font", "bold 12px Helvetica")
            .text(function(d, i) { return articleDataName[i]; }); //get the label from our original data


        function tweenPie(b) {
            b.innerRadius = 75;
            var i = d3.interpolate({startAngle: 0, endAngle: 0}, b);
            return function(t) { return arc(i(t)); };
        }

        function tweenDonut(b) {
            b.innterRadius = radius * .6;
            var i = d3.interpolate({innerRadius: 0}, b);
            return function(t) { return arc(i(t)); };
        }

        // var barArtext = d3.select('.skills__articletext').append("div");

        //     barArtext.selectAll("div")
        //         .data(articleDataName)
        //         .enter().append("text") 
        //         .attr("class", "block-list--articletools-container__text")
        //         .attr("x", function(d) { return  width_pie-500; })
        //         .attr("y", height_pie / 2)
        //         .attr("dy", ".35em")
        //         .attr("fill", function(d, i) {return color[i]; })
        //         .text(function(d, i) { return ""+(i+1)+'.' + d; }); 

    });
}]);