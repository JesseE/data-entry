$(window).load(function() {
	game.init();
});

var game = {
	 // Start preloading assets
	init: function(){
		loader.init();
		mouse.init();
		inputManager = new InputManager(document);
		UI.init();
		game.handleKeyInput();
		sounds.init();

		// Hide loading screen.
		setTimeout(function(){
			$('#splashscreen').fadeOut(400);
		}, 2000);

		//$('#gamecontainer').disableSelection(); 
		screens.show('start_screen');

		game.backgroundCanvas = document.getElementById('gamebackgroundcanvas');
		game.backgroundContext = game.backgroundCanvas.getContext('2d');

		game.foregroundCanvas = document.getElementById('gameforegroundcanvas');
		game.foregroundContext = game.foregroundCanvas.getContext('2d');

		game.canvasWidth = game.backgroundCanvas.width;
		game.canvasHeight = game.backgroundCanvas.height;
	},

    start: function(){
        $('.gamelayer').hide();
        $('#gameinterfacescreen').show();
		game.running = true;
		game.refreshBackground = true;		
		game.drawingLoop();

		var level = maps.singleplayer[singleplayer.currentLevel];
		if(level.backgroundSound){
			sounds.play(level.backgroundSound[0], true);
		}

		if(!game.loadSaved){
			$('#gamemessages').html("");
		}
    },
	
	// The map is broken into square tiles of this size (20 pixels x 20 pixels)
	gridSize: 20, 
	
	// Store whether or not the background moved and needs to be redrawn
	refreshBackground: true,	
		
	// A control loop that runs at a fixed period of time 
	animationTimeout: 100, // 100 milliseconds or 10 times a second
	offsetX: 0,	// X & Y panning offsets for the map
	offsetY: 0,
	panningThreshold: 70, // Distance from edge of canvas at which panning starts
	panningSpeed: 10, // Pixels to pan every drawing loop
	pannable: true,

	handlePanning: function(){
		// If the game makes a pan to a certain points.
		if(game.panning == true){
			var yMovement = Math.floor(game.yDistance/50 * ((Math.abs(game.yDistance)/50) + 12)) + Math.floor(game.yDistance/50 * 5);
			var xMovement = Math.floor(game.xDistance/50 * ((Math.abs(game.xDistance)/50) + 12)) + Math.floor(game.xDistance/50 * 5);
			var offsetX = Math.floor(game.offsetX / game.gridSize);
			var offsetY = Math.floor(game.offsetY / game.gridSize);

			if(offsetX == game.toX){
				xMovement = 0;
			}

			if(offsetY == game.toY){
				yMovement = 0;
			}

			if(offsetY == game.toY && offsetX == game.toX || yMovement == 0 && xMovement == 0){
				game.panning = false;
				setTimeout(function(){
					game.pannable = true;
					game.panning = false;

					// Hide unit if needed
					if(!game.stayVisible){
						var result = $.grep(game.items, function(e){ 
							return e.uid == game.showingUid; 
						});

						var item = result[0];

						item.visible = false;
					}

				}, game.disableTime);
			}
			game.refreshBackground = true;
			game.offsetY += yMovement;
			game.offsetX += xMovement;
		}

		// do not pan if mouse leaves the canvas
		if (!mouse.insideCanvas){
			return;
		}
		if(!game.panning && game.pannable){
			// left
			if(mouse.x<=game.panningThreshold || inputManager.keyState[37]){
				if (game.offsetX>=game.panningSpeed){
					game.refreshBackground = true;
					game.offsetX -= game.panningSpeed;		
				}
			}
			// right 
			else if (mouse.x>= game.canvasWidth - game.panningThreshold  || inputManager.keyState[39]){
				if (game.offsetX + game.canvasWidth + game.panningSpeed <= game.currentMapImage.width){
					game.refreshBackground = true;
					game.offsetX += game.panningSpeed;
				}
			}
			// top
			if(mouse.y<=game.panningThreshold || inputManager.keyState[38]){
				if (game.offsetY>=game.panningSpeed){
					game.refreshBackground = true;
					game.offsetY -= game.panningSpeed;
				}
			}
			// bot 
			else if (mouse.y>= game.canvasHeight - game.panningThreshold || inputManager.keyState[40]){
				if (game.offsetY + game.canvasHeight + game.panningSpeed <= game.currentMapImage.height){
					game.refreshBackground = true;
					game.offsetY += game.panningSpeed;
				}
			}	
		}
		if (game.refreshBackground){
			// Update mouse game coordinates based on game offsets
			mouse.calculateGameCoordinates();
		}
	},
	panTo: function(x, y, time, uid, stayVisible){
		// Set panning variables

		game.pannable = false;
		game.panning = true;
		game.toX = x;
		game.toY = y;
		game.yDistance = game.toY - Math.floor(game.offsetY / game.gridSize);
		game.xDistance = game.toX - Math.floor(game.offsetX / game.gridSize);

		// Set panning lock for a certain time after panning.
		game.disableTime = 0;
		if(time){
			game.disableTime = time;
		}
		// Show item
		if(uid){
			game.showingUid = uid;

			var result = $.grep(game.items, function(e){ 
				return e.uid == uid; 
			});

			var item = result[0];

			item.visible = true;
		}
		game.stayVisible = false;
		if(stayVisible){
			game.stayVisible = stayVisible;
		}
	},

	showItem: function(item){
		var level = maps.singleplayer[singleplayer.currentLevel];

		for(var i = 0; i < game.items.length; i++){
			var unit = game.items[i];
			if(unit.name == item){
				if (!game.panning && game.pannable){
					var X = unit.x * game.gridSize - game.canvasWidth / 2;
					var Y = unit.y * game.gridSize - game.canvasHeight / 2;
					if (X < 0){ X = 0; }
					else if (X > level.mapGridWidth*game.gridSize - game.canvasWidth){ X = level.mapGridWidth*game.gridSize - game.canvasWidth; }
					if (Y < 0){ Y = 0; }
					else if (Y > level.mapGridHeight*game.gridSize - game.canvasHeight){ Y = level.mapGridHeight*game.gridSize - game.canvasHeight; }

					game.offsetX = X;
					game.offsetY = Y;
					game.refreshBackground = true;

					game.selectItem(unit);
				}

			}
		};
	},

	handleKeyInput: function(){
		var keys = inputManager.keys;

		$(document).keyup(function(event) {
			var key = event.which;
			if(game.running){
				switch (key){
					case keys['m']:
						game.showMenu();
						break;
					case keys['n']:
						game.showItem('nanobot');
						break;
					case keys['d']:
						game.showItem('depot');
						break;
					case keys['f']:
						game.showItem('base');
						break;
					case keys['a']:
						if(!$('#barrack-light-button').hasClass('disabled')){
								UI.upgradeBuilding("barrack-light");
							};
						break;
					case keys['z']:
						if (!$('#barrack-heavy-button').hasClass('disabled')){
								UI.upgradeBuilding("barrack-heavy");
							};
						break;
					case keys['x']:
						if(!$('#cell-light-button').hasClass('disabled')){
								UI.constructAtStarport({type:"vehicles","name":"cell-light"});
							};
						break;
					case keys['c']:
						if(!$('#cell-heavy-button').hasClass('disabled')){
								UI.constructAtStarport({type:"vehicles","name":"cell-heavy"});
							};	
						break;
					case keys['v']:
						if(!$('#cell-yellow-button').hasClass('disabled')){
								UI.constructAtStarport({type:"vehicles","name":"cell-yellow"});
							};
						break;
					case keys['p']:
						game.togglePause();
						break;
					case keys['g']:
						game.showItem('barrack-light');
						break;
					case keys['h']:
						game.showItem('barrack-heavy');
						break;
					case keys['1']:
						game.showItem('cell-light');
						break;
					case keys['2']:
						game.showItem('cell-heavy');
						break;
					case keys['3']:
						game.showItem('cell-yellow');
						break;
					case keys['s']:
						game.save();
						break;
				}
			}	
		});

	},

	animationLoop: function(){
		if(!game.paused){
			// Animate the Sidebar
			game.trackResources();
			UI.animate();

			// Process orders for any item that handles it
			for (var i = game.items.length - 1; i >= 0; i--){
				if(game.items[i].processOrders){
					game.items[i].processOrders();
				}			
			};

			// Animate each of the elements within the game
			for (var i = game.items.length - 1; i >= 0; i--){
				game.items[i].animate();
			};

			// Sort game items into a sortedItems array based on their x,y coordinates
		    game.sortedItems = $.extend([],game.items);      
		   	game.sortedItems.sort(function(a,b){
		   		return b.y-a.y + ((b.y==a.y)?(a.x-b.x):0);
		   	});
		   	// Zorg er voor dat bepaalde items altijd onder zijn.
		   	for(var i = 0; i < game.sortedItems.length; i++){
		    	if(game.sortedItems[i].type == 'terrain' && game.sortedItems[i].group == 'teleporter'){
		    		game.sortedItems.push(game.sortedItems[i]);
		    		game.sortedItems.splice(i, 1);
		   		}
		    }


		   	var level = maps.singleplayer[singleplayer.currentLevel];
	        
			fog.animate();

			overlay.animate();
			game.lastAnimationTime = (new Date()).getTime();
		}
	},	
	drawingLoop: function(){
		if(!game.paused){
			// Handle Panning the Map	
			game.handlePanning();

			// Check the time since the game was animated and calculate a linear interpolation factor (-1 to 0)
			// since drawing will happen more often than animation 
			game.lastDrawTime = (new Date()).getTime();
		       if (game.lastAnimationTime){
		           game.drawingInterpolationFactor = (game.lastDrawTime-game.lastAnimationTime)/game.animationTimeout - 1;
		           if (game.drawingInterpolationFactor>0){ // No point interpolating beyond the next animation loop... 
		               game.drawingInterpolationFactor = 0;
		           }
		       } else {
				game.drawingInterpolationFactor = -1;

			}
	 	
			// Since drawing the background map is a fairly large operation, 
			// we only redraw the background if it changes (due to panning)
			if (game.refreshBackground){
				game.backgroundContext.drawImage(game.currentMapImage,game.offsetX,game.offsetY,game.canvasWidth,game.canvasHeight, 0,0,game.canvasWidth,game.canvasHeight);
				game.refreshBackground = false;
			}

			// fast way to clear the foreground canvas
			game.foregroundCanvas.width = game.foregroundCanvas.width;

			// Start drawing the foreground elements
			for (var i = game.sortedItems.length - 1; i >= 0; i--){
				game.sortedItems[i].draw();
			};

			fog.draw();
		
			// Draw the mouse 
			mouse.draw();
		}	

		// Call the drawing loop for the next frame using request animation frame
		if (game.running){
			requestAnimationFrame(game.drawingLoop);	
		}						
	},

	togglePause: function(){
		// Als er nog niet eerder gepauseerd is, zet pause op false.
		if(!game.paused){ game.paused = false };

		// Check of de game gepauseerd is of niet.
		var paused = game.paused;

		// Als het menu niet actief is.
		if(!game.menu){
			// Zo nee, zet de game op pause.
			if(!paused){
				game.paused = true;
				fadePause();
				// Stop de triggertimer
				clearInterval(game.triggerInterval);
			}
			// Zo ja, unpause de game.
			else if(paused){
				game.paused = false;
				fadePause();
				// Zet de triggertimer opnieuw aan.
				game.triggerInterval = setInterval(function(){
					game.checkTriggers();
				}, 1000);
			}
		}

		function fadePause(){
			if(game.paused == true){
				$('#game_paused').fadeIn(700, function(){
					$('#game_paused').fadeOut(800, function(){
						fadePause();
					});
				});
			}else{
				$('#game_paused').fadeOut();
			}		
		}
	},
	resetArrays: function(){
		game.counter = 1;
		game.items = [];
		game.sortedItems = [];
		game.buildings = [];
		game.vehicles = [];
		game.aircraft = [];
		game.terrain = [];
		game.triggers = [];
		game.objectives = [];
		game.triggeredEvents = [];
		game.selectedItems = [];
		game.sortedItems = [];
		game.bullets = [];
		game.mapDangerousTerrainGrid = undefined;
	},
	add: function(itemDetails) {
		// Set a unique id for the item
		if (!itemDetails.uid){
			itemDetails.uid = game.counter++;
		}

		var item = window[itemDetails.type].add(itemDetails);

		// Add the item to the items array
		game.items.push(item);
		// Add the item to the type specific array
		game[item.type].push(item);		

		if(item.type == "buildings" || item.type == "terrain"){
			game.currentMapPassableGrid = undefined;
		}

		if (item.type == "bullets" && !item.saveGame){
			sounds.play(item.name);
		}
		return item;		
	},
	remove: function(item){
		// Unselect item if it is selected
		item.selected = false;
		for (var i = game.selectedItems.length - 1; i >= 0; i--){
	           if(game.selectedItems[i].uid == item.uid){
	               game.selectedItems.splice(i,1);
	               break;
	           }
	          
	       };

		// Remove item from the items array
		for (var i = game.items.length - 1; i >= 0; i--){
			if(game.items[i].uid == item.uid){
			    game.items.splice(i,1);
			    break;
			}
	    };

		// Remove items from the type specific array
		for (var i = game[item.type].length - 1; i >= 0; i--){
			if(game[item.type][i].uid == item.uid){
			   game[item.type].splice(i,1);
			   break;
			}
	    };	

		if(item.type == "buildings" || item.type == "terrain"){
			game.currentMapPassableGrid = undefined;
		}
	},
	upgrade: function(building, upgrade){
		var item = upgrade;
		return item;
	},

	addResources: function(coordinates){
		var level = maps.singleplayer[singleplayer.currentLevel];
		if(!level.resourcesAdded){
			var coordinates = maps.singleplayer[singleplayer.currentLevel]["resources"]
			// Per attribute van het object (resource type)
			for(var prop in coordinates){
				// Haal de x en y coordinaten er uit, en maak een object aan.
				for(var i = 0; i < coordinates[prop].length; i++){
					var x = coordinates[prop][i][0];
					var y = coordinates[prop][i][1];

					var terrain = {"type": "terrain", "name":prop, "x": x, "y": y};
					
					level["items"].push(terrain);
				}
			}
			level.resourcesAdded = true;
		}
	},

	/* Selection Related Code */
	selectionBorderColor: 		"rgba(255,255,0,0.5)",
	selectionFillColor: 		"rgba(255,215,0,0.2)",

	healthBarBorderColor: 		"rgba(0,0,0,0.8)",
	healthBarHealthyFillColor: 	"rgba(0,255,0,0.5)",
	healthBarDamagedFillColor: 	"rgba(255,0,0,0.5)",
	lifeBarHeight: 5,	

	resourceBarBorderColor: 		"rgba(0, 0, 0, 0.8)",
	resourceBarHealthyFillColor: 	"rgba(0, 0, 255, 0.5)",
	resourceBarDamagedFillColor: 	"rgba(0, 0, 255, 0.5)",
	resourceBarHeight: 5,

	clearSelection: function(){
		while(game.selectedItems.length>0){
			game.selectedItems.pop().selected = false;
		}
	},
	selectItem: function(item,shiftPressed){
		// Pressing shift and clicking on a selected item will deselect it
		if (shiftPressed && item.selected){
			// deselect item
			item.selected = false;
			for (var i = game.selectedItems.length - 1; i >= 0; i--){
		        if(game.selectedItems[i].uid == item.uid){
		            game.selectedItems.splice(i,1);
		            break;
		        }
		    };			
			return;
		}

		if (item.selectable && !item.selected){
			item.selected = true;
			game.selectedItems.push(item);	        
		}
	},	
	// Send command to either single player or multi player object
	sendCommand: function(uids,details){
		switch (game.type){
			case "singleplayer":
				singleplayer.sendCommand(uids,details);
				break;
			case "multiplayer":
				multiplayer.sendCommand(uids,details);
				break;
		}
	},
	getItemByUid: function(uid){
		for (var i = game.items.length - 1; i >= 0; i--){
			if(game.items[i].uid == uid){
				return game.items[i];
			}
		};
	},
	// Receive command from single player or multi player object and send it to units
	processCommand: function(uids,details){
		// In case the target "to" object is in terms of uid, fetch the target object
		var toObject;	
		if (details.toUid){
			toObject = game.getItemByUid(details.toUid);
			if(!toObject || toObject.lifeCode=="dead"){	
				// To object no longer exists. Invalid command	
				return;
			}
		}
		for (var i in uids){

			var uid = uids[i];
			var item = game.getItemByUid(uid);

			//if uid is a valid item, set the order for the item
			if(item){
				// {} was []. Veranderd voor saven.
				item.orders = $.extend({},details);	

				if(toObject) {
					item.orders.to = toObject;					
				}
			}
		}
	},

	findNearest: function(source, type, target){
		game.rebuildPassableGrid();
		var nearest;
		var currentPath;

		// First find path to destination									
		var start = [Math.floor(source.x),Math.floor(source.y)]; 
		var grid = $.extend(true,[],game.currentMapPassableGrid);
		

		$.grep(game.items, function(e){ 
			if(e[type] == target){
				var end = [Math.floor(e.x),Math.floor(e.y)]; 

				// Allow destination to be "movable" so that algorithm can find a path
				if(target.type == "buildings" || target.type == "terrain"){
					grid[Math.floor(e.y)][Math.floor(e.x)] = 0;
				}

				var newPath = AStar(grid, start, end, 'Euclidean');
				
				if(!currentPath){
					currentPath = newPath;
				}
				if(newPath.length <= currentPath.length){
					currentPath = newPath;
					nearest = e;
				}

			}; 
		});

		targetVar = 'nearest' + capitalize(target);
		source[targetVar] = nearest;

	},

	//Movement related properties
	speedAdjustmentFactor: 		1/64, 
	turnSpeedAdjustmentFactor: 	1/8,

	rebuildPassableGrid: function(){
		game.currentMapPassableGrid = $.extend(true,[],game.currentMapTerrainGrid);

		for (var i = game.items.length - 1; i >= 0; i--){
			var item = game.items[i];
			if(item.type == "buildings" || item.type == "terrain"){
				for (var y = item.passableGrid.length - 1; y >= 0; y--){
					for (var x = item.passableGrid[y].length - 1; x >= 0; x--){
						if(item.passableGrid[y][x]){
							game.currentMapPassableGrid[item.y+y][item.x+x] = 1;
						}
					};
				};
			}							
		};
	},
	rebuildBuildableGrid: function(){
		game.currentMapBuildableGrid = $.extend(true,[],game.currentMapTerrainGrid);
		for (var i = game.items.length - 1; i >= 0; i--){
			var item = game.items[i];
			if(item.type == "buildings" || item.type == "terrain"){
				for (var y = item.buildableGrid.length - 1; y >= 0; y--){
					for (var x = item.buildableGrid[y].length - 1; x >= 0; x--){
						if(item.buildableGrid[y][x]){
							game.currentMapBuildableGrid[item.y+y][item.x+x] = 1;
						}
					};
				};
			} else if (item.type == "vehicles"){	
				// Mark all squares under or near the vehicle as unbuildable
				var radius = item.radius/game.gridSize;
				var x1 = Math.max(Math.floor(item.x - radius),0);
				var x2 = Math.min(Math.floor(item.x + radius),game.currentLevel.mapGridWidth-1);
				var y1 = Math.max(Math.floor(item.y - radius),0);
				var y2 = Math.min(Math.floor(item.y + radius),game.currentLevel.mapGridHeight-1);
				for (var x=x1; x <= x2; x++) {
					for (var y=y1; y <= y2; y++) {
						game.currentMapBuildableGrid[y][x] = 1;
					};
				};

			}							
		};		
	},

	startTeleport: function(){
		var teleports = [];

		// Zoek alle teleports in het level.
		for (var i = 0; i < game.items.length; i++){
			var item = game.items[i];
			if (item.type == "terrain" && item.group == "teleporter"){
				var teleport = item;
				teleports.push(teleport);
			}
		}

		// Teleport alleen als er meer dan 1 teleport is.
		if(teleports.length > 1){
			for(var i = 0; i < teleports.length; i++){
				var teleport = teleports[i];

				if(teleport.nodeTo){
					var nextTeleport = game.getItemByUid(teleport.nodeTo);

					var xDiff = nextTeleport.x - teleport.x;
					var yDiff = nextTeleport.y - teleport.y;

					for(var j = 0; j < game.items.length; j++){
						item = game.items[j];
						if(item.type == "vehicles"){
							var x = teleport.x + teleport.pixelWidth/game.gridSize/2;
							var y = teleport.y + teleport.pixelHeight/game.gridSize/2;
							
							if ( (Math.pow(x - item.x, 2) + Math.pow(y - item.y, 2)) < Math.pow(teleport.radius/game.gridSize,2) ){						
								//Stop when within one radius of the destination						
								game.sendCommand([item.uid], {"type": "flash", "to":{"x": item.x + xDiff, "y": item.y + yDiff}});
					        }
					        
						}
					}
				}
			}
		}else{
			console.log('No teleporter connected');
		}
	},

	trackResources: function(){
		var amount = 0;

		for (var i = game.items.length - 1; i >= 0; i--){
			var item = game.items[i];
			if (item.type == "buildings" && item.name == "depot" && item.team == game.team){
				amount += item.resources;
			}
		};

		game.cash[game.team] = amount;
	},

	changeResources: function(amount){

		var depots = [];
		var totalDrain = amount;

		if(totalDrain > 0){

			for (var i = game.items.length - 1; i >= 0; i--){
				var item = game.items[i];
				if (item.type == "buildings" && item.name == "depot" && item.team == game.team && item.lifeCode == "healthy" && item.resources > 0){
					depots.push(item);
				}
			};

			var depotDrain = amount/depots.length;
			var rest = 0;

			for (var i = 0; i < depots.length; i++){
				depots[i].resources -= depotDrain;
				if(depots[i].resources < 0){
					var res = Math.abs(depots[i].resources);
					rest += res;
					depots[i].resources = 0;
				}
			}

			if(rest > 0){
				for (var i = 0; i < depots.length; i++){
					if(depots[i].resources >= rest){
						depots[i].resources -= rest;
						break;
					}
				}
			}
		}else if(totalDrain < 0){

			for (var i = game.items.length - 1; i >= 0; i--){
				var item = game.items[i];
				if (item.type == "buildings" && item.name == "depot" && item.team == game.team && item.lifeCode == "healthy"){
					depots.push(item);
				}
			};

			var depotDrain = amount/depots.length;
			var rest = 0;

			for (var i = 0; i < depots.length; i++){
				depots[i].resources -= depotDrain;

				if(depots[i].resources > depots[i].resourceCap){
					var res = depots[i].resources - depots[i].resourceCap;
					rest += res;

					depots[i].resources = depots[i].resourceCap;
				}
			}

			if(rest > 0){
				for (var i = 0; i < depots.length; i++){
					if(depots[i].resources <= depots[i].resourceCap - rest){
						depots[i].resources -= rest;
						break;
					}
				}
			}
		}
	},

	showMenu: function(){
		if(game.running){
			var visible = $('#game_menu').is(":visible");
			sounds.play("showMenu");
			if(!visible){
				if(!game.paused){
					game.togglePause();
				}
				game.menu = true;
				$('#game_menu').slideDown('slow');
			}else{
				game.menu = false;
				if(game.paused){
					game.togglePause();
				}
				$('#game_menu').slideUp('slow');
				$('#game_menu').find('span').remove();
			}
		}
	},

	nextObjective: function(callback){
		var level = maps.singleplayer[singleplayer.currentLevel];
		//var objective = level['objectives'][level.currentObjective];
		var objective = game.objectives[level.currentObjective];

		sounds.play('message-received');

		$('#objective_number').text(level.currentObjective + 1 + ' / ' + game.objectives.length);
		$('#objective_text').text(objective.message);

		if(objective.time){
			$('#objective_time').text(objective.time);

			game.showMessage("Objective", objective.message);
			
			game.objectiveInterval = setInterval(function(){
				if(!game.paused){
					objective.time --;
					$('#objective_time').text(objective.time);

					if(objective.time == 0){
						clearInterval(game.objectiveInterval);

						if(callback){
							callback();
						}
						$('#objective_text').fadeOut(200, function(){
							$(this).text('').show();

						});
					}
				}
			}, 1000);
		}

		level.currentObjective ++;
	},

	showTip: function(message, duration, top, left){
		var tip_message = '<span>'+message+'</span></br>';
		var tip_box = $('#tip_message').html(tip_message);
		if(top) tip_box.css('top', top);
		if(left) tip_box.css('left', left);
		tip_box.fadeIn('slow');

		setTimeout(function(){
			tip_box.fadeOut('fast');
		}, duration)
	},
	// Functions for communicating with player
	characters: {
		"system":{
			"name":"System",
			"image":"images/characters/system.png"
		},
		"objective":{
			"name":"Objective",
			"image":"images/characters/girl1.png"
		},			
	},
	showMessage: function(from,message){
		sounds.play('message-received');
		// Append message to messages pane and scroll to the bottom
		var existingMessage = $('#gamemessages').html();
		var newMessage = existingMessage+'<span>'+from+': </span>'+message+'<br>';
		$('#gamemessages').html(newMessage);
		$('#gamemessages').animate({scrollTop:$('#gamemessages').prop('scrollHeight')});
	},
	/* Message Box related code*/
	messageBoxOkCallback: 		undefined,
	messageBoxCancelCallback: 	undefined,
	showMessageBox: function(message,onOK,onCancel){
		// Set message box text
		$('#messageboxtext').html(message);

		// Set message box ok and cancel handlers and enable buttons
		if(!onOK){
			game.messageBoxOkCallback = undefined;				
		} else {
			game.messageBoxOkCallback = onOK;
		}	

		if(!onCancel){
			game.messageBoxCancelCallback = undefined;			
			$("#messageboxcancel").hide();
		} else {
			game.messageBoxCancelCallback = onCancel;
			$("#messageboxcancel").show();
		}

		// Display the message box and wait for user to click a button
		$('#messageboxscreen').show();				
	},
	messageBoxOK: function(){
		$('#messageboxscreen').hide();
		if(game.messageBoxOkCallback){
			game.messageBoxOkCallback();
		}			
	},
	messageBoxCancel: function(){
		$('#messageboxscreen').hide();
		if(game.messageBoxCancelCallback){
			game.messageBoxCancelCallback();
		}			
	},
	addTrigger: function(trigger){
		//add the time passed to the follow up trigger;
		trigger.time += game.triggerTimer;
		game.triggers.push(trigger);
	},

	checkTriggers: function(){
		if(!game.paused){
			// Handle triggers
			// Initialize All Game Triggers
			for (var i = game.triggers.length - 1; i >= 0; i--){
				var trigger = game.triggers[i];
				if(!trigger.completed){
					if(trigger.type == 'timed'){
						if(trigger.repeat && trigger.timer >= 0){

							trigger.timer ++;

							if(trigger.overlayName){
								game.updateTimers(trigger.repeatTime, trigger.timer, trigger.overlayName, trigger.color);
							}
						}

						if(trigger.time == game.triggerTimer || (trigger.timer == trigger.repeatTime && trigger.repeat)){
							if(trigger.repeat){
								trigger.timer = 0;
							}else if(!trigger.repeat){
								trigger.completed = true;
							}

							trigger.action(trigger);
						}					
					} 
					else if(trigger.type == 'conditional'){
						if(trigger.condition()){
							// Call the trigger action
							trigger.action(trigger);
							trigger.completed = true;
						} 
					}	
				}	
			};

			// Add een seconde bij de triggertimer.
			game.triggerTimer ++;
		}
	},

	ifTriggerCompleted: function(trigger, successor, time){
		var successorIndex = game.triggers.indexOf(trigger) + successor;
		var successor = game.triggers[successorIndex];

		if(successor.completed == true){
			if(time){
				if(!trigger.waitTime){
					trigger.waitTime = 0;
				}
				trigger.waitTime ++;

				if(trigger.waitTime == time){
					return true;
				}
			}else{
				return true;
			}
		}else{
			return false;
		}
	},

	updateTimers: function(repeatTime, timeLeft, name, color){
		var time = repeatTime - timeLeft;
		var time = getMinutes(time);
		// Update the visual timer in the DOM.
		var idArray = name.split(" ");
		var id = idArray[0];
		if($('#timers').find('span#'+id).length == 0){

			$('#timers').append('<span id="'+id+'" class="timer">'+name+' - '+time+'</span>');
			$('#'+id).css('color', color);
		}else{
			$('#'+id).text(name+' - '+time);
		}
	},

	save: function(){

		localStorage.clear();
		var items = [];

		for(var i = 0; i < game.items.length; i++){
			var item = game.items[i];
			console.log(i, item.uid, item.name, item.orders);

			var obj ={			
				'direction': item.direction,
				'action': item.action,
				'name': item.name,
				'team': item.team,
				'type': item.type,
				'uid': item.uid,
				'x': item.x,
				'y': item.y,
				'life': item.life,
				'lifeCode': item.lifeCode,
				'resources': item.resources,
				'animationIndex': item.animationIndex,
				'visible': item.visible		
			} 
			// Geef de items de essentie van hun orders mee.
			if(item.orders){
				var orders = item.orders;

				var ordersList = {
					'type': orders.type,
				}

				if(orders.to || orders.toUid){
					if(orders.to.uid){
						ordersList.toUid = orders.to.uid;
					}else if(orders.to.uid && orders.toUid){
						ordersList.toUid = orders.toUid;
					}
					else{
						ordersList.to = orders.to;
					}					
				}
				if(orders.from){
					ordersList.from = orders.from;
				}
				obj.orders = ordersList;
			}
			if(item.type == 'buildings' && (item.name == 'barrack-light' || item.name == 'barrack-heavy')){
				if(item.unitQueue && item.queue){
					obj.unitQueue = item.unitQueue;
					obj.queue = item.queue;
				}
				if(item.waypointX && item.waypointY){
					obj.waypointX = item.waypointX;
					obj.waypointY = item.waypointY;
				}
			}
			// Regel de bullet properties
			if(item.type == 'bullets'){
				// Geef de distance mee die hij al afgelegd heeft.
				obj.distanceTravelled = item.distanceTravelled;
				// Geef target uid mee, zodat hij weet waar hij heen moet.
				obj.targetUid = item.target.uid;
				// Laat bullet weten dat hij uit een savegame komt. Anders spawned hij met geluid.
				obj.saveGame = true;
			}
			// Check of een resource al geharvest is (om double harvest te voorkomen)
			if(item.harvested){
				obj.harvested = true;
			}

			items.push(obj);
		};
		var levelVars = {
			'levelNumber': singleplayer.currentLevel,
			'currentLevel': game.currentLevel,
			'offsetX': game.offsetX,
			'offsetY': game.offsetY,
			'cash': {blue: game.cash['blue'], green: game.cash['green']},
			'triggers': game.triggers,
			'triggerTimer': game.triggerTimer,
			'overlayTimer': overlay.overlayTime
		};

		var html = {
			'gamemessages': $('#gamemessages').html(),
			'objective': $('#objective_text').html()
		}

		var levelData = {
			'items': items,
			'level': levelVars,
			'html': html
		};

		if (typeof(localStorage) == 'undefined' ) {
			alert('Your browser does not support HTML5 localStorage. Try upgrading.');
		} else {
			try {
				// Save shit here
				localStorage.setItem('savegame_'+(localStorage.length+1), JSON.stringify(levelData));
				$('#save_game').parent().append('<span class="button_feedback">Game saved!</span>');
				$('.button_feedback').fadeIn('slow').slideDown('slow', function(){
					setTimeout(function(){
						$('.button_feedback').animate({opacity: 0.1}, 'slow', function(){
							$('.button_feedback').slideUp('fast', function(){
								$('.button_feedback').html('');
							});
						});
					}, 3000);
				});
			} catch (e) {
			 	 if (e == QUOTA_EXCEEDED_ERR) {
			 	 	 alert('Quota exceeded!'); //data wasn't successfully saved due to quota exceed so throw an error
				}
			}
		}

		var retrieved = localStorage.getItem('savegame_1');

		var items = JSON.parse(retrieved);
	},

	exitGame: function(){
		clearInterval(game.animationInterval);
		game.end();

		screens.show('start_screen');
	},

	end: function(){
		// Clear Any Game Triggers
		clearInterval(game.triggerInterval);
		if(overlay.interval){
			clearInterval(overlay.interval);
			overlay.timeCount = 0;
		}
		if(game.objectiveInterval){
			clearInterval(game.objectiveInterval);
		}
		overlay.imageCount = 0;
		overlay.active = false;
		overlay.lastImageNumber = 0;
		overlay.phase = 0;

		game.triggerTimer = 0;
		sounds.stopAll();
		game.running = false;
		game.paused = false;


		// Stop background music
		var level = maps.singleplayer[singleplayer.currentLevel];
		level.currentObjective = 0;
		if(level.backgroundSound){
			for(var i = 0; i < level.backgroundSound.length; i++){
				var sound = level.backgroundSound[i];
				sounds.stop(sound);
			}
		}
		// Hide menu if needed
		var visible = $('#game_menu').is(":visible");
		if(visible){
			game.menu = false;
			$('#game_menu').hide();
		}

		$('#gamemessages').html('');
		$('#objective_text').html('');
		$('#objective_time').html('');
		$('#tip_message').html('').hide();


		$('.timer').remove();
	}
}