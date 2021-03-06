// /*/////////////////////////////
//     nav functionality
// *//////////////////////////////
(function(){ 
    var navigation = {
        interaction : function() {
            var value = 1;
            $('nav').click(function(){
            	switch (value) {
            		case 0 :
                        $('.nav--off-window').show();
            			$('header, section, footer').addClass('menu-active');
            			value = 1;
            			break;
            		case 1 :
            			$('.nav--off-window').hide();
                        $('.nav--secundairy').hide();
            			$('header, section, footer').removeClass('menu-active');
            			value = 0;
            			break;
            	}
            });
            $('.active').click(function(){
                switch (value) {
                    case 0 :
                        $('.nav--secundairy').hide();
                        value = 1;
                        break;
                    case 1 :
                        $('.nav--secundairy').show();
                        value = 0;
                        break;
                }
            });
            $('.non-active').click(function(){
                switch (value) {
                    case 0 :
                        $('.nav--off-window').show();
                        $('.nav--secundairy').hide();
                        value = 1;
                        break;
                    case 1 :
                        $('.nav--secundairy').hide();
                        value = 0;
                        break;
                }
            });
            $('section').click(function(){ 
                $('.nav--secundairy').hide();
            });
            $('.header').click(function(){ 
                $('.nav--secundairy').hide();
            });
            $('.cms-tool__add-item').on('click', function(){
                $('.add-item__form').show();
            });
            $('.add-item__form-back').on('click', function(){
                $('.add-item__form').hide();
            });
            var mode = 2;
        }
    };
    navigation.interaction();
/*/////////////////////////////
    skills visualisation
*//////////////////////////////
    var gitVisualisation = {

        createSkillVisual : function(){
            var nameData = nameContainer[0];
            var scoreData = scoreContainer;

            var data = [];

            data.push(nameData);
            data.push({score: scoreData});

            dataScore = data[1].score;
            dataName = data[0].name;

            // var width = 320,
            var width =  420,
                barHeight = 20;
                
            //mobile or desktop responsive visualisation
            if( window.innerWidth <= 1600 ){ 
                width = 330;
            };
            if ( window.innerWidth <= 1280 ) {
                width = 255;
            };
            if ( window.innerWidth <= 1000 ) {
                width = 220;
            };
            // if ( window.innerWidth <= 500 ) {
            //     width = 230;
            // };
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
        },
    /*/////////////////////////////
     git activity visualisation
    *//////////////////////////////
        // only load on screen larger than 500px  
        boundariesVisual: function() {
            if(window.innerWidth > 500){
            // fetched array's
            var gitBarHeight = 9;
            var gitData2 = {remove : removedData};
            var gitData = {add: addData};

                if(gitData.length = 90){ 

                    Container.push(gitData);
                    Container.push(gitData2);

                    // limiters
                    var addedArray = Container[1].add;
                    for (var i = 0, len = addedArray.length; i < len; i++ ){
                        addedArray[i];
                        if( addedArray[i] > 300 ){
                            addedArray[i] = 300;        
                        }
                        if( addedArray[i] < 20 ){
                            addedArray[i] = 25;
                        }
                    } 
                    var removedArray = Container[2].remove;
                    for (var i = 0, len = removedArray.length; i < len; i++ ){
                        removedArray[i];
                        if( removedArray[i] > 300 ){
                            removedArray[i] = 300;        
                        }
                        if( removedArray[i] < 20 ){
                            removedArray[i] = 25;
                        }
                    } 
                }
            }
            gitVisualisation.createVisual(gitBarHeight, gitData2, gitData, addedArray, removedArray);
        },
        createVisual: function(gitBarHeight, gitData2, gitData, addedArray, removedArray) {    
            //range and domain visual
            var x2 = d3.scale.linear()
                .domain([0, 300])
                .range([0, 300]);

            var chartZ = d3.select(".git-feed .added")
                .attr("width", 300)
                .attr("height", gitBarHeight * addedArray.length);

            var barB = chartZ.selectAll("g")
                .data(addedArray)
              .enter().append("g")
                .attr("transform", function(d, i) { return "translate(0," + (i * gitBarHeight)*4 +")"; })
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
                                    if( addedArray[i] >= 300 ){ return "more than 300 lines of code is added";}  
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
                .domain([0,300])
                .range([0,300]);

           d3.select(".git-feed__legend")
              .append("g")
              .append("text")
                .text(function(){ return "removed code";})      
              .append("svg")
              .attr('class', 'legenda')
                .append("rect")
                .attr("width", 25)
                .attr("height", 25)
                .attr("fill", "#A61B0C");    
            
           d3.select(".git-feed__legend")
              .append("g")
              .append("text")
                .text(function(){ return "added code";})
              .append("svg")
              .attr('class', 'legenda')
                .append("rect")
                .attr("width", 25)
                .attr("height", 25)
                .attr("fill", "#71B0C2");    

            var chartX = d3.select(".git-feed .removed")
                .attr("width", 300)
                .attr("height", gitBarHeight * removedArray.length);

            var barC = chartX.selectAll(".git-feed__description")
                .data(removedArray)
              .enter().append("g")
                .attr("transform", function(d, i) { return "translate(0," + (2+(i * gitBarHeight))*4 + ")"; })
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
                                if( removedArray[i] >= 300 ){ return "more than 300 lines of code is removed";}  
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
        }
    }
    gitVisualisation.createSkillVisual();
    gitVisualisation.boundariesVisual();
})();