var overlay = {
	overlayName: null,

	timeCount: 0, 		// Seconds passed
	imageCount: 0,
	overlayTime: null,	// Seconds 

	lastImageNumber: 0,
	phase: 0,

	timer: function(){
		if(!game.paused){
			overlay.timeCount ++;

			if(overlay.timeCount == overlay.overlayTime){
				overlay.resetOverlay();
			}
		}
	},

	init: function(overlayData){
		var level = maps.singleplayer[singleplayer.currentLevel];

		// Als er een mapOverlay is, maak hem dan.
		if(level.mapOverlay){
			var name = overlayData.name;
			overlay.overlayName = overlayData.name;
			switch (name){
				case 'acid':
					sounds.play("gurgle", false, 400);
					overlay.startAcid(overlayData.time);
					overlay.createDangerousTerrain(level);
					break;
				case 'blood':
					overlay.startBlood(overlayData.number);
					overlay.createDangerousTerrain(level);
					break;
			}
			this.animateType = 'show';
		}
	},

	startAcid: function(time){
		// Start timer
		overlay.timeCount = 0;
		this.interval = setInterval(overlay.timer, 1000);
		this.overlayTime = time;
		this.active = true;
	},

	startBlood: function(number){
		// Start timer
		overlay.lastImageNumber += number;
		this.active = true;
	},

	animateOverlay: function(type){
		switch(type){
			case "show":
				overlay.imageCount ++;

				if (overlay.overlayName == 'acid'){
					if(overlay.imageCount == game.overlayImages.length){
						overlay.animateType = 'active';
					}
				}else if (overlay.overlayName == 'blood'){
					if(overlay.imageCount == overlay.lastImageNumber){
						overlay.animateType = 'active';
						overlay.active = false;
					}
				}

				refreshMap();
				break;
			case "hide":
				refreshMap();

				overlay.imageCount --;
				if(overlay.imageCount == 0){
					overlay.animateType = 'inactive';
				}
				break;
		}
		function refreshMap(){
			game.currentMapImage = game.overlayImages[overlay.imageCount-1];
			game.refreshBackground = true;
		}
	},

	createDangerousTerrain: function(level){
		if(overlay.overlayName == 'acid'){
			game.mapDangerousTerrainGrid = $.extend(true,[],game.currentMapTerrainGrid);
			// Make dangerous tiles to be 2.
			for (var i = level.mapDangerousTerrain.length - 1; i >= 0; i--){			
				var dangerous = level.mapDangerousTerrain[i];
				game.mapDangerousTerrainGrid[dangerous[1]][dangerous[0]] = 2;
				//game.currentMapTerrainGrid[dangerous[1]][dangerous[0]] = 2;
			};
		}else if(overlay.overlayName == 'blood'){
			// Als er nog geen grid gemaakt is, maak hem aan.
			if(!game.mapDangerousTerrainGrid){
				game.mapDangerousTerrainGrid = $.extend(true,[],game.currentMapTerrainGrid);
			}
			
			// Maak alle betreffende vakjes dangerous.
			var dangerousArray = level.mapDangerousTerrain[overlay.phase];
			for (var i = dangerousArray.length - 1; i >= 0; i--){			
				var dangerous = dangerousArray[i];
				game.mapDangerousTerrainGrid[dangerous[1]][dangerous[0]] = 2;
			};
			overlay.phase ++;
		}
	},

	removeDangerousTerrain: function(level){
		// Make dangerous tiles to be 2.
		for (var i = level.mapDangerousTerrain.length - 1; i >= 0; i--){			
			var dangerous = level.mapDangerousTerrain[i];
			game.mapDangerousTerrainGrid[dangerous[1]][dangerous[0]] = 0;
			//game.currentMapTerrainGrid[dangerous[1]][dangerous[0]] = 0;
			sounds.soundPause("gurgle");
			sounds.play("background1");
		};
	},

	checkDangerous: function(item){
		// Check if vehicle is on dangerous terrain
		var x = Math.floor(item.x);
		var y = Math.floor(item.y);
		if(game.mapDangerousTerrainGrid){
			var currentTile = game.mapDangerousTerrainGrid[y][x];

			// Maagzuur 
			if(overlay.overlayName == 'acid'){
				if(currentTile == 2){
					item.dangerousTerrain = true;
					if(item.type == "vehicles"){
						item.action == "stand";
						if(item.team == game.team){
							item.life -= 0.5;
							sounds.play("danger");
						}else{
							item.life -= 0.1;
						}
					}
				}
				// Geef unit weer normale sprite
				if(currentTile != 2 && item.dangerousTerrain == true){
					item.dangerousTerrain = false;
					if(item.type == "vehicles"){
						sounds.soundPause("danger");
					}	
				}
			// Bloed
			}else if(overlay.overlayName == 'blood'){
				if(currentTile == 2){
					item.dangerousTerrain = true;
					if(item.type == "vehicles"){
						item.action == "stand";
						if(item.team == game.team){
							item.life -= 1;
						}else{
							item.life -= 0.5;
						}
					}else if(item.type == "terrain" || item.type == "buildings"){
						game.remove(item);
					}
				}
				// Geef unit weer normale sprite
				if(currentTile != 2 && item.dangerousTerrain == true){
					item.dangerousTerrain = false;
					if(item.type == "vehicles"){
						sounds.soundPause("danger");
					}	
				}
				
			}
		}
	},

	animate: function(){
		var level = maps.singleplayer[singleplayer.currentLevel];

		// Doe alleen iets als er een mapoverlay is, en wanneer deze active is.
		if(level.mapOverlay && overlay.active == true){
			overlay.animateOverlay(overlay.animateType);
		}
	},

	resetOverlay: function(){
		var level = maps.singleplayer[singleplayer.currentLevel];
		clearInterval(this.interval);
		this.removeDangerousTerrain(level);
		this.animateType = 'hide';
		this.timeCount = 0;
	}
}