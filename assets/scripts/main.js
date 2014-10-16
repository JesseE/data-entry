/*/////////////////////////////
    nav functionality
*//////////////////////////////
var value = 0;
$('.nav').click(function(){
	switch (value) {
		case 0 :
			$('.nav--off-window').show();
			$('header, section, footer').addClass('menu-active');
			value = 1;
			console.log('show');
			break;
		case 1 :
			$('.nav--off-window').hide();
			$('header, section, footer').removeClass('menu-active');
			value = 0;
			console.log('hide');
			break;
	}
});
$('a.active').hover(function(){
    switch (value) {
        case 0 :
            $('.nav--secundairy').hide();
            // $('header, section, footer').removeClass('menu-active');
            value = 1;
            console.log('show');
            break;
        case 1 :
            $('.nav--secundairy').show();
            // $('header, section, footer').addClass('menu-active');
            value = 0;
            console.log('hide');
            break;
    }
});
var mode = 2;

/*/////////////////////////////
    skills visualisation
    my first datavisualisation template!!
*//////////////////////////////
var nameData = nameContainer[0];
var scoreData = scoreContainer;

var data = [];

data.push(nameData);
data.push({score: scoreData});

dataScore = data[1].score;
dataName = data[0].name;

var width = 320,
    barHeight = 20;

var x = d3.scale.linear()
    .domain([0, d3.max(dataScore)])
    .range([0, width]);

var chart = d3.select(".block-list--tools-container")
    .attr("width", width)
    .attr("height", barHeight * dataScore.length);

var bar = chart.selectAll("g")
    .data(dataScore)
  .enter().append("g")
    .attr("transform", function(d, i) { return "translate(0," +i * barHeight*2 + ")"; })
    .attr("fill", "white");

bar.append("rect")
    .attr("width", x)
    .attr("height", barHeight - 1);

var bartext = d3.select('.skills').append("div");

bartext.selectAll("div")
    .data(dataName)
    .enter().append("text") 
    .attr("class", "block-list--tools-container__text")
    .attr("x", function(d) { return  width-500; })
    .attr("y", barHeight / 2)
    .attr("dy", ".35em")

    .text(function(d) { return d; });

/*/////////////////////////////
 git activity visualisation
*//////////////////////////////

var gitData2 = {remove : removedData};

var gitData = {add: addData};

Container.push(gitData);
Container.push(gitData2);

// console.log("add: "+Container[1].add);
// console.log("remove: "+ Container[2].remove);
// console.log("comments: "+ Container[0].comments);

var x2 = d3.scale.linear()
    .domain([0, d3.max(Container[1].add)])
    .range([0, width]);

var chartZ = d3.select(".git-feed .added")
    .attr("width", width)
    .attr("height", barHeight * Container[1].add.length);

var barB = chartZ.selectAll("g")
    .data(Container[1].add)
  .enter().append("g")
    .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; })
    .attr("fill", "#71B0C2")
        .on("mouseover", function(d, i) {
        d3.select(this)
            .style("fill", "#A61B0C")
        d3.selectAll("g div")
            .remove()
        d3.selectAll(".git-feed__comment text")
            .remove()
        d3.select(this)
            .style("fill", "white")
             d3.select('.git-feed__comment')
                .append("text")
                .style("color","#71B0C2")
                .style("width", 100)
                .text(function(d){ return ' '+ Container[0].comments[i];})
    })
    .on("mouseout", function(d) {
        d3.select(this)
            .style("fill", "71B0C2")
    });

barB.append("rect")
    .attr("width", x2)
    .attr("height", barHeight - 1);

var minWidth = 320;
var x3 = d3.scale.linear()
    .domain([0,d3.max(Container[2].remove)])
    .range([0,minWidth]);

var chartX = d3.select(".git-feed .removed")
    .attr("width", 320)
    .attr("height", barHeight * Container[2].remove.length);

var barC = chartX.selectAll(".git-feed__description")
    .data(Container[2].remove)
  .enter().append("g")
    .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; })
    .attr("fill", "#B53843")
    .on("mouseover", function(d,i) {
        d3.select(this)
            .style("fill", "#A61B0C")
        d3.selectAll("g div")
            .remove()
        d3.selectAll(".git-feed__comment text")
            .remove()
        d3.select(this)
            .style("fill", "white")
            d3.select('.git-feed__comment')
                .append("text")
                .style("color","#B53843")
                .style("width", 100)
                .text(function(d){ return ' '+ Container[0].comments[i];})
    })
    .on("mouseout", function(d) {
     d3.select(this)
            .style("fill", "B53843")
    });

barC.append("rect")
    .attr("width", x3)
    .attr("height", barHeight - 1);