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
  