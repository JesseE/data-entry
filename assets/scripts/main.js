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
// $('.block-item').click(function(){	
// 	var id = $(this).attr('id');
	
// 	console.log(id + '  the value = '+ mode);
	
// 	switch (mode) {
// 		case 2:	
// 			$('.block-item').hide();
// 			$(this).show();
// 			console.log('vanish');
// 			mode = 3;
// 		break;
// 		case 3:
// 		$('.block-item').show();
// 			console.log('appear');
// 			mode = 2;
// 		break;
// 	}
// });

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
    .attr("fill", "white");

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
    .attr("fill", "white");

barC.append("rect")
    .attr("width", x3)
    .attr("height", barHeight - 1);

// var x = d3.scale.linear()
//     .domain([ 0, d3.max(allValues)])
//     .range([ 0, 250]);

//   d3.select(".removed")
//   .selectAll("div")
//     .data(additions)
//   .enter().append("div")
//     .style("width", function(d) {  return x(d) + "px"; })
//      .on("mouseover", function(d){
//         d3.select(this)
//           .append("span")
//           .style("position","absolute")
//           .style("color","white")
//           .text(function(d){ return "lines added: "+ d + "author:" + author;})
//     })
//     .on("mouseout", function(d){
//         d3.selectAll("span")
//           .remove();
//     });

// d3.select(".added")
//   .selectAll("div")
//     .data(removals)
//   .enter().append("div")
//     .style("width", function(d) { return x(d) + "px"; })
//     .on("mouseover", function(d){
//       d3.select(this)
//         .append("span")
//         .style("position","absolute")
//         .style("color","white")
//         .text(function(d) { return "lines removed: "+ d;});
//     })
//     .on("mouseout", function(d){
//       d3.selectAll("span")
//         .remove();
//     });

// // d3.select(".author")
// //   .selectAll("div")
// //     .data(author)
// //   .enter().append("p");

// // console.log('comments' + comments);
// console.log('added ' + additions);
// console.log('removed ' + removals);
// console.log('all' + allValues);
// // this didnt work because it wasnt renderd as an string.
// // the fix was to create a string out of the variables author.
// // what i want
// // [ {name: author, name: author, name: author, name: author} ]
// console.log(author);
