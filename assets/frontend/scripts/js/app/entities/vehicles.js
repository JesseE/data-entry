var vehicles = {
	list:{
		/* Player units */
		"nanobot":{
			name: 			"nanobot",
			displayName: 	"Nanobot", 
			canAttack: 		true,
			canAttackLand: 	true,
			canAttackAir: 	false,
			canHarvest: 	true,
			weaponType: 	"bullet_white",
			displayX: 		0,
			displayY: 		735,
			pixelWidth: 	110,
			pixelHeight: 	110,
			pixelOffsetX: 	50,
			pixelOffsetY: 	58,
			radius: 		23,
			speed: 			40,
			sight:  		7,
			cost: 			0,
    	    hitPoints: 		110,
    	    regenerating: 	true,
    	    regen: 			0.01,
    	    resources:      0, 
    	    resourceCap: 	1000,
    	    resourceCode: 	"empty", 
			turnSpeed: 		5,
			spriteImages:[
				{name: "stand", count: 1, directions: 8},
				{name: "stand-damage", count: 1, directions: 8},
				{name: "harvest", count: 3, directions: 8},
				{name: "blood-damage", count: 1, directions: 8}		
			]
		},

		"cell-light":{
			name: 			"cell-light",
			displayName: 	"Base Cell", 
			canAttack: 		true,
			canAttackLand: 	true,
			canAttackAir: 	false,
			weaponType: 	"bullet",
			displayX: 		0,
			displayY: 		882,
			pixelWidth: 	35,
			pixelHeight: 	64,
			pixelOffsetX: 	17,
			pixelOffsetY: 	32,
			radius: 		16,
			speed: 			30,
			sight:  		6,
			cost: 			200,
    	    hitPoints: 		20,
			turnSpeed: 		6,
			spriteImages:[
				{name: "stand", count: 1, directions: 8},
				{name: "stand-damage", count: 1, directions: 8},
				{name: "blood-damage", count: 1, directions: 8}		
			],
		},

		"cell-heavy":{
			name: 			"cell-heavy",
			displayName: 	"Heavy Cell", 
			canAttack: 		true,
			canAttackLand: 	true,
			canAttackAir: 	false,
			weaponType: 	"bullet_green",
			displayX: 		0,
			displayY: 		1176,
			pixelWidth: 	35,
			pixelHeight: 	64,
			pixelOffsetX: 	17,
			pixelOffsetY: 	32,
			radius: 		16,
			speed: 			23,
			sight:  		6,
			cost: 			400,
    	    hitPoints: 		50,
			turnSpeed: 		6,
			spriteImages:[
				{name: "stand", count: 1, directions: 8},
				{name: "stand-damage", count: 1, directions: 8},
				{name: "blood-damage", count: 1, directions: 8}			
			],
		},

		"cell-yellow":{
			name: 			"cell-yellow",
			displayName: 	"Super Cell", 
			canAttack: 		true,
			canAttackLand: 	true,
			canAttackAir: 	false,
			weaponType: 	"bullet_yellow",
			displayX: 		0,
			displayY: 		1029,
			pixelWidth: 	35,
			pixelHeight: 	64,
			pixelOffsetX: 	17,
			pixelOffsetY: 	32,
			radius: 		16,
			speed: 			25,
			sight:  		6,
			cost: 			600,
    	    hitPoints: 		70,
			turnSpeed: 		6,
			spriteImages:[
				{name: "stand", count: 1, directions: 8},
				{name: "stand-damage", count: 1, directions: 8},
				{name: "blood-damage", count: 1, directions: 8}			
			],
		},

		/* Virus units */
		"virus-blue":{
			name: 			"virus-blue",
			displayName: 	"Weak Virus", 
			canAttack: 		true,
			canAttackLand: 	true,
			canAttackAir: 	false,
			weaponType: 	"bullet",
			displayX: 		0,
			displayY: 		1470,
			pixelWidth: 	34,
			pixelHeight: 	64,
			pixelOffsetX: 	17,
			pixelOffsetY: 	32,
			radius: 		15,
			speed: 			30,
			sight:  		5,
			cost: 			300,
    	    hitPoints: 		15,
			turnSpeed: 		16,
			spriteImages:[
				{name: "stand", count: 1, directions: 8},
				{name: "stand-damage", count: 1, directions: 8},
				{name: "blood-damage", count: 1, directions: 8}			
			],
		},
		"virus-rusty":{
			name: 			"virus-rusty",
			displayName: 	"Medium Virus", 
			canAttack: 		true,
			canAttackLand: 	true,
			canAttackAir: 	false,
			weaponType: 	"bullet",
			displayX: 		0,
			displayY: 		1617,
			pixelWidth: 	34,
			pixelHeight: 	64,
			pixelOffsetX: 	17,
			pixelOffsetY: 	32,
			radius: 		15,
			speed: 			30,
			sight:  		5,
			cost: 			300,
    	    hitPoints: 		25,
			turnSpeed: 		16,
			spriteImages:[
				{name: "stand", count: 1, directions: 8},
				{name: "stand-damage", count: 1, directions: 8},
				{name: "blood-damage", count: 1, directions: 8}			
			],
		},
		"virus-green":{
			name: 			"virus-green",
			displayName: 	"Extreme Virus", 
			canAttack: 		true,
			canAttackLand: 	true,
			canAttackAir: 	false,
			weaponType: 	"cannon-ball",
			displayX: 		0,
			displayY: 		1323,
			pixelWidth: 	70,
			pixelHeight: 	80,
			pixelOffsetX: 	35,
			pixelOffsetY: 	40,
			radius: 		23,
			speed: 			24,
			sight:  		6,
			cost: 			300,
    	    hitPoints: 		50,
			turnSpeed: 		6,
			spriteImages:[
				{name: "stand", count: 1, directions: 8},
				{name: "stand-damage", count: 1, directions: 8},
				{name: "blood-damage", count: 1, directions: 8}			
			],
		},

		"virus-blackwhite":{
			name: 			"virus-blackwhite",
			displayName: 	"Tough Virus", 
			canAttack: 		true,
			canAttackLand: 	true,
			canAttackAir: 	false,
			weaponType: 	"bullet",
			displayX: 		0,
			displayY: 		1764,
			pixelWidth: 	35,
			pixelHeight: 	64,
			pixelOffsetX: 	17,
			pixelOffsetY: 	32,
			radius: 		15,
			speed: 			22,
			sight:  		4,
			cost: 			300,
    	    hitPoints: 		40,
			turnSpeed: 		6,
			spriteImages:[
				{name: "stand", count: 1, directions: 8},
				{name: "stand-damage", count: 1, directions: 8},
				{name: "blood-damage", count: 1, directions: 8}			
			],
		},

		"enemy-nanobot":{
			name: 			"enemy-nanobot",
			displayName: 	"Evil Nanobot", 
			canAttack: 		true,
			canAttackLand: 	true,
			canAttackAir: 	false,
			weaponType: 	"bullet_boss",
			displayX: 		0,
			displayY: 		2058,
			pixelWidth: 	420,
			pixelHeight: 	380,
			pixelOffsetX: 	200,
			pixelOffsetY: 	200,
			isVisible: 		true, 
			radius: 		70,
			speed: 			0,
			sight:  		15,
			cost: 			300,
    	    hitPoints: 		300,
			turnSpeed: 		100,
			spriteImages:[
				{name: "stand", count: 1, directions: 16},
				{name: "explode", count: 10, directions: 1}		
			],
		},
		"boss-octopus":{
			name: 			"boss-octopus",
			displayName: 	"Super Virus", 
			canAttack: 		true,
			canAttackLand: 	true,
			canAttackAir: 	false,
			weaponType: 	"fireball_red",
			displayX: 		0,
			displayY: 		1911,
			pixelWidth: 	130,
			pixelHeight: 	155,
			pixelOffsetX: 	70,
			pixelOffsetY: 	65,
			radius: 		40,
			speed: 			15,
			sight:  		6,
			cost: 			500,
    	    hitPoints: 		150,
			turnSpeed: 		6,
			spriteImages:[
				{name: "stand", count: 1, directions: 8},
				{name: "stand-damage", count: 1, directions: 8}			
			],
		},	
		"boss-octopus-black":{
			name: 			"boss-octopus-black",
			displayName: 	"Super Virus", 
			canAttack: 		true,
			canAttackLand: 	true,
			canAttackAir: 	false,
			weaponType: 	"fireball_black",
			displayX: 		0,
			displayY: 		1911,
			pixelWidth: 	130,
			pixelHeight: 	155,
			pixelOffsetX: 	70,
			pixelOffsetY: 	65,
			radius: 		40,
			speed: 			15,
			sight:  		6,
			cost: 			300,
    	    hitPoints: 		200,
			turnSpeed: 		6,
			spriteImages:[
				{name: "stand", count: 1, directions: 8},
				{name: "stand-damage", count: 1, directions: 8}			
			],
		},	

	},
	defaults:{
		type:"vehicles",
		animationIndex:0,
		direction:0,
		action:"stand",
		orders:{type:"stand"},
        selected:false,	
		selectable:true,
		directions:8,
		// Make a list of collisions that the vehicle will have if it goes along present path
		checkCollisionObjects:function(grid){
			// Calculate new position on present path
			var movement = this.speed*game.speedAdjustmentFactor;
			var angleRadians = -(Math.round(this.direction)/this.directions)*2*Math.PI ;               
			var newX = this.x - (movement*Math.sin(angleRadians));
			var newY = this.y - (movement*Math.cos(angleRadians));            			

			// List of objects that will collide after next movement step
			var collisionObjects = [];

			// Test grid upto 3 squares away			
			var x1 = Math.max(0,Math.floor(newX)-3);
			var x2 = Math.min(game.currentLevel.mapGridWidth-1,Math.floor(newX)+3);

			var y1 = Math.max(0,Math.floor(newY)-3);
			var y2 = Math.min(game.currentLevel.mapGridHeight-1,Math.floor(newY)+3);

			for (var j=x1; j <= x2;j++){
				for(var i=y1; i<= y2 ;i++){
					if(grid[i][j]==1){
						if (Math.pow(j+0.5-newX,2)+Math.pow(i+0.5-newY,2) < Math.pow(this.radius/game.gridSize+0.1,2)){
			                      collisionObjects.push({collisionType:"hard",with:{type:"wall",x:j+0.5,y:i+0.5}});
			                  } else if (Math.pow(j+0.5-newX,2)+Math.pow(i+0.5-newY,2) < Math.pow(this.radius/game.gridSize+0.7,2)){
			                      collisionObjects.push({collisionType:"soft",with:{type:"wall",x:j+0.5,y:i+0.5}});
			                  }
					}	
				};
			};

			// Test vehicles that are less than 3 squares away for collisions
			for (var i = game.vehicles.length - 1; i >= 0; i--){
				var vehicle = game.vehicles[i];
				if (vehicle != this && Math.abs(vehicle.x-this.x)<3 && Math.abs(vehicle.y-this.y)<3){	
					if (Math.pow(vehicle.x-newX,2) + Math.pow(vehicle.y-newY,2) < Math.pow((this.radius+vehicle.radius)/game.gridSize,2)){
			           	collisionObjects.push({collisionType:"hard",with:vehicle});
			           } else if (Math.pow(vehicle.x-newX,2) + Math.pow(vehicle.y-newY,2) < Math.pow((this.radius*1.5+vehicle.radius)/game.gridSize,2)){
						collisionObjects.push({collisionType:"soft",with:vehicle});
			           }
				}
			};

			return collisionObjects;
		},
		moveTo:function(destination){
			if(this.action == 'harvest'){
				this.action = 'stand';
			}
			if(!game.currentMapPassableGrid){
				game.rebuildPassableGrid();
			}							
			// First find path to destination									
			var start = [Math.floor(this.x),Math.floor(this.y)];
			var end = [Math.floor(destination.x),Math.floor(destination.y)];  

			var grid = $.extend(true,[],game.currentMapPassableGrid);
			// Allow destination to be "movable" so that algorithm can find a path
			if(destination.type == "buildings"||destination.type == "terrain"){
				grid[Math.floor(destination.y)][Math.floor(destination.x)] = 0;
			}

			var newDirection;
			// if vehicle is outside bounds, just fly straight towards goal
			   if (start[1]<0||start[1]>=game.currentLevel.mapGridHeight||start[0]<0||start[0]>=game.currentLevel.mapGridWidth){
			       this.orders.path = [this,destination];				
			       newDirection = findAngle(destination,this,this.directions);
			   } else {
					this.orders.path = AStar(grid,start,end,'Euclidean');

					if (this.orders.path.length>1){
						var nextStep = {x:this.orders.path[1].x+0.5,y:this.orders.path[1].y+0.5};
						newDirection = findAngle(nextStep,this,this.directions);		
					} else if(start[0]==end[0] && start[1] == end[1]){ 
						// Reached destination grid;
						this.orders.path = [this,destination];			         
						newDirection = findAngle(destination,this,this.directions);
					} else { 
						// There is no path
						return false;
					}
			   }		  

			// check if moving along current direction might cause collision..
			// If so, change newDirection			
			var collisionObjects = this.checkCollisionObjects(grid);
			this.hardCollision = false;
			if (collisionObjects.length>0){
				this.colliding = true;


				// Create a force vector object that adds up repulsion from all colliding objects
				var forceVector = {x:0,y:0}
				// By default, the next step has a mild attraction force
				collisionObjects.push({collisionType:"attraction",with:{x:this.orders.path[1].x+0.5,y:this.orders.path[1].y+0.5}}); 
				for (var i = collisionObjects.length - 1; i >= 0; i--){
			        var collObject = collisionObjects[i];
			        var objectAngle = findAngle(collObject.with,this,this.directions);
					var objectAngleRadians = -(objectAngle/this.directions)*2*Math.PI ;    
			        var forceMagnitude;
					switch(collObject.collisionType){
					case "hard":
						forceMagnitude = 2;
						this.hardCollision = true;
						break;
					case "soft":
						forceMagnitude = 1;
						break;
					case "attraction":

						forceMagnitude = -0.25;
						break;
					}	

		           forceVector.x += (forceMagnitude*Math.sin(objectAngleRadians));
		           forceVector.y += (forceMagnitude*Math.cos(objectAngleRadians));
			    };
				// Find a new direction based on the force vector

				newDirection = findAngle(forceVector,{x:0,y:0},this.directions);
			} else {
				this.colliding = false;
			}

			// Calculate turn amount for new direction 
			var difference = angleDiff(this.direction,newDirection,this.directions);
			var turnAmount = this.turnSpeed*game.turnSpeedAdjustmentFactor;			
			if (this.hardCollision){
				// In case of hard collision, do not move forward, just turn towards new direction
				if (Math.abs(difference)>turnAmount){
					this.direction = wrapDirection(this.direction+turnAmount*Math.abs(difference)/difference,this.directions);
				}
			} else {
				// Otherwise, move forward, but keep turning as needed
				var movement = this.speed*game.speedAdjustmentFactor;
				var angleRadians = -(Math.round(this.direction)/this.directions)*2*Math.PI ;               
			          this.lastMovementX = - (movement*Math.sin(angleRadians));
			          this.lastMovementY = - (movement*Math.cos(angleRadians));            
			          this.x = (this.x +this.lastMovementX);
			          this.y = (this.y +this.lastMovementY);
				if (Math.abs(difference)>turnAmount){
					this.direction = wrapDirection(this.direction+turnAmount*Math.abs(difference)/difference,this.directions);				
				}
			}
			return true;
		},
		isValidTarget:isValidTarget,
		findTargetsInSight:findTargetsInSight,
		processOrders:function(){
			this.lastMovementX = 0;
		    this.lastMovementY = 0;	
			if(this.reloadTimeLeft){
				this.reloadTimeLeft--;
			}		
			var target;
			switch (this.orders.type){
				case "stand":
					var targets = this.findTargetsInSight();
					if(targets.length>0){
						this.orders = {type:"attack",to:targets[0]};
					}
					break;
				case "sentry":
					var sight = (this.sight)? this.sight : 3;
					var targets = this.findTargetsInSight(sight);
					if(targets.length>0){
						this.orders = {type:"attack",to:targets[0],nextOrder:this.orders};
					}
					break;					
				case "hunt":
					var targets = this.findTargetsInSight(100);
					if(targets.length>0){
						this.orders = {type:"attack",to:targets[0],nextOrder:this.orders};
					}
					break;
				case "move":
					if ((Math.pow(this.orders.to.x-this.x,2) + Math.pow(this.orders.to.y-this.y,2))<Math.pow(this.radius/game.gridSize,2)) {						
						//Stop when within one radius of the destination						
						this.orders = {type:"stand"};
						return;
		            } else if (this.colliding && (Math.pow(this.orders.to.x-this.x,2) + Math.pow(this.orders.to.y-this.y,2))<Math.pow(this.radius*2/game.gridSize,2)) {
						//Stop when within 3 radius of the destination if colliding with something
						this.orders = {type:"stand"};
						return;
		            } else {						
						if (this.colliding && (Math.pow(this.orders.to.x-this.x,2) + Math.pow(this.orders.to.y-this.y,2))<Math.pow(this.radius*5/game.gridSize,2)) {
							// Count collsions within 5 radius distance of goal						
							if (!this.orders.collisionCount){
								this.orders.collisionCount = 1
							} else {
								this.orders.collisionCount ++;
							}
							// Stop if more than 30 collisions occur
							if (this.orders.collisionCount > 30) {
								this.orders = {type:"stand"};
								return;
							}
					    }
		                var moving = this.moveTo(this.orders.to);
						// Pathfinding couldn't find a path so stop
						if(!moving){
							this.orders = {type:"stand"};
							return;
						}

		            }												
					break;

				case "harvest":
					if(this.canHarvest && !this.dangerousTerrain){
						if(this.orders.to.lifeCode == "dead"){
							if (this.orders.nextOrder){
								this.orders = this.orders.nextOrder;
							} else {
								this.orders = {type:"returnResource"};								
							}
							return;
						}
						if ((Math.pow(this.orders.to.x-this.x, 2) + Math.pow(this.orders.to.y-this.y, 2)) < Math.pow(2.5 ,2)) {						
							//Turn towards target and then start harvesting when within range of the target 
							var newDirection = findFiringAngle(this.orders.to,this,this.directions);	
							var difference = angleDiff(this.direction,newDirection,this.directions);											
							var turnAmount = this.turnSpeed*game.turnSpeedAdjustmentFactor;	
							if (Math.abs(difference)>turnAmount){
								this.direction = wrapDirection(this.direction+turnAmount*Math.abs(difference)/difference,this.directions);				
								return;
							} 
							else if(this.resources != this.resourceCap) {

								var resource = this.orders.to;
								var res = game.getItemByUid(resource.uid);

								if(!res){
									// Hier neerzetten wat er gebeurt als resource 0 is.
									// ---
									this.animationIndex = 0;
									this.action = "stand";

									game.findNearest(this, 'group', 'resource');
									this.orders.to = this.nearestResource;
									break;
								}

								else{
									// Hier animatie voor nanobot veranderen
									this.action = "harvest";
									
									this.resources += resource.harvestValue;
									resource.resources -= resource.harvestValue;
								}
							}
							else if (this.resources == this.resourceCap){
								this.orders = {type: "returnResources"};						    
							}					
			            } 
			            else {						
			                var moving = this.moveTo(this.orders.to);
							// Pathfinding couldn't find a path so stop
							if(!moving){
								this.orders = {type:"stand"};
								return;
							}
			            }	
					}
					if(this.dangerousTerrain){
						this.action = 'stand';
						this.orders = {type:"stand"};
					}
					break;

				case "returnResources":

					this.action = 'stand';
					// Bepaal de target depot door te kijken of er handmatig geklikt is, of dat de nanobot vol is.
					if(!this.orders.returnManual){
						game.findNearest(this, 'name', 'depot');
						var depot = this.nearestDepot;
					}else if(this.orders.returnManual){
						var depot = this.orders.to;
					}

					this.orders.to = depot;
					var depot = this.orders.to;

					if ((Math.pow(this.orders.to.x-this.x,2) + Math.pow(this.orders.to.y-this.y,2))<Math.pow(2,2)) {						
						if(depot.resources <= depot.resourceCap-this.resources){
							depot.resources += this.resources;
							this.resources = 0;
				
						}else if(depot.resources > depot.resourceCap-this.resources && depot.resources < depot.resourceCap){
							var rest = depot.resourceCap - depot.resources;
							depot.resources = depot.resourceCap;
							this.resources -= rest;
							
						}else if(depot.resources == depot.resourceCap){
							game.showMessage("system","Warning! Resource depot is totally full!");
						}
						if(this.orders.returnManual){
							this.orders.returnManual = false;
						}

						this.orders = {type: "stand"};
		            } else {
		            	
		                var moving = this.moveTo(this.orders.to);

						// Pathfinding couldn't find a path so stop
						if(!moving){
							this.orders = {type:"stand"};
							return;
						}
		            }

					break;

				case "attack":
					if(this.orders.to.lifeCode == "dead"){

						if (this.orders.nextOrder){
							this.orders = this.orders.nextOrder;
						} else {
							this.orders = {type:"stand"};								
						}
						return;
					}
					if ((Math.pow(this.orders.to.x-this.x,2) + Math.pow(this.orders.to.y-this.y,2))<Math.pow(this.sight,2)) {						
						//Turn towards target and then start attacking when within range of the target 
						var newDirection = findFiringAngle(this.orders.to,this,this.directions);	
						var difference = angleDiff(this.direction,newDirection,this.directions);											
						var turnAmount = this.turnSpeed*game.turnSpeedAdjustmentFactor;	
						if (Math.abs(difference)>turnAmount){
							this.direction = wrapDirection(this.direction+turnAmount*Math.abs(difference)/difference,this.directions);				
							return;
						} else {
							this.direction = newDirection;
							if(!this.reloadTimeLeft){
								this.reloadTimeLeft = bullets.list[this.weaponType].reloadTime;
								var angleRadians = -(Math.round(this.direction)/this.directions)*2*Math.PI ; 
								var bulletX = this.x- (this.radius*Math.sin(angleRadians)/game.gridSize);
								var bulletY = this.y- (this.radius*Math.cos(angleRadians)/game.gridSize);
								var bullet = game.add({name:this.weaponType,type:"bullets",x:bulletX,y:bulletY,direction:newDirection,target:this.orders.to});
							}							
						}					
		            } else {						
		                var moving = this.moveTo(this.orders.to);
						// Pathfinding couldn't find a path so stop
						if(!moving){
							this.orders = {type:"stand"};
							return;
						}
		            }												
					break;
				case "patrol":
					var targets = this.findTargetsInSight(1);
					if(targets.length>0){
						this.orders = {type:"attack",to:targets[0],nextOrder:this.orders};
						return;
					}
					if ((Math.pow(this.orders.to.x-this.x,2) + Math.pow(this.orders.to.y-this.y,2))<Math.pow(this.radius*4/game.gridSize,2)) {
						var to = this.orders.to;
						this.orders.to = this.orders.from;
						this.orders.from = to;
		            } else {
		            	this.moveTo(this.orders.to);					
		            }
					break;

				case "guard":
					if(this.orders.to.lifeCode == "dead"){
						if (this.orders.nextOrder){
							this.orders = this.orders.nextOrder;
						} else {
							this.orders = {type:"guard"};								
						}
						return;
					}
					if ((Math.pow(this.orders.to.x-this.x,2) + Math.pow(this.orders.to.y-this.y,2))<Math.pow(this.sight-2,2)) {
						var targets = this.findTargetsInSight(1);
						if(targets.length>0){
							this.orders = {type:"attack",to:targets[0],nextOrder:this.orders};
							return;
						} 
		            } else {
		            	this.moveTo(this.orders.to);					
		            }
					break;										
				case "deploy":
					// If target is oil field, move to middle of oil field
					var target = {x:this.orders.to.x+1,y:this.orders.to.y+0.5,type:"terrain"};
					if ((Math.pow(target.x-this.x,2) + Math.pow(target.y-this.y,2))<Math.pow(this.radius*2/game.gridSize,2)) {						
						// After reaching oil field, turn harvester to point towards left (direction 6)
						var difference = angleDiff(this.direction,6,this.directions);
						var turnAmount = this.turnSpeed*game.turnSpeedAdjustmentFactor;			
						if (Math.abs(difference)>turnAmount){
							this.direction = wrapDirection(this.direction+turnAmount*Math.abs(difference)/difference,this.directions);
						} else {
							// Once it is pointing to the left, remove the harvester and oil field and deploy a harvester building 	
							game.remove(this.orders.to);
							game.remove(this);
							game.add({type:"buildings",name:"harvester",x:this.orders.to.x,y:this.orders.to.y,action:"deploy",team:this.team});																	
						}						
				    } else {
				        var moving = this.moveTo(target);
						// Pathfinding couldn't find a path so stop
						if(!moving){
							this.orders = {type:"stand"};
						}
				    }
					break;
				case "flash":
						var orders = this.orders;
						this.action = 'flash';

						if(this.orders.flashing == false){
							// verplaats locatie
							this.x = this.orders.to.x;
							this.y = this.orders.to.y;
							
							if(this.team == game.team){
								// Pan to: X, Y, duration, show UID, keep unit visible after
								if(!game.panning && game.pannable){
			        				
			        			}
							}
							this.action = 'flash';

							this.orders = {type:"stand"};
						}
						
					break;
			}
		},
		animate:function(){
			// Slowly regen nanobot's health
			if (this.life < this.hitPoints && this.regenerating){
				this.life += this.regen;
			}

			if (this.name == 'enemy-nanobot'){
				if(this.life < 1 && !this.exploded){
					this.life =1;
					if(!this.exploding){
						this.animationIndex = 0;
						this.action = "explode";
						sounds.play('explode');
					}
				}
			}

			if (this.life > this.hitPoints*0.4){
				this.lifeCode = "healthy";
			} else if (this.life <= 0){
				this.lifeCode = "dead";
				if(this.dangerousTerrain){
					sounds.soundPause("danger");
				}
				game.remove(this);
				return;				
			} else {
				this.lifeCode = "damaged";
			}

			overlay.checkDangerous(this);
	
			switch (this.action){
				case "stand":
					var direction = wrapDirection(Math.round(this.direction),this.directions);
					this.imageList = this.spriteArray["stand-"+direction];
					// Als de unit op dangerous terrain staat
					if(this.dangerousTerrain){
						if(overlay.overlayName == 'acid'){
							if(!this.spriteArray["stand-damage-"+direction]) return;
							this.imageList = this.spriteArray["stand-damage-"+direction];
						}
						if(overlay.overlayName =='blood'){
							if(!this.spriteArray["blood-damage-"+direction]) return;
							this.imageList = this.spriteArray["blood-damage-"+direction];
						}
						
					}
					this.imageOffset = this.imageList.offset + this.animationIndex;				
					this.animationIndex++;
			
					if (this.animationIndex>=this.imageList.count){                
						this.animationIndex = 0;              
					}
			
					break;
				case "teleport":
					var direction = wrapDirection(Math.round(this.direction),this.directions);
					this.imageList = this.spriteArray["stand-"+direction];
					this.imageOffset = this.imageList.offset + this.animationIndex;				
					this.animationIndex++;

					if (this.animationIndex>=this.imageList.count){                
						this.animationIndex = 0;              
					}
					if (!this.brightness){
						this.brightness = 1;
					} 
					this.brightness -= 0.2;
					if(this.brightness <= 0){
						this.brightness = undefined;
						this.action = "stand";
					}
					break;

				case "flash":
					this.orders.flashing = true;
					var direction = wrapDirection(Math.round(this.direction),this.directions);
					this.imageList = this.spriteArray["stand-"+direction];
					this.imageOffset = this.imageList.offset + this.animationIndex;				
					this.animationIndex++;

					if (this.animationIndex>=this.imageList.count){                
						this.animationIndex = 0;              
					}
					if (!this.brightness){
						this.brightness = 1;
					} 
					this.brightness -= 0.05;
					if(this.brightness <= 0){
						this.brightness = undefined;
						this.orders.flashing = false;
						this.action = "stand";
					}
					break;

				case "harvest":
					var direction = wrapDirection(Math.round(this.direction),this.directions);
					this.imageList = this.spriteArray["harvest-"+direction];

					this.imageOffset = this.imageList.offset + this.animationIndex;				
					this.animationIndex++;
					
					if (this.animationIndex>=this.imageList.count){                
						this.animationIndex = 0;

					}
			
					break;	
				case "explode":
					if(!this.exploding){
						this.exploding = true;
					}
					var direction = 0;
					this.imageList = this.spriteArray["explode-"+direction];

					this.imageOffset = this.imageList.offset + this.animationIndex;				
					this.animationIndex++;

					if (this.animationIndex>=this.imageList.count){           
						this.animationIndex = 0;
						this.exploded = true;
						this.exploding = false; 
						this.action = 'stand';          
					}
			
					break;		
			}
		},
		drawResourceBar:function(){
			var x = this.drawingX;
		    var y = this.drawingY - 4*game.resourceBarHeight;
			game.foregroundContext.fillStyle = (this.resourceCode == "empty")?game.resourceBarHealthyFillColor:game.resourceBarDamagedFillColor;			
			game.foregroundContext.fillRect(x,y,this.pixelWidth * this.resources/this.resourceCap, game.resourceBarHeight)
			game.foregroundContext.strokeStyle = game.healthBarBorderColor;
			game.foregroundContext.lineWidth = 1;
			game.foregroundContext.strokeRect(x,y,this.pixelWidth,game.resourceBarHeight)
		},
		drawLifeBar:function(){
			var x = this.drawingX;
		    var y = this.drawingY - 2*game.lifeBarHeight;
			game.foregroundContext.fillStyle = (this.lifeCode == "healthy")?game.healthBarHealthyFillColor:game.healthBarDamagedFillColor;			
			game.foregroundContext.fillRect(x,y,this.pixelWidth*this.life/this.hitPoints,game.lifeBarHeight)
			game.foregroundContext.strokeStyle = game.healthBarBorderColor;
			game.foregroundContext.lineWidth = 1;
			game.foregroundContext.strokeRect(x,y,this.pixelWidth,game.lifeBarHeight)
		},
		drawSelection:function(){
			var x = this.drawingX + this.pixelOffsetX;
		    var y = this.drawingY + this.pixelOffsetY;
			game.foregroundContext.strokeStyle = game.selectionBorderColor;
			game.foregroundContext.lineWidth = 1;
			game.foregroundContext.beginPath();
			game.foregroundContext.arc(x,y,this.radius,0,Math.PI*2,false);
			game.foregroundContext.fillStyle = game.selectionFillColor;
			game.foregroundContext.fill();
			game.foregroundContext.stroke();
		},
		draw:function(){
			var x = (this.x*game.gridSize)-game.offsetX-this.pixelOffsetX + this.lastMovementX*game.drawingInterpolationFactor*game.gridSize;
		    var y = (this.y*game.gridSize)-game.offsetY-this.pixelOffsetY + this.lastMovementY*game.drawingInterpolationFactor*game.gridSize;
			this.drawingX = x;
			this.drawingY = y;

			if (this.selected){
				this.drawSelection();
				this.drawLifeBar();
				if(this.canHarvest && this.resources > 0){
					this.drawResourceBar();
				}
			}

			var colorIndex = (this.team == "blue")?0:1;
			var colorOffset = colorIndex*this.pixelHeight;

			game.foregroundContext.drawImage(this.spriteSheet, this.imageOffset*this.pixelWidth,colorOffset,
		           this.pixelWidth,this.pixelHeight,x,y,this.pixelWidth,this.pixelHeight);

			// Draw glow while teleporting in
			if(this.brightness){
				game.foregroundContext.beginPath();
				game.foregroundContext.arc(x+ this.pixelOffsetX,y+this.pixelOffsetY,this.radius,0,Math.PI*2,false);
				game.foregroundContext.fillStyle = 'rgba(255,255,255,'+this.brightness+')';
				game.foregroundContext.fill();
			}
		}
	},
	load:loadItem,
	add:addItem,	
}