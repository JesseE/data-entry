var UI = {
	// Ingame interface
	updateSelectedInfo: function(){	
		// Als er iets geselecteerd is	
		if(game.selectedItems.length > 0){
			var selected = game.selectedItems[0];

			// Always select the nanobot first. Else select a building.
			if(game.selectedItems[0].name != 'nanobot'){
				for(var i = 0; i < game.selectedItems.length; i++){
					if(game.selectedItems[i].name == 'nanobot'){
						var selected = game.selectedItems[i];
						break;
					}else if(game.selectedItems[i].type == 'buildings'){
						var selected = game.selectedItems[i];
					}else if(selected.type != 'buildings'){
						var selected = game.selectedItems[i];
					}
				}
			}

			// Set item name
			if(!selected.displayName){
				selected.displayName = selected.name;
			}
			$('#selected_info').find('h1').text(capitalize(selected.displayName));
			// Get bar width
			var percent = $('.bar').width() / 100;

			// Set health bar
			if(selected.hitPoints >= 0){
				var width = Math.floor(((selected.life / selected.hitPoints) * 100) * percent);
				$('#health_bar').css('display', 'block');
				$('#health_bar').find('span').text(Math.floor(selected.life) + ' / ' + selected.hitPoints);
				$('#health_left').css('width', width);
			}else{
				$('#health_bar').css('display', 'none');
			}

			// Set resource bar
			if(selected.resourceCap >= 0){
				var width = Math.floor(((selected.resources / selected.resourceCap) * 100) * percent);

				$('#resource_bar').css('display', 'block');
				$('#resource_bar').find('span').text(Math.floor(selected.resources) + ' / ' + selected.resourceCap);
				$('#resources_gathered').css('width', width);
				selected.resources;
			}else{
				$('#resource_bar').css('display', 'none');
			}

			// Set background
			// Get the correct position of the background.
			if(!selected.displayY && !selected.displayX){
				selected.displayY = 0;
				selected.displayX = 0;
			}

			$('#selected_info').css({
				'background-position-y': -selected.displayY,
				'background-position-x': -selected.displayX,
			});
		}else{
			$('#selected_info').find('h1').text('No item selected');
			$('#health_bar').css('display', 'none');
			$('#resource_bar').css('display', 'none');
			$('#selected_info').css({
				'background-position-y': 0,
				'background-position-x': 0,
			});
		}
	},

	enableSidebarButtons: function(){
		// Buttons only enabled when appropriate building is selected
		$("#gameinterfacescreen #sidebarbuttons .UI_button").addClass("disabled");		
		// If no building selected, then no point checking below
		if (game.selectedItems.length==0){
			$('.building').css('display', 'none');
			$('.unit').css('display', 'none');	
			return;
		}else if(!baseSelected && !barrackLightSelected && !barrackHeavySelected){
			$('.building').css('display', 'none');
			$('.unit').css('display', 'none');	
		}

		var baseSelected = false;
		var baseUpgrade = false;
		var barrackLightSelected = false;
		var barrackLightUpgrade = false;
		var barrackHeavySelected = false;
		// Check if base or barracks is selected
		for (var i = game.selectedItems.length - 1; i >= 0; i--){
			var item = game.selectedItems[i];			
			//  Check If player selected a healthy,inactive building (damaged buildings can't produce)
			if (item.type == "buildings" && item.team == game.team && item.lifeCode == "healthy"){				
				if(item.name == "base"){
					baseSelected = true;
					if(item.upgrade){
						baseUpgrade = true;
					}
				} else if (item.name == "barrack-light"){
					barrackLightSelected = true;
					if(item.upgrade){
						barrackLightUpgrade = true;
					}
					
				} else if (item.name == "barrack-heavy"){
					barrackHeavySelected = true;
				}
			}
		};	

		var cashBalance = game.cash[game.team];
		/* Enable building buttons if base is selected,building has been loaded in requirements, not in deploy building mode and player has enough money*/
		if (baseSelected){
			if( game.currentLevel.requirements.buildings.indexOf('barrack-light')>-1 ){
				$("#barrack-light-button").css('display', 'block');
				if(!game.deployBuilding && cashBalance>=buildings.list["barrack-light"].cost && baseUpgrade){
					$("#barrack-light-button").removeClass("disabled");
				}
			}
					
		}

		/* Enable unit buttons if startport is selected, unit has been loaded in requirements, and player has enough money*/
		if (barrackLightSelected){
			if( game.currentLevel.requirements.buildings.indexOf('barrack-heavy')>-1 && barrackLightUpgrade){
				$("#barrack-heavy-button").css('display', 'block');
				if(!game.deployBuilding && cashBalance>=buildings.list["barrack-heavy"].cost){
					$("#barrack-heavy-button").removeClass("disabled");
				}
			}

			if( game.currentLevel.requirements.vehicles.indexOf('cell-light')>-1 ){
				$("#cell-light-button").css('display', 'block');
				if(!game.deployBuilding && cashBalance>=vehicles.list["cell-light"].cost){
					$("#cell-light-button").removeClass("disabled");
				}
			}
		}

		if (barrackHeavySelected){
			if( game.currentLevel.requirements.vehicles.indexOf('cell-light')>-1 ){
				$("#cell-light-button").css('display', 'block');
				if(!game.deployBuilding && cashBalance>=vehicles.list["cell-light"].cost){
					$("#cell-light-button").removeClass("disabled");
				}
			}

			if( game.currentLevel.requirements.vehicles.indexOf('cell-heavy')>-1 ){
				$("#cell-heavy-button").css('display', 'block');
				if(!game.deployBuilding && cashBalance>=vehicles.list["cell-heavy"].cost){
					$("#cell-heavy-button").removeClass("disabled");
				}
			}

			if( game.currentLevel.requirements.vehicles.indexOf('cell-yellow')>-1 ){
				$("#cell-yellow-button").css('display', 'block');
				if(!game.deployBuilding && cashBalance>=vehicles.list["cell-yellow"].cost){
					$("#cell-yellow-button").removeClass("disabled");
				}
			}
		}
	},

	showItemInfo: function(id){
		if(id){
			var item = (buildings.list[id])? buildings.list[id] : vehicles.list[id];
			var bullet = (item.canAttack)? bullets.list[item.weaponType] : '-';
			var name = (item.displayName)? item.displayName : capitalize(item.name);
			var cost = item.cost;
			var damage = (bullet != '-')? bullet.damage : '-';
			var health = item.hitPoints;
			var range = (bullet != '-')? bullet.range : '-';		
		}else{
			var name = "Item information";
			var cost = "";
			var damage = "";
			var health = "";
			var range = "";
		}
		$('#item_info').find('h1').text(name);
		$('#item_info').find('#cost').text(cost);
		$('#item_info').find('#damage').text(damage);
		$('#item_info').find('#health').text(health);
		$('#item_info').find('#range').text(range);
	},

	animate: function(){		
		// Display the current cash balance value		
		$('#resources').html(game.cash[game.team]);
		
		var time = getMinutes(game.triggerTimer);
		$('#game_time').html(time);

		//  Enable or disable buttons as appropriate
		this.enableSidebarButtons();

		// Animate the selected info box.
		this.updateSelectedInfo();

		if (game.deployBuilding){
			// Create the buildable grid to see where building can be placed
			game.rebuildBuildableGrid();	
			// Compare with buildable grid to see where we need to place the building
			var placementGrid = buildings.list[game.deployBuilding].buildableGrid;
			game.placementGrid = $.extend(true,[],placementGrid);
			game.canDeployBuilding = true;
			for (var i = game.placementGrid.length - 1; i >= 0; i--){
				for (var j = game.placementGrid[i].length - 1; j >= 0; j--){					
					if(game.placementGrid[i][j] && 
						(mouse.gridY+i>= game.currentLevel.mapGridHeight || mouse.gridX+j>= game.currentLevel.mapGridWidth 
							|| game.currentMapBuildableGrid[mouse.gridY+i][mouse.gridX+j]==1 || fog.grid[game.team][mouse.gridY+i][mouse.gridX+j]==1)){
						game.canDeployBuilding = false;
						game.placementGrid[i][j] = 0;
					}
				};
			};
		}

		// Update unit queue per button

		var building;
		// Find the first eligible building among selected items
		for (var i = game.selectedItems.length - 1; i >= 0; i--){
			var item = game.selectedItems[i];
			if (item.type == "buildings" && (item.name == "barrack-heavy" || item.name == "barrack-light")
				&& item.team == game.team && item.lifeCode == "healthy"){
				building = item;
				break;
			}
		};

		if(building){
			if(!building.unitQueue){
				building.unitQueue = {
					'cell-light': 0,
					'cell-heavy': 0,
					'cell-yellow': 0
				}
			}

			$('#sidebarbuttons').find('.unit').each(function(key, value){
				var type = $(this).attr('id').slice(0, -7);

				if(building.unitQueue[type] > 0){
					if($(this).children('span.queue_number').length == 0){
						$(this).append('<span class="queue_number">'+building.unitQueue[type]+'</span>');
					}else{
						$(this).find('span.queue_number').text(building.unitQueue[type]);
					}
				}

			});
		}
	},
	init: function(){
		// Top bar
		var level = maps.singleplayer[singleplayer.currentLevel];
		$('#game_paused').click(function(){
			game.togglePause();
		});
		$('#objective_number').text(level.currentObjective + 1 + ' / ' + level.objectives.length);
		$('#objective_text').text("You don't have any objectives yet.");

		// Create hover info
		$('.UI_button').mouseover(function(){
			var id = $(this).attr('id').slice(0, -7);
			
			UI.showItemInfo(id);
		});
		$('.UI_button').mouseout(function(){			
			UI.showItemInfo();
		});

		$("#cell-yellow-button").click(function(){
			if(!$(this).hasClass('disabled')){
				UI.constructAtStarport({type:"vehicles","name":"cell-yellow"});
			}		
		});

		$("#cell-heavy-button").click(function(){
			if(!$(this).hasClass('disabled')){
				UI.constructAtStarport({type:"vehicles","name":"cell-heavy"});
			}		
		});

		$("#cell-light-button").click(function(){
			if(!$(this).hasClass('disabled')){
				UI.constructAtStarport({type:"vehicles","name":"cell-light"});
			}
		});
	
		$("#barrack-light-button").click(function(){
			if(!$(this).hasClass('disabled')){
				UI.upgradeBuilding("barrack-light");
			}
		});
		$("#barrack-heavy-button").click(function(){
			if(!$(this).hasClass('disabled')){
				UI.upgradeBuilding("barrack-heavy");
			}
		});

		// Capture right click
		// $(".unit").each(function(){
		// 	$(this).rightClick( function(e) {
		// 		var type = $(this).attr('id').slice(0, -7);
		// 		UI.cancelConstruct(type);
		// 	});
		// });
	},

	cancelConstruct: function(type){
		var building;
		// Find the first eligible building among selected items
		for (var i = game.selectedItems.length - 1; i >= 0; i--){
			var item = game.selectedItems[i];
			if (item.type == "buildings" && (item.name == "barrack-heavy" || item.name == "barrack-light")
				&& item.team == game.team && item.lifeCode == "healthy"){
				building = item;
				break;
			}
		};
		if (building){
			if(building.unitQueue[type] > 0){
				var lastUnit;

				// Zoek de laatste unit van die type in de queue.
				for(var i = building.queue.length-1; i >= 0; i--){
					if(building.queue[i].name == type){
						lastUnit = building.queue[i];
						break;
					}
				}
				// Haal de unit er uit.
				var index = building.queue.indexOf(lastUnit);
				building.queue.splice(index, 1);
				// Geef resources terug.
				game.changeResources(-vehicles.list[type].cost);
				// Verander het cijfertje.
				building.unitQueue[type] --;
			}
			if(building.unitQueue[type] == 0){
				$('#'+type+'-button').find('span.queue_number').text('0').fadeOut('normal', function(){
					$('#'+type+'-button').find('span.queue_number').remove();
				});
			}
			if(building.queue.length == 0){
				building.orders = {type:"stand"};
			}
		}
	},

	constructAtStarport: function(unitDetails){
		var building;
		// Find the first eligible building among selected items
		for (var i = game.selectedItems.length - 1; i >= 0; i--){
			var item = game.selectedItems[i];
			if (item.type == "buildings" && (item.name == "barrack-heavy" || item.name == "barrack-light")
				&& item.team == game.team && item.lifeCode == "healthy"){
				building = item;
				break;
			}
		};
		if (building){
			if(!building.queue){
				building.queue = [];
			}
			game.changeResources(vehicles.list[unitDetails.name].cost);

			building.unitQueue[unitDetails.name] ++;
			if(building.queue.length == 0){
				building.queue.push(unitDetails);
				game.sendCommand([building.uid],{type:"construct-unit",details:unitDetails});
			}
			else if (building.queue.length > 0){
				building.queue.push(unitDetails);
			}
		}
	},
	cancelDeployingBuilding: function(){
		game.deployBuilding = undefined;
	},
	finishDeployingBuilding: function(){
		var buildingName= game.deployBuilding;		
		var base;
		for (var i = game.selectedItems.length - 1; i >= 0; i--){
			var item = game.selectedItems[i];
			if (item.type == "buildings" && item.name == "base" 
				&& item.team == game.team && item.lifeCode == "healthy" && item.action=="stand"){
				base = item;
				break;
			}
		};		

		if (base){
			var buildingDetails = {type:"buildings",name:buildingName,x:mouse.gridX,y:mouse.gridY};
			game.sendCommand([base.uid],{type:"construct-building",details:buildingDetails});
		}
	
		// Clear deployBuilding flag
		game.deployBuilding = undefined;		
	},

	upgradeBuilding: function(upgrade){
		var base;
		for (var i = game.selectedItems.length - 1; i >= 0; i--){
			var item = game.selectedItems[i];
			if (item.type == "buildings" && (item.name == "base" || item.name == 'barrack-light')
				&& item.upgrade == true && item.team == game.team && item.lifeCode == "healthy" 
				&& (item.action=="stand" || item.action == "highlight")){
				base = item;
				break;
			}
		};
		var buildingName = upgrade;
		if (base){
			var buildingDetails = {type:"buildings", name: buildingName, x: base.x, y: base.y};
			if(base.waypointX || base.waypointY){
				buildingDetails.waypointX = base.waypointX;
				buildingDetails.waypointY = base.waypointY;
			}
			game.sendCommand([base.uid], {type:"upgrade-building", details:buildingDetails});
		}

	}
}