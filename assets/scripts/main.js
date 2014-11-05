// /*/////////////////////////////
//     nav functionality
// *//////////////////////////////

var value = 1;
if ( window.innerWidth < 1280 ) {
    $('.nav--off-window').hide();
};
$('nav').click(function(){
	switch (value) {
		case 0 :
			$('.nav--off-window').show();
			$('header, section, footer').addClass('menu-active');
			value = 1;
			console.log('show');
			break;
		case 1 :
			$('.nav--off-window').hide();
            $('.nav--secundairy').hide();
			$('header, section, footer').removeClass('menu-active');
			value = 0;
			console.log('hide');
			break;
	}
});
$('.active').click(function(){
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
$('.non-active').click(function(){
    switch (value) {
        case 0 :
            $('.nav--off-window').show();
            $('.nav--secundairy').hide();
            // $('header, section, footer').removeClass('menu-active');
            value = 1;
            console.log('show');
            break;
        case 1 :

            $('.nav--secundairy').hide();
            // $('header, section, footer').addClass('menu-active');
            value = 0;
            console.log('hide');
            break;
    }
});
$('section').click(function(){ 
    $('.nav--secundairy').hide();
});
$('.header').click(function(){ 
    $('.nav--secundairy').hide();
});
var mode = 2;

/*/////////////////////////////
    skills visualisation
    my first datavisualisation template
*//////////////////////////////
var nameData = nameContainer[0];
var scoreData = scoreContainer;

var data = [];

data.push(nameData);
data.push({score: scoreData});

dataScore = data[1].score;
dataName = data[0].name;

// var width = 320,
var width =  {},
    barHeight = 20;
    
//mobile or desktop responsive visualisation
    width = 420;
if( window.innerWidth <= 1600 ){ 
    width = 330;
};
if ( window.innerWidth <= 1280 ) {
    width = 300;
};
if ( window.innerWidth <= 500 ) {
    width = 230;
};
// start d3 visual
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
    .attr("fill", "#344E58");

bar.append("rect")
    .attr("width", x)
    .attr("height", barHeight - 1);

var bartext = d3.select('.skills__text').append("div");

bartext.selectAll("div")
    .data(dataName)
    .enter().append("text") 
    .attr("class", "block-list--tools-container__text")
    .attr("x", function(d) { return  width-500; })
    .attr("y", barHeight / 2)
    .attr("dy", ".35em")
    .attr("fill", "#344E58")
    .text(function(d) { return d; });

/*/////////////////////////////
 git activity visualisation
*//////////////////////////////
// only load on screen larger than 500px

if(window.innerWidth > 500){
console.log("visual is calc"); 

// fetched array's
var gitBarHeight = 10;
var gitData2 = {remove : removedData};
var gitData = {add: addData};

if(gitData.length = 90){ console.log(gitData.length);

Container.push(gitData);
Container.push(gitData2);

// console.log("add: "+Container[1].add);
// console.log("remove: "+ Container[2].remove);
// console.log("comments: "+ Container[0].comments);

// limiters
var addedArray = Container[1].add;
for (var i = 0, len = addedArray.length; i < len; i++ ){
    addedArray[i];
    if( addedArray[i] > 1000 ){
        addedArray[i] = 500;        
    }
    if( addedArray[i] < 20 ){
        addedArray[i] = 25;
    }
} 

var removedArray = Container[2].remove;
for (var i = 0, len = removedArray.length; i < len; i++ ){
    removedArray[i];
    if( removedArray[i] > 1000 ){
        removedArray[i] = 500;        
    }
    if( removedArray[i] < 20 ){
        removedArray[i] = 25;
    }
} 

//range and domain visual
var x2 = d3.scale.linear()
    .domain([0, 500])
    .range([0, 500]);

var chartZ = d3.select(".git-feed .added")
    .attr("width", 300)
    .attr("height", gitBarHeight * addedArray.length);

var barB = chartZ.selectAll("g")
    .data(addedArray)
  .enter().append("g")
    .attr("transform", function(d, i) { return "translate(0," + i * gitBarHeight + ")"; })
    .attr("fill", "#71B0C2")
        .on("mouseover", function(d, i) {
        d3.select(this)
            .style("fill", "#A61B0C")
        d3.selectAll("g div")
            .remove()
        d3.selectAll(".git-feed__comment text")
            .remove()
        d3.selectAll(".git-feed__description text")
            .remove()
        d3.select(this)
                .style("fill", "white")
                d3.select('.git-feed__comment')
                    .append("text")
                    .style("color","#FFF")
                    .text(function(d){   
                        if( addedArray[i] <= 25 ){ return "less than 25 lines of code is added";}
                        if( addedArray[i] >= 500 ){ return "more than 500 lines of code is added";}  
                        return addedArray[i] + ' lines of code are added';})
                d3.select('.git-feed__description')
                    .append("text")
                    .style("color", "#FFF")
                    .text(function(d){   
                        return "message: " + Container[0].comments[i];})
    })
    .on("mouseout", function(d) {
        d3.select(this)
            .style("fill", "#71B0C2")
    });

barB.append("rect")
    .attr("width", x2)
    .attr("height", gitBarHeight - 1);

var x3 = d3.scale.linear()
    .domain([0,500])
    .range([0,500]);

var chartX = d3.select(".git-feed .removed")
    .attr("width", 300)
    .attr("height", gitBarHeight * removedArray.length);

var barC = chartX.selectAll(".git-feed__description")
    .data(removedArray)
  .enter().append("g")
    .attr("transform", function(d, i) { return "translate(0," + i * gitBarHeight + ")"; })
    .attr("fill", "#B53843")
    .on("mouseover", function(d,i) {
        d3.select(this)
            .style("fill", "#A61B0C")
        d3.selectAll("g div")
            .remove()
        d3.selectAll(".git-feed__comment text")
            .remove()
        d3.selectAll(".git-feed__description text")
            .remove()
        d3.select(this)
            .style("fill", "white")
           d3.select('.git-feed__comment')
                    .append("text")
                    .style("color","#FFF")
                    .text(function(d){   
                        if( removedArray[i] <= 25 ){ return "less than 25 lines of code is removed";}
                        if( removedArray[i] >= 500 ){ return "more than 500 lines of code is removed";}  
                        return removedArray[i] + ' lines of code are removed';})
                d3.select('.git-feed__description')
                    .append("text")
                    .style("color", "#FFF")
                    .text(function(d){   
                        return "message: " + Container[0].comments[i];})
    })
    .on("mouseout", function(d) {
     d3.select(this)
            .style("fill", "#B53843")
    });

barC.append("rect")
    .attr("width", x3)
    .attr("height",gitBarHeight - 1);

    } else{
        console.log("no vis calc! yey!");
    }
}