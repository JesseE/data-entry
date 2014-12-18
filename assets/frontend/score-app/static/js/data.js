var SCOREAPP = SCOREAPP || {};
(function () {
          
   //get data
   SCOREAPP.ajax = {

            getGameDataObjects: function(){

            console.log('stap5'); 
            $('#ajaxloader').show();
            
            SCOREAPP.appGameData = microAjax("https://api.leaguevine.com/v1/games/?offset=20&season_id=20167&limit=20&access_token=82996312dc", 
            
            function(data){
                //haal data op van leaguevine en parse de data zodat het bruikbare waardes worden
                var dataG = JSON.parse(data);
                var gameData = [];
                var gameDataId = [];
                var gameDataName = [];
                var gameDataScore = [];

                for (var i = dataG.objects.length - 1; i >= 0; i--) {                    
                        gameData.push(dataG.objects[i]);
                        gameDataId.push(dataG.objects[i].id);
                        gameDataName.push(dataG.objects[i].team_1.name, dataG.objects[i].team_2.name);
                        gameDataScore.push(dataG.objects[i].team_1_score, dataG.objects[i].team_2_score);
                }
                  
                //view templating mustache       
                var gameTemplate = '{{#gameData}}<ul class="gamelist"><li class="gameID">{{id}}</li>{{#team_1}}<li><h5>{{name}}</h5></li>{{/team_1}}<li><h3>{{team_1_score}}</h3></li><li><h2>-</h2></li><li><h3>{{team_2_score}}</h3></li>{{#team_2}}<li><h5>{{name}}</h5></li>{{/team_2}}</ul>{{/gameData}}';
                
                //apply templating to html
                var html = Mustache.to_html(gameTemplate, {gameData: gameData,gameDataId : gameDataId, gameDataName:gameDataName, gameDataScore: gameDataScore});
                

                var load = $('#gametemplate').html(html);     
                
                $('#ajaxloader').hide();
                
                $('.gameID').hide();
                console.log(gameDataScore);
                console.log(gameDataName);
 
                   /*if(html){
                    
                    $("section>ul").css("opacity", "1");
                    $("section>ul").animate({
                        opacity: "1"
                    }, 500);

                   }  */  
                     
                $('.gamelist').click(function(e){
                        
                        e.preventDefault();
                        //select the object
                        
                        var gamesDataID = [];
                        
                        for (var i = gameData.length - 1; i >= 0; i--) {                                             
                            gamesDataID.push(gameData[i].id);                                                
                        }      

                        var gameid = this.firstChild.innerHTML;
 
                        var gameObjId = JSON.parse(gameid);
                        
                        //console.log(gameObjId);                                                                        

                        var gameidtype = $.type(gameObjId);
                        
                        //if gameid of selected object is equal to gamedataid show only the selected data
                        if(this.gameObjId === gameDataId[i]){
                                $(this).addClass('active'); 
                                $('.headnav').hide();                                                                 
                                $('#updatescore').show();                               
                                $('#back').show();
                                $('.gamelist').hide();
                                $('.gameFilter').hide();
                                $('.active').show();                            
                        }
                        $('#back').click(function(e){
                                e.preventDefault();
                                if($('.gamelist').hasClass('active')){
                                    $('.gamelist').removeClass('active');
                                }
                                $('#updatescore').hide();
                                $('#back').hide();   
                                $('.headnav').show();
                                $('.gameFilter').show();
                                $('.gamelist').show();                    
                        });
                        //select object out of array
                        var access_number = '82996312dc';
                		var access_token = '&access_token=' + access_number;                                                                  
                        
                        $('button.updateTeamScore').click(function(e){
                            e.preventDefault();
                            $.ajax({
                                    dataType: "json",
                                    type: "POST",
                                    url: "https://api.leaguevine.com/v1/game_scores/",                                                                                        
                                    headers:{
                                            Authorization: 'bearer ' + access_number
                                    },
                                    contentType: "application/json",
                                    data:JSON.stringify({        
                                            game_id : gameObjId,        
                                            team_1_score: $('input.updateTeam1Score').val(),
                                            team_2_score: $('input.updateTeam2Score').val(),
                                            is_final: "true"                                                                                                
                                            
                                    }),
                            
                                    success:function(){
                                             window.location.reload();
                                    }                                                                              
                        });
                        });
                });                                                    
            });
},            
            getRankingDataObjects: function(){ 
            
            console.log('stap6');
            
            $('#ajaxloader').show();                                     
            //get rankingData  

            SCOREAPP.appRankingData = microAjax("https://api.leaguevine.com/v1/pools/19222/",
                        function(data){
                                var dataR = JSON.parse(data);
                                var rankingData=[];
                                for (var i = dataR.standings.length - 1; i >= 0; i--) {
                                                rankingData.push(dataR.standings[i]);                                                                
                                }
                                
                 
                                //view
                                var rankingTemplate = 
                                '{{#rankingData}}<ul class="rankinglist">{{#team}}<li>{{name}}</li>{{/team}}<li>{{points_scored}}</li><li>{{points_allowed}}</li><li>{{losses}}</li><li>{{games_played}}</li></ul>{{/rankingData}}';
                                //apply to html
                                var html = Mustache.to_html(rankingTemplate, {rankingData: rankingData});
                                $('#rankingtemplate').html(html);        
                                $('#ajaxloader').hide();  

                });   
            },
            
            getScheduleDataObjects: function(){    
            
            console.log('stap7');  
            
            $('#ajaxloader').show();            
            //get scheduleData            
            
            SCOREAPP.appScheduleData= microAjax("https://api.leaguevine.com/v1/pools/?tournament_id=19389&access_token=5397f697c0",
                        function(data){
                                var dataS = JSON.parse(data);
                                var scheduleData = [];
                                        
                                        for (var i = dataS.objects.length - 1; i >= 0; i--) {
                                                scheduleData.push(dataS.objects[i]);                                                                        
                                        }
                                        console.log(scheduleData);
                                 
                                //view        
                                var scheduleTemplate = 
                                '{{#scheduleData}}<ul class="schedulelist"><li>{{name}}</li>{{#standings}}{{#team}}<li>{{name}}</li>{{/team}}{{/standings}}</ul>{{/scheduleData}}';
                                //apply to html         
                                var html = Mustache.to_html(scheduleTemplate, {scheduleData : scheduleData});
                                $('#scheduletemplate').html(html);
                                $('#ajaxloader').hide();                              
                                               
                        });
}
}
})();