var singleplayer = {
	// Begin single player campaign
	start: function(levelNumber){
		if(!levelNumber){
			levelNumber = 0;
		}
		// Hide the starting menu layer
		$('.gamelayer').hide();
		//screens.show('loading_screen');

		// Begin with the first level
		singleplayer.currentLevel = levelNumber;
		game.type = "singleplayer";
		game.team = "blue";
		
		var saveGame;
		if( typeof(levelNumber) === 'string'){
			saveGame = levelNumber;
		}

		// Finally start the level
		singleplayer.startLevel(saveGame);
	},
	
	currentLevel: 0,

	startLevel: function(saveGame){
		// If a savegame must be loaded.
		if(saveGame){
			game.loadSaved = true;
			saveGame = 'savegame_1';

			var savedData = JSON.parse(localStorage.getItem(saveGame));
			if(!savedData){
				saveGame = false;
				console.log('No save game found');
				screens.show('start_screen');
				return;
			}
			var savedItems = savedData.items;
			var levelData = savedData.level;
			var html = savedData.html;
			
			// Begin with the first level
			singleplayer.currentLevel = levelData.levelNumber;
		}

		// Load all the items for the level
		game.addResources();
		var level = maps.singleplayer[singleplayer.currentLevel];

		// Don't allow player to enter mission until all assets for the level are loaded
		$("#startmission").attr("disabled", true);

		// Load all the assets for the level
		game.currentMapImage = loader.loadImage(level.mapImage);
		game.originalMapImage = loader.loadImage(level.mapImage);
		if(level.mapOverlay){
			game.overlayImages = [];
			
			for (var i = 0; i < level.mapOverlaySequence.length; i++){
				game.overlayImages[i] = loader.loadImage(level.mapOverlaySequence[i]);
			}
		}

		game.currentLevel = level;
		game.offsetX = saveGame ? levelData.offsetX : level.startX * game.gridSize;
		game.offsetY = saveGame ? levelData.offsetY : level.startY * game.gridSize;

		// Load level Requirements 
		game.resetArrays();
		for (var type in level.requirements){
			var requirementArray = level.requirements[type];
			for (var i=0; i < requirementArray.length; i++) {
				var name = requirementArray[i];
				if (window[type]){
					window[type].load(name);
				} else {
					console.log('Could not load type :',type);
				}
			};
		}

		if(saveGame){
			// Zet alle triggers weer terug in het level.
			for (var i = 0; i < levelData.triggers.length; i++){
				var savedTrigger = levelData.triggers[i];
				var newTrigger = level.triggers[i];

				var trigger = $.extend({}, savedTrigger, newTrigger);
				game.triggers[i] = trigger;
				//level.triggers[i] = trigger;
			}
			// Add alle items die gesaved waren.
			for (var i = savedItems.length - 1; i >= 0; i--){
				var itemDetails = savedItems[i];
				game.add(itemDetails);
			};
			// Geef alle items hun oorspronkelijke orders weer terug.
			for (var i = 0; i < game.items.length; i++){
				var item = game.items[i];
				// Geef de items weer hun oorspronkelijke orders mee.
				if(item.orders){
					if(item.orders.toUid){
						//console.log('Load: item.orders.toUid', item.uid, item.orders.toUid);
						game.sendCommand([item.uid],{type: item.orders.type, toUid: item.orders.toUid});
						
					}
				}
				if(item.type == "bullets"){
					item.target = game.getItemByUid(item.targetUid);
				}
			}

			// Restore messages as they were
			$('#gamemessages').html(html.gamemessages);
			$('#objective_text').html(html.objective);

			game.triggerTimer = levelData.triggerTimer;
		}else{
			// Stop de standaard triggers in een array
			game.triggers = $.extend(true, [], level.triggers);
			game.objectives = $.extend(true, [], level.objectives);
			level.currentObjective = 0;

			// Laad de normale items uit het level.
			for (var i = level.items.length - 1; i >= 0; i--){
				var itemDetails = level.items[i];
				game.add(itemDetails);
			};
		}

		game.mapDangerousTerrain = [];

		// Create a grid that stores all obstructed tiles as 1 and unobstructed as 0
	    game.currentMapTerrainGrid = [];
	    for (var y=0; y < level.mapGridHeight; y++) {
	        game.currentMapTerrainGrid[y] = [];
	       	for (var x=0; x< level.mapGridWidth; x++) {
				game.currentMapTerrainGrid[y][x] = 0;
			}
	    };
	    // Make obstructed tiles to be 1.
		for (var i = level.mapObstructedTerrain.length - 1; i >= 0; i--){			
			var obstruction = level.mapObstructedTerrain[i];
			game.currentMapTerrainGrid[obstruction[1]][obstruction[0]] = 1;
		};
		game.currentMapPassableGrid = undefined;
		
		// Load Starting Cash For Game
		game.cash = saveGame ? $.extend([],levelData.cash) : $.extend([],level.cash);
	
		// Enable the enter mission button once all assets are loaded
		if (loader.loaded){
			screens.show('mission_screen');
			screens.startBriefing(level);
			$("#startmission").removeAttr("disabled");
		} else {
			loader.onload = function(){
				screens.show('mission_screen');
				screens.startBriefing(level);
				$("#startmission").removeAttr("disabled");
			}
		}	

	},
	
	play: function(){
		sounds.play("startGame");
		sounds.stop('splashMusic');
		$('.screen_mute_button').hide();

		fog.initLevel();
		game.animationLoop();						
		game.animationInterval = setInterval(game.animationLoop,game.animationTimeout);
		// Set the timer for the triggers
		game.triggerTimer = game.triggerTimer;
		if(!game.loadSaved){
			game.triggerTimer = 0;
		}

		game.triggerInterval = setInterval(function(){
			game.checkTriggers();
		}, 1000);
		game.start();
	},	
	sendCommand:function(uids,details){
		game.processCommand(uids,details);
	},
	endLevel:function(success){
		clearInterval(game.animationInterval);
		game.end();

		if (success){
			var moreLevels = (singleplayer.currentLevel < maps.singleplayer.length-2);
			if (moreLevels){
				screens.showPopup("mission_completed", function(){
					$('#messageboxscreen').hide();
					singleplayer.currentLevel++;
					singleplayer.startLevel();
				});
			} else {
				screens.showPopup("last_mission", function(){
					$('#messageboxscreen').hide();
					var level = maps.singleplayer[maps.singleplayer.length-1];
					screens.show('outro_screen');
					screens.startBriefing(level, '#outroscreen');
				});
			}
		} else {
			screens.showPopup("mission_failed", function(){
				$('#messageboxscreen').hide();
				singleplayer.startLevel();
			});
		}
	}
};