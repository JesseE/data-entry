// nav functionality
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
            $('header, section, footer').removeClass('menu-active');
            value = 1;
            console.log('show');
            break;
        case 1 :
            $('.nav--secundairy').show();
            $('header, section, footer').addClass('menu-active');
            value = 0;
            console.log('hide');
            break;
    }
});
var mode = 2;

// skills visualisation

var data = [
	{name: "GIT", score: 4},
 	{name: "Javascript", score: 8},
  	{name: "SASS", score: 8},
   	{name: "Node", score: 16}
];

var dataScore = [];
var dataName = [];
for (var i = 0, len = data.length; i < len; i ++){
	data[i];
	dataScore.push(data[i].score);
	dataName.push(data[i].name);
}
console.log(dataName);

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
    .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; })
    .attr("fill", "white");

bar.append("rect")
    .attr("width", x)
    .attr("height", barHeight - 1);

bar.append("text")
    .attr("x", function(d) { return  width-500; })
    .attr("y", barHeight / 2)
    .attr("dy", ".35em")
    .attr("class", "block-list--tools-container__bar")
    .data(dataName)
    .text(function(d) { return d; });

// git activity visualisation

var gitData = addData;
console.log(gitData);

var x2 = d3.scale.linear()
    .domain([0, d3.max(gitData)])
    .range([0, width]);

var chartZ = d3.select(".git-feed .added")
    .attr("width", width)
    .attr("height", barHeight * gitData.length);

var barB = chartZ.selectAll("g")
    .data(gitData)
  .enter().append("g")
    .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; })
    .attr("fill", "white")
        .on("mouseover", function(d) {
        console.log(this);
        d3.select(this)
            .style("fill", "#71B0C2")
    })
    .on("mouseout", function(d) {
        d3.select(this)
            .style("fill", "white")
    });

barB.append("rect")
    .attr("width", x2)
    .attr("height", barHeight - 1);

var gitData2 = removedData;
var minWidth = 320;
var x3 = d3.scale.linear()
    .domain([0,d3.max(gitData2)])
    .range([0,minWidth ]);

var chartX = d3.select(".git-feed .removed")
    .attr("width", 320)
    .attr("height", barHeight * gitData2.length);

var barC = chartX.selectAll("g")
    .data(gitData2)
  .enter().append("g")
    .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; })
    .attr("fill", "white")
    .on("mouseover", function(d) {
        console.log(this);
        d3.select(this)
            .style("fill", "#A61B0C")
            .append("div span")
            .style("color","white")
            .style("width", 100)
            .text(function(d){ return "comment:" + d +addedComments;});
    })
    .on("mouseout", function(d) {
        d3.select(this)
            .style("fill", "white")
        d3.selectAll("g div")
            .remove();
    });

barC.append("rect")
    .attr("width", x3)
    .attr("height", barHeight - 1);
