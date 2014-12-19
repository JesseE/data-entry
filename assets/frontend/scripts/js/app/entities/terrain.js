var terrain = {
	list:{
		"resource": {
			name: 			"resource",
			group: 			"resource",
			resourceCap: 	550,
			harvestValue: 	10,
			pixelWidth: 	70,
			pixelHeight: 	70,
			baseWidth: 		54,
			baseHeight: 	48,
			pixelOffsetX: 	8,
			pixelOffsetY: 	10,
			sight: 			5,
			action: 		"resource",
		    buildableGrid:[
				[1,1]
			],
			passableGrid:[
				[0,0]
			],
			spriteImages:[
				{name: "default", count: 4},
				{name: "default-damage", count: 4},
			],
		},

		"rare-resource": {
			name: 			"rare-resource",
			group: 			"resource",
			maxAmount: 		1000,
			amount: 		1000,
			value: 			100,
			pixelWidth: 	70,
			pixelHeight: 	70,
			baseWidth: 		54,
			baseHeight: 	48,
			pixelOffsetX: 	8,
			pixelOffsetY: 	10,
			sight: 			5,
			action: 		"resource",
		    buildableGrid:[
				[1,1]
			],
			passableGrid:[
				[0,0]
			],
			spriteImages:[
				{name: "default", count: 10},
				{name: "default-damage", count: 10},
			],
		},

		"teleport": {
			name: 			"teleport",
			group: 			"teleporter", 
			pixelWidth: 	250,
			pixelHeight: 	250,
			baseWidth: 		210,
			baseHeight: 	210,
			pixelOffsetX: 	0,
			pixelOffsetY: 	0,
			radius: 		100,
			sight: 			0,
		    buildableGrid:[
				[0,0]
			],
			passableGrid:[
				[0,0]
			],
			spriteImages:[
				{name: "default", count: 10},
			],
		},

		"teleport_small": {
			name: 			"teleport_small",
			group: 			"teleporter",
			pixelWidth: 	150,
			pixelHeight: 	150,
			baseWidth: 		150,
			baseHeight: 	150,
			pixelOffsetX: 	0,
			pixelOffsetY: 	0,
			radius: 		75,
			sight: 			0,
		    buildableGrid:[
				[0,0]
			],
			passableGrid:[
				[0,0]
			],
			spriteImages:[
				{name: "default", count: 10},
			],
		},
	},


	defaults:{
		type:"terrain",
		animationIndex:0,
		action:"default",
        selected:false,
		selectable:false,
		animate:function(){
			if(this.group == "resource"){
				overlay.checkDangerous(this);

				// If resources haven't been harvested before, set resources to the resourceCap (fill them)
				if(!this.resources && !this.harvested){
					this.resources = this.resourceCap;
					this.harvested = true;
					//console.log(this);
				}

				// Als resources op zijn, remove hem.
				if (this.resources <= 0){
					game.remove(this);
				}
			}

			switch (this.action){
				case "default":
				 	this.imageList = this.spriteArray["default"];

				 	// Als de unit op dangerous terrain staat
					if(this.dangerousTerrain){
						if(!this.spriteArray["default-damage"]) return;
						this.imageList = this.spriteArray["default-damage"];
					}

	                this.imageOffset = this.imageList.offset + this.animationIndex;
	                this.animationIndex++;
	                if (this.animationIndex>=this.imageList.count){                
	                    this.animationIndex = 0;              		
	                }
				break;
				case "hint":
					this.imageList = this.spriteArray["hint"];
					this.imageOffset = this.imageList.offset + this.animationIndex;
					this.animationIndex++;
					if (this.animationIndex>=this.imageList.count){                
					    this.animationIndex = 0;              		
					}
				break;

				case "resource":
					this.imageList = this.spriteArray["default"];
					// Als de unit op dangerous terrain staat
					if(this.dangerousTerrain){
						if(!this.spriteArray["default-damage"]) return;
						this.imageList = this.spriteArray["default-damage"];
					}
					
					this.imageOffset = this.imageList.offset + this.animationIndex;

					var index = (this.imageList.count) - Math.floor((this.resources / this.resourceCap*1.2)*this.imageList.count);
					this.animationIndex = index;


					if(this.animationIndex >= this.imageList.count){
						this.animationIndex = this.imageList.count-1;
					}

				break;
			}
		},
		draw:function(){
			var x = (this.x*game.gridSize)-game.offsetX-this.pixelOffsetX;
	        var y = (this.y*game.gridSize)-game.offsetY-this.pixelOffsetY;

			var colorOffset = 0; // No team based colors
			game.foregroundContext.drawImage(this.spriteSheet, this.imageOffset*this.pixelWidth,colorOffset,
	            this.pixelWidth,this.pixelHeight,x,y,this.pixelWidth,this.pixelHeight);
		}
	},
	load:loadItem,
	add:addItem,	
}