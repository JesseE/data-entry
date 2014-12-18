var debug = {

	init: function(){
		// make canvasses full screen
		var width = game.currentMapImage.width;
		var height = game.currentMapImage.height;
		debug.changeDimensions(width, height);
		$('#interface').remove();
	},

	changeDimensions: function(width, height){

		game.backgroundCanvas.width = width;
		game.backgroundCanvas.height = height;

		game.foregroundCanvas.width = width;
		game.foregroundCanvas.height = height;


		game.canvasWidth = width;
		game.canvasHeight = height;
		$('#gamecontainer').css({'width': width, 'height': height});
		$('#gameinterfacescreen').css({'width': width, 'height': height});
	},

	toggleGrid: function(){
		var value = $('#toggleGrid').attr('toggle');

		if(value == 'off'){
			debug.drawGrid('on');
		}else if(value == 'on'){
			debug.drawGrid('off');
		}
	},

	drawGrid: function(toggle){
		this.selectedTiles = [];

		if(toggle == 'on'){
			var width = game.currentMapImage.width;
			var height = game.currentMapImage.height;
			$('#debugGrid').css({'width': width, 'height': height});

			var grid = game.currentMapTerrainGrid;
			
			/* Div grid */
			for (var i = 0; i < grid.length; i++){
				var row = grid[i];
				// Loop through each row within the grid
				for(var j = 0; j < row.length; j++){
					var tile = row[j];
					var type = '';
					if(tile == 1){
						type = 'obstructed';
					}
					else if(tile == 2){
						type = 'dangerous';
					}

					$('#debugGrid').append('<div class="grid_tile '+type+'" x="'+j+'" y="'+i+'"></div>');
				}

			}
			/* grid events */
			$('.grid_tile').hover(function(){
				$('#x').text($(this).attr('x'));
				$('#y').text($(this).attr('y'));
			});

			$('.grid_tile').click(function(){
				if(!$(this).hasClass('selected')){
					var x = $(this).attr('x');
					var y = $(this).attr('y');
					var coords = '['+x+', '+y+'], '
					debug.selectedTiles.push(coords);

					$(this).addClass('selected');
				}
				// Add to screen
				debug.refreshSelectedGrid();
			});
			/* -- */

			$('#toggleGrid').attr('toggle', 'on');

		}else if(toggle == 'off'){
			$('#debugGrid').html('');
			$('#toggleGrid').attr('toggle', 'off');

			$('#debugGrid').css({'width': 0, 'height': 0});
		}
   		
		
	},

	refreshSelectedGrid: function(){
		var array = '';
		for(var i = 0; i < this.selectedTiles.length; i++){
			array += this.selectedTiles[i];
		}
		$('#grid_coords').text(array);
	}

}