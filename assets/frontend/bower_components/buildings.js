var buildings = {
	list:{	
		"base":{
			name: 			"base",
			displayName: 	"Hatch egg",
			displayX: 		0,
			displayY: 		294,
			// Properties for drawing the object
			pixelWidth: 	90,
			pixelHeight: 	80,
			baseWidth: 		80,
			baseHeight: 	50,
			pixelOffsetX: 	5,
			pixelOffsetY: 	25,
			// Properties for describing structure for pathfinding
			buildableGrid:[
				[1,1],
				[1,1]
			],
			passableGrid:[
				[1,1],
				[1,1]
			],
			sight: 			6,
    	    hitPoints: 		500,
			cost: 			5000,
			upgrade: 		true,
			spriteImages:[
				{name:"healthy",count:1},
				{name:"highlight",count:7},
				{name:"damaged",count:1},
				{name:"contructing",count:3},				
			],
			processOrders: function(){
				switch (this.orders.type){
					case "construct-building":			
						this.action="construct";
						this.animationIndex = 0;
						var itemDetails = this.orders.details;
						// Teleport in building and subtract the cost from player cash
						itemDetails.team = this.team;
						itemDetails.action = "teleport";
						var item = game.add(itemDetails);

						game.changeResources(item.cost);
													
						this.orders = {type:"stand"};
						break;
					case "upgrade-building":	
						this.action="construct";
						this.animationIndex = 0;
						var itemDetails = this.orders.details;
						// Teleport in building and subtract the cost from player cash
						itemDetails.team = this.team;
						itemDetails.action = "teleport";
						var item = game.add(itemDetails);
						game.changeResources(item.cost);														
						this.orders = {type:"stand"};
						var uid = this.uid;
						var waypointX = (itemDetails.waypointX)? itemDetails.waypointX : 0;
						var waypointY = (itemDetails.waypointY)? itemDetails.waypointY : 0;
						game.remove(this);

						item.uid = uid;
						item.waypointX = waypointX;
						item.waypointY = waypointY;
						break;				
				}
			}
		},
		"barrack-heavy":{
			name: 			"barrack-heavy",
			displayName: 	"Heavy Barracks",
			displayX: 		0,
			displayY: 		441,
			pixelWidth: 	50,
			pixelHeight: 	100,
			baseWidth: 		50,
			baseHeight: 	95,
			pixelOffsetX: 	0,
			pixelOffsetY: 	5,
			buildableGrid:[
				[1,1],
				[1,1],
				[1,1]
			],
			passableGrid:[
				[1,1],
				[0,0],
				[0,0]
			],
			sight: 			7,
			cost: 			1800,
		  	hitPoints: 		300,
			spriteImages:[
				{name:"teleport",count:0},
				{name:"healthy",count:8},
				{name:"closing",count:8},
				{name:"damaged",count:1},
			],
			processOrders: function(){
				switch (this.orders.type){
					case "construct-unit":
						if(this.lifeCode != "healthy"){
							return;
						}

						this.action="open";
						this.animationIndex = 0;
						// Position new unit above center of starport
						var itemDetails = this.queue[0];
						itemDetails.x = this.x+0.5*this.pixelWidth/game.gridSize;
						itemDetails.y = this.y+0.5*this.pixelHeight/game.gridSize;
						// Teleport in unit and subtract the cost from player cash							
						itemDetails.action="teleport";
						itemDetails.team = this.team;
						var x = (this.waypointX)? this.waypointX : this.x + 7;
						var y = (this.waypointY)? this.waypointY : this.y;

						itemDetails.orders = {"type":"move","to":{"x": x,"y": y}}

						this.constructUnit = $.extend(true,[],itemDetails);
						
						this.orders = {type:"stand"};
						break;
						
					case "setWaypoint":			
						var to = this.orders.to;
						this.waypointX = to.x;
						this.waypointY = to.y;
						game.showTip("You've set a new waypoint at " + Math.round(this.waypointX*10)/10 + ", " + Math.round(this.waypointY*10)/10 + ".", 3000);									
						this.orders = {type:"stand"};
						break;
				}
			}
		},
		"barrack-light":{
			name: 			"barrack-light",
			displayName: 	"Light Barracks",
			displayX: 		0,
			displayY: 		588,
			pixelWidth: 	90,
			pixelHeight: 	90,
			baseWidth: 		80,
			baseHeight: 	73,
			pixelOffsetX: 	3,
			pixelOffsetY: 	10,
			buildableGrid:[
				[1,1],
				[1,1],
				[1,1]
			],
			passableGrid:[
				[1,1],
				[0,0],
				[0,0]
			],
			sight: 			7,
			cost: 			1000,
		  	hitPoints: 		300,
		  	upgrade: 		true,
			spriteImages:[
				{name:"teleport",count:8},
				{name:"healthy",count:16},
				{name:"closing",count:16},
				{name:"damaged",count:1},
			],
			processOrders: function(){
				switch (this.orders.type){
					case "construct-unit":
						if(this.lifeCode != "healthy"){
							return;
						}

						this.action="open";
						this.animationIndex = 0;
						// Position new unit above center of starport
						var itemDetails = this.queue[0];
						itemDetails.x = this.x+0.5*this.pixelWidth/game.gridSize;
						itemDetails.y = this.y+0.5*this.pixelHeight/game.gridSize;
						// Teleport in unit and subtract the cost from player cash							
						itemDetails.action="teleport";
						itemDetails.team = this.team;
						var x = (this.waypointX)? this.waypointX : this.x + 7;
						var y = (this.waypointY)? this.waypointY : this.y;

						itemDetails.orders = {"type":"move","to":{"x": x,"y": y}}

						this.constructUnit = $.extend(true,[],itemDetails);
						
						this.orders = {type:"stand"};
						break;

					case "setWaypoint":			
						var to = this.orders.to;
						this.waypointX = to.x;
						this.waypointY = to.y;
						game.showTip("You've set a new waypoint at " + Math.round(this.waypointX*10)/10 + ", " + Math.round(this.waypointY*10)/10 + ".", 3000);									
						this.orders = {type:"stand"};
						break;
					case "upgrade-building":	
						this.action="construct";
						this.animationIndex = 0;
						var itemDetails = this.orders.details;
						// Teleport in building and subtract the cost from player cash
						itemDetails.team = this.team;
						itemDetails.action = "teleport";
						var item = game.add(itemDetails);
						game.changeResources(item.cost);													
						this.orders = {type:"stand"};
						var uid = this.uid;
						var waypointX = (itemDetails.waypointX)? itemDetails.waypointX : 0;
						var waypointY = (itemDetails.waypointY)? itemDetails.waypointY : 0;
						game.remove(this);

						item.uid = uid;
						item.waypointX = waypointX;
						item.waypointY = waypointY;
						break;	
				}
			}
		},
		"depot": {
			name: 			"depot",
			displayName: 	"Resource Depot",
			displayX: 		0,
			displayY: 		147,
			pixelWidth: 	130,
			pixelHeight: 	130,
			baseWidth: 		130,
			baseHeight: 	105,
			pixelOffsetX: 	0,
			pixelOffsetY: 	20,
			resources: 		0,
			resourceCap: 	5000,
			action: 		"depot",
			buildableGrid:[
				[1,1]
			],
			passableGrid:[
				[0,0]
			],
			sight: 			4,
			cost: 			750,
		    hitPoints: 		300,
		    attackable: 	false,
			spriteImages:[
				{name:"healthy", count: 15},
				{name:"damaged", count:1},
				{name:"contructing", count:3},
			],
		},
	},
	defaults: {
		type: 				"buildings",
		animationIndex: 	0,
		direction: 			0,
		orders: { type: 	"stand" },
		action: 			"stand",
	    selected: 			false,
		selectable: 		true,
		// Default function for animating a building
		animate: function(){
			overlay.checkDangerous(this);
			
			if (this.life>this.hitPoints*0.1){
				this.lifeCode = "healthy";
			} else if (this.life <= 0){
				this.lifeCode = "dead";
				game.remove(this);
				return;				
			} else {
				this.lifeCode = "damaged";
			}

			switch (this.action){
				case "stand":
					this.imageList = this.spriteArray[this.lifeCode];
					this.imageOffset = this.imageList.offset + this.animationIndex;
					this.animationIndex++;
					if (this.animationIndex>=this.imageList.count){                
						this.animationIndex = 0;              		
					}
					break;

				case "depot":
					this.imageList = this.spriteArray[this.lifeCode];
					this.imageOffset = this.imageList.offset + this.animationIndex;

					var index = Math.floor((this.resources / this.resourceCap)*this.imageList.count);
					this.animationIndex = index;


					if(this.animationIndex >= this.imageList.count){
						this.animationIndex = this.imageList.count-1;
					}

					break;
				case "highlight":
					this.imageList = this.spriteArray["highlight"];
					this.imageOffset = this.imageList.offset + this.animationIndex;
					this.animationIndex++;
					if (this.animationIndex>=this.imageList.count){                
						this.animationIndex = 0;      		
					}

					break;
				case "construct":
					this.imageList = this.spriteArray["contructing"];
					this.imageOffset = this.imageList.offset + this.animationIndex;
					this.animationIndex++;
					// Once constructing is complete go back to standing
					if (this.animationIndex>=this.imageList.count){                
						this.animationIndex = 0;   
						this.action = "stand";						
					}
					break;	

				case "upgrade":
					this.imageList = this.spriteArray["contructing"];
					this.imageOffset = this.imageList.offset + this.animationIndex;
					this.animationIndex++;
					// Once constructing is complete go back to standing
					if (this.animationIndex>=this.imageList.count){                
						this.animationIndex = 0;   
						this.action = "stand";						
					}
					break;	

				case "teleport":
					this.imageList = this.spriteArray["teleport"];
					this.imageOffset = this.imageList.offset + this.animationIndex;
					this.animationIndex++;
					// Once teleporting is complete, move to either guard or stand mode
					if (this.animationIndex>=this.imageList.count){                
						this.animationIndex = 0;
						if (this.canAttack){
							this.action = "guard"; 
						} else {
							this.action = "stand"; 
						}	         		
					}
					break;	
				case "close":
				 	this.imageList = this.spriteArray["closing"];
					this.imageOffset = this.imageList.offset + this.animationIndex;
					this.animationIndex++;
					// Once closing is complete go back to standing
					if (this.animationIndex>=this.imageList.count){                
						this.animationIndex = 0;   
						this.action = "stand";
						if(this.queue){
							this.queue.splice(0,1);
						}
						// Maak de volgende unit in de queue.
						if(this.queue.length > 0){
							game.sendCommand([this.uid],{type:"construct-unit",details: this.queue[0]});
						}				
					}
					break;									
				case "open":
					this.imageList = this.spriteArray["closing"];
					// Opening is just the closing sprites running backwards
					this.imageOffset = this.imageList.offset + this.imageList.count - this.animationIndex;
					this.animationIndex++;
					// Once opening is complete, go back to close
					if (this.animationIndex>=this.imageList.count){                
					    this.animationIndex = 0;  
						this.action = "close";
						if(this.constructUnit){
							if(this.queue[0]){
								this.unitQueue[this.queue[0].name] --;

								if(this.unitQueue[this.queue[0].name] == 0){
									var name = this.queue[0].name;
									if(name){
										$('#'+name+'-button').find('span.queue_number').text('0').fadeOut('normal', function(){
											$('#'+name+'-button').find('span.queue_number').remove();
										});
									}
				
								}
								game.add(this.constructUnit);
							}

							this.constructUnit = undefined;
						}					
					}
					break;
				case "deploy":
					this.imageList = this.spriteArray["deploy"];
					this.imageOffset = this.imageList.offset + this.animationIndex;
					this.animationIndex++;
					// Once deploying is complete, go to harvest now
					if (this.animationIndex>=this.imageList.count){                
					    this.animationIndex = 0;  
						this.action = "harvest";
					}
					break;
															
				case "guard":
					if (this.lifeCode == "damaged"){
						// The damaged turret has no directions
						this.imageList = this.spriteArray[this.lifeCode];
					} else {
						// The healthy turret has 8 directions
						var direction = wrapDirection(Math.round(this.direction),this.directions);
						this.imageList = this.spriteArray[this.lifeCode+"-"+ direction];
					}				 	
				    this.imageOffset = this.imageList.offset;
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
		drawLifeBar: function(){
			var x = this.drawingX + this.pixelOffsetX;
		    var y = this.drawingY - 2*game.lifeBarHeight;
			game.foregroundContext.fillStyle = (this.lifeCode == "healthy")?game.healthBarHealthyFillColor:game.healthBarDamagedFillColor;			
			game.foregroundContext.fillRect(x,y,this.baseWidth*this.life/this.hitPoints,game.lifeBarHeight)
			game.foregroundContext.strokeStyle = game.healthBarBorderColor;
			game.foregroundContext.lineWidth = 1;
			game.foregroundContext.strokeRect(x,y,this.baseWidth,game.lifeBarHeight)
		},
		drawSelection: function(){
			var x = this.drawingX + this.pixelOffsetX;
		    var y = this.drawingY + this.pixelOffsetY;
			game.foregroundContext.strokeStyle = game.selectionBorderColor;	
			game.foregroundContext.lineWidth = 1;
			game.foregroundContext.fillStyle = game.selectionFillColor;
			game.foregroundContext.fillRect(x-1,y-1,this.baseWidth+2,this.baseHeight+2);
			game.foregroundContext.strokeRect(x-1,y-1,this.baseWidth+2,this.baseHeight+2);		
		},
		// Default function for drawing a building
		draw: function(){
			var x = (this.x*game.gridSize)-game.offsetX-this.pixelOffsetX;
		    var y = (this.y*game.gridSize)-game.offsetY-this.pixelOffsetY;
			this.drawingX = x;
			this.drawingY = y;
			if (this.selected){
				this.drawSelection();
				this.drawLifeBar();
				if(this.resourceCap > 0 && this.resources > 0){
					this.drawResourceBar();
				}
			}
			// All sprite sheets will have blue in the first row and green in the second row
			var colorIndex = (this.team == "blue")?0:1;
			var colorOffset = colorIndex*this.pixelHeight;
			game.foregroundContext.drawImage(this.spriteSheet, this.imageOffset*this.pixelWidth,colorOffset,
		           this.pixelWidth,this.pixelHeight,x,y,this.pixelWidth,this.pixelHeight);
		}
	},
	load: loadItem,
	add: addItem,
}