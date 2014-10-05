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

/*/////////////////////////////
    skills visualisation
*//////////////////////////////

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
    .attr("fill", "white")
        .on("mouseover", function(d, i) {
        d3.select(this)
            .style("fill", "white")
        d3.selectAll("g div")
            .remove()
        d3.selectAll(".git-feed__comment text")
            .remove()
        d3.select(this)
            .style("fill", "#71B0C2")
             d3.select('.git-feed__comment')
                .append("text")
                .style("color","white")
                .style("width", 100)
                .text(function(d){ return i +' '+ Container[0].comments[i];})
    })
    .on("mouseout", function(d) {
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
    .attr("fill", "white")
    .on("mouseover", function(d,i) {
        d3.select(this)
            .style("fill", "white")
        d3.selectAll("g div")
            .remove()
        d3.selectAll(".git-feed__comment text")
            .remove()
        d3.select(this)
            .style("fill", "#A61B0C")
            d3.select('.git-feed__comment')
                .append("text")
                .style("color","white")
                .style("width", 100)
                .text(function(d){ return i +' '+ Container[0].comments[i];})
    })
    .on("mouseout", function(d) {
    });

barC.append("rect")
    .attr("width", x3)
    .attr("height", barHeight - 1);