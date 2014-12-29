app.controller('ArticleController',[ "$scope", "$routeParams", function($scope, $routeParams) {      
   var articles = [];
    //check what itemId is requested in the routingParams
    for (var i = 0, len = articlesList.length; i < len; i++) {
        var articleItem = {},
        articleItem = articlesList[i];
        console.log(articleItem);
        if(articleItem.id === $routeParams.primaryId){
            articleItem; 
            articles.push(articleItem);
        }
    };
    
    this.items = articles;

    //render info about the datavisual for tools used

    var articleData = this.items[0].name;

    // reset/clear the existing variables
    articleDataScore = [];
    articleDataName = [];
    
    for (var i = 0, len = articleData.length; i < len; i++) {
        articleData[i];
        articleDataScore.push(articleData[i].score);
        articleDataName.push(articleData[i].name);            
    };

    if(articleDataScore.length>2){
    
    console.log(articleDataScore, articleDataName);

    /*/////////////////////////////
        tools visualisation
    *//////////////////////////////

    var xAr = d3.scale.linear()
        .domain([0, d3.max(articleDataScore)])
        .range([0, width]);

    var chartAr = d3.select(".block-list--articletools-container")
        .attr("width", width)
        .attr("height", barHeight * articleDataScore.length);

    var barAr = chartAr.selectAll("g")
        .data(articleDataScore)
      .enter().append("g")
        .attr("transform", function(d, i) { console.log(d); return "translate(0," +i * barHeight*2 + ")"; })
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
    }
}]);
