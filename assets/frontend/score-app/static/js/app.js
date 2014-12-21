var SCOREAPP = SCOREAPP || {};

(function () {

		SCOREAPP.gamepage = {
		        };
		SCOREAPP.rankingpage = {       
		        };
		SCOREAPP.schedulepage = {  
		        };

        // Controller Init
        SCOREAPP.controller = {

                init: function () {
                        console.log('stap2');       
                        // Initialize router
                        SCOREAPP.router.init();
                        SCOREAPP.functions.init();
                        SCOREAPP.gestures.init();
                }

        };

        // Router
        SCOREAPP.router = {

                init: function () {
                        //routie js finds the correct page by making a function for each page with corresponding page tag 
                        //and rendering it
                          routie({
                            '*': function(){
                            SCOREAPP.page.render('gamepage');
                            SCOREAPP.ajax.getGameDataObjects();
                            },
                            'score-app-prototype/gamepage': function() {
                            //render gamepage  
                            SCOREAPP.page.render('gamepage');         
                            SCOREAPP.ajax.getGameDataObjects();
                            },
                            '/rankingpage': function() {
                            //render rankingpage
                            SCOREAPP.page.render('rankingpage'); 
                            SCOREAPP.ajax.getRankingDataObjects();                           			
                            },         
                            '/schedulepage': function() {
                            //render schedule page
                            SCOREAPP.page.render('schedulepage'); 
                            SCOREAPP.ajax.getScheduleDataObjects();
                            }
                        });
                },
                //if there is a page change select te corresponding route and data-bind to display on the page 
                change: function () {  

                    console.log('stap4');       

                    //slice creates new array
                    var route = window.location.hash.slice(2),
                    //selecting the section element
                        sections = qwery('section'),
                    //selecting the data route attribute and adding the route like gamepage to it
                        section = qwery('[data-route=' + route + ']')[0];
                    //selecting the data bind attribute and adding the route corresponding to the page
                        bind = qwery ('[data-bind= ' + route + ']')[0];
                    // Show active section, hide all other
                    if (section) {
                            //for each section that remove class active
                            for (var i=0; i < sections.length; i++){
                                sections[i].classList.remove('active');
                            }
                            //else add class active
                            section.classList.add('active');
                    }
                    // Default route
                    if (!route) {

                            sections[0].classList.add('active');
                    }
                }
        };
        // Pages
        SCOREAPP.page = {

                //render the current page

                render: function (route) {
                    // http://javascriptweblog.wordpress.com/2010/04/19/how-evil-is-eval/
                    //var data = eval('SCOREAPP.'+route);
                    var data = SCOREAPP[route];
                    console.log('stap3');       

                    //selecting the corresponding route
                    Transparency.render(qwery('[data-route='+route+']')[0], data);
                   
                    //if there is a change in route render the route
                    SCOREAPP.router.change();
                    //console.log(data);
                }

        }
        SCOREAPP.functions = {
            //functions for highlighting current page
            init: function() { 
                
                var navHighlight = $('nav ul.headnav li a');
                
                $(navHighlight).click(function(){
                    
                    if($(navHighlight).hasClass('active')){
                        $(navHighlight).removeClass('active');
                    };
                    
                    $(this).addClass('active');
                
                });
            }
        }
        SCOREAPP.gestures = {   
                    //on router change
                
                    //swipe prev data out

                    // swipe next data in     
                init: function(){

                    var linksFiles = [];

                    for (var i = SCOREAPP.links.files.length - 1; i >= 0; i--) {
                        
                        SCOREAPP.links.files[i];
                        
                        linksFiles.push(SCOREAPP.links.files[i]);

                    };
                   
                    console.log(linksFiles);  

                    var swipedleft = $('#content'); 

                    $$(swipedleft).swipeLeft(function(e){
                        
                        e.preventDefault();
                            
                            console.log('swipe left'); 
                            
                            $(swipedleft).animate({
                                translateX: '-500px',
                                opacity: '0',
                            }, 500, 'ease-out', function() { 
                                
                                var index = linksFiles.indexOf(window.location.href);
                                console.log("you swipedleft and the index is "+ index);
                                
                                var counterforwards = (index + 1);
                                    if (counterforwards === 3){
                                        counterforwards = 2;
                                        window.location.href = linksFiles[counterforwards];
                                    } 
                                
                                console.log("count " + counterforwards);
                               
                                window.location.href = linksFiles[counterforwards];
                                
                                $(swipedleft).animate({
                                    opacity: '1',
                                    translateX: '0px'
                                }, 500, 'ease-in');
                                //console.log(linksFiles.length);
                            });
                    });   

                
                    var swipedright = $('#content');

                        $$(swipedright).swipeRight(function(e){
                            
                            e.preventDefault();
                            
                            console.log('swipe right'); 
                            
                            $(swipedright).animate({
                                translateX: '500px',
                                opacity: '0',
                            }, 500, 'ease-out', function() { 
                                //counter start at current position in array
                                var index = linksFiles.indexOf(window.location.href);     
                                console.log("you swipedright and the index of the last page is "+ index);
                                counterbackwards = (index - 1);
                                
                                if (counterbackwards === -1){
                                    counterbackwards = 0;
                                    window.location.href = linksFiles[counterbackwards];
                                } 
                                
                                window.location.href = linksFiles[counterbackwards];
                                
                                $(swipedright).animate({
                                    opacity:'1',
                                    translateX: '0px'
                                },500);
                            });
                        });       
                }
        };
        //put the links in an array
        SCOREAPP.links = { 
                    links: [
                            // "http://www.jesseeikema.nl/test/index.html#/schedulepage", 
                            // "http://www.jesseeikema.nl/test/index.html#/rankingpage",
                            // "http://www.jesseeikema.nl/test/index.html#/gamepage"                 
                    ],
                    files: [
                            // "file:///C:/Users/JESSE/Documents/IAM%20Studie%20Dossier/jaar%204/FED2/API/API%20leaguevine/index.html#/schedulepage",
                            // "file:///C:/Users/JESSE/Documents/IAM%20Studie%20Dossier/jaar%204/FED2/API/API%20leaguevine/index.html#/rankingpage",
                            // "file:///C:/Users/JESSE/Documents/IAM%20Studie%20Dossier/jaar%204/FED2/API/API%20leaguevine/index.html#/gamepage"    
                        
                    ]    
                }; 
        // DOM ready
        domready(function () {
                // Kickstart application
                console.log('stap1');  
                SCOREAPP.controller.init();                  
        });       
})();
//BREAKDOWN
//FUNC ANI
//gestures