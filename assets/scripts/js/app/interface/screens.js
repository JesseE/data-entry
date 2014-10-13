var screens = {
	queryInit: [],

	show: function(screen){
		$('.gamelayer').hide();
		$('.bg_back_active').hide();
		$('.screen_mute_button').show();

		sounds.play('splashMusic', true);

		// Algemene queries
		if(!this.queryInit['global']){
			// Laat de game weten dat de jquery voor dit scherm geinitialiseerd is.
			this.queryInit['global'] = true;

			$('span.back_button').hover(
				function(){
					sounds.play("button");
					var background = $(this).parent().find('.bg_back_active');
					$(background).stop(true, true).fadeIn(200);
				}, function(){
					var background = $(this).parent().find('.bg_back_active');
					$(background).stop(true, true).fadeOut(300);
			});

			$('span.enter_button').hover(
				function(){
					sounds.play("button");
					var background = $(this).parent().find('.bg_entermission_active');
					$(background).stop(true, true).fadeIn(200);
				}, function(){
					var background = $(this).parent().find('.bg_entermission_active');
					$(background).stop(true, true).fadeOut(300);
			});

			$('span.enter_button').hover(
				function(){
					sounds.play("button");
					var background = $(this).parent().find('.bg_startmission_active');
					$(background).stop(true, true).fadeIn(200);
				}, function(){
					var background = $(this).parent().find('.bg_startmission_active');
					$(background).stop(true, true).fadeOut(300);
			});
			
		}

		switch(screen){
			case 'start_screen':
				// Hide eerst de hover bgs.
				$('.start_bg').hide();

				// Fade in start screen
				$('#gamestartscreen').fadeIn();

				if(!this.queryInit[screen]){
					// Laat de game weten dat de jquery voor dit scherm geinitialiseerd is.
					this.queryInit[screen] = true;

					// Zorg dat de knoppen een hover effect hebben.
					$('span.start_button').each(function(){
						var background = '#bg_' + $(this).attr('id').slice(7);

						$(this).hover(function(){
							sounds.play("button");
							$(background).stop(true, true).fadeIn(300);
						}, function(){
							$(background).stop(true, true).fadeOut(400);
						});
					});
				}
				break;

			case 'new_campaign':
				singleplayer.start();

				if(!this.queryInit[screen]){
					// Laat de game weten dat de jquery voor dit scherm geinitialiseerd is.
					this.queryInit[screen] = true;
				}
				break;

			case 'load_savegame':
				singleplayer.start('savegame_1');

				if(!this.queryInit[screen]){
					// Laat de game weten dat de jquery voor dit scherm geinitialiseerd is.
					this.queryInit[screen] = true;
				}
				break;

			case 'mission_screen':
				// Verwijder de huidige slider
				$('#briefing_slider').html('');

				$('#missionscreen').fadeIn();
				$('#missionscreen').find('.bg_startmission_active').hide();
				$('#missionscreen').find('.bg_back_active').hide();
				$('#missionscreen').find('.bg_startmission').hide();

				$('#missionscreen').find('.enter_button').hide();
				$('#missionscreen').find('.back_button').hide();
				$('#missionscreen').find('.bg_startmission').hide();
				$('#missionscreen').find('.bg_back').hide();

				if(!this.queryInit[screen]){
					// Laat de game weten dat de jquery voor dit scherm geinitialiseerd is.
					this.queryInit[screen] = true;	

					$('#startmission').click(function(){
						var disabled = $(this).attr('disabled');
						if(!disabled){
							singleplayer.play();
						}
					});		
				}
				break;

			case 'outro_screen':
				// Verwijder de huidige slider
				$('#briefing_slider').html('');

				$('#outroscreen').fadeIn();
				$('#outroscreen').find('.bg_startmission_active').hide();
				$('#outroscreen').find('.bg_back_active').hide();
				$('#outroscreen').find('.bg_startmission').hide();

				$('#outroscreen').find('.enter_button').hide();
				$('#outroscreen').find('.back_button').hide();
				$('#outroscreen').find('.bg_startmission').hide();
				$('#outroscreen').find('.bg_back').hide();

				if(!this.queryInit[screen]){
					// Laat de game weten dat de jquery voor dit scherm geinitialiseerd is.
					this.queryInit[screen] = true;
				}
				break;

			case 'select_level':
				$('#missionselectscreen').find('.enter_button').hide();
				$('#missionselectscreen').find('.bg_entermission').hide();
				$('#missionselectscreen').find('.bg_entermission_active').hide();
				$('#briefing').attr('current', '');
				$('#briefing_image').css('background-image', '').hide();
				$('#briefing_text').find('h1').text('Select level');
				$('#briefing_text').find('p').text('Select one of the organs to the left to receive more information on the level.');
				// Fade in mission select screen
				$('#missionselectscreen').fadeIn();

				if(!this.queryInit[screen]){
					// Laat de game weten dat de jquery voor dit scherm geinitialiseerd is.
					this.queryInit[screen] = true;


					// Maak hover effect voor de verschillende levels
					$('.select_button').hover(
						function(){
							var id = $(this).attr('id');
							var top = $(this).position().top;
							var left = $(this).position().left;

							$('#torso').append('<div class="mission_infobox mission_infobox_'+id+'">'+capitalize(id)+'</div>');

							$('.mission_infobox_'+id).css({
									'top': top,
									'left': left + $(this).width() + 5,
							}).fadeIn(300);

						},
						function(){
							$('.mission_infobox').fadeOut(400, function(){
								$(this).remove();
							});
						}
					);

					//	Toon info als er op geklikt wordt.
					$('.select_button').click(function(){
						var id = $(this).attr('id');
						var levelNumber;
						switch(id){
							case 'stomach':
								levelNumber = 0;
								break;
							case 'intestines':
								levelNumber = 1;
								break;
							case 'heart':
								levelNumber = 2;
								break;
						}
						var level = maps.singleplayer[levelNumber];
						var h1 = capitalize(level.name);
						var p = level.description;

						if($('#briefing').attr('current') != id){
							// Verwijder de vorige current
							$('#briefing').attr('current', '');
							// Fade out/in nieuwe briefing & geef current mee.
							$('#briefing').stop(true, true).fadeOut(400, function(){
								$('#briefing').attr('current', id);
								$('#briefing_image').css('background-image', 'url(images/screens/level_select/'+id+'_thumb.jpg)').show();
								$('#briefing_text').find('h1').text(h1);
								$('#briefing_text').find('p').text(p);

								$('#briefing').fadeIn(300);
								$('#missionselectscreen').find('.enter_button').fadeIn(300);
								$('#missionselectscreen').find('.bg_entermission').fadeIn(300);
							});
						}

						$('#missionselectscreen').find('.enter_button').unbind('click').click(function(){
							singleplayer.start(levelNumber);
						});

						
					});
				}
				break;

			case 'loading_screen':
				$('#loadingscreen').fadeIn();
				break;

			case 'credits':
				// Fade in credits screen
				$('#creditsscreen').fadeIn();
				break;

			case 'instructions':
				// Fade in instructions screen
				$('#instructionsscreen').fadeIn();
				break;
		}
	},

	showPopup: function(screen, callback){
		game.messageCallback = callback;
		var next_mission = '<span class="messagebox_button button_left" id="next_mission" onclick="game.messageCallback();"></span>';
		var final_mission = '<span class="messagebox_button button_left" id="final_mission" onclick="game.messageCallback();"></span>';
		var retry = '<span class="messagebox_button button_left" id="retry_mission" onclick="game.messageCallback();"></span>';
		var exit = '<span class="messagebox_button button_right" id="exit_popup" onclick="game.exitGame();"></span>';
		// Empty messagebox
		$('.messagebox').removeAttr('id');
		$('.messagebox').html('');

		switch(screen){
			case 'mission_completed':
				$('.messagebox').attr('id', 'victory');

				$('.messagebox').append(next_mission);
				$('.messagebox').append(exit);
				break;
			case 'last_mission':
				$('.messagebox').attr('id', 'victory');
				$('.messagebox').append(final_mission);
				$('.messagebox').append(exit);
				break;
			case 'mission_failed':
				$('.messagebox').attr('id', 'game_over');
				$('.messagebox').append(retry);
				$('.messagebox').append(exit);
				break;
		}

		$('#messageboxscreen').fadeIn(400);
	},

	startBriefing: function(level, screen){
		if(!screen){
			screen = '#missionscreen';
		}
		var id = '#'+level.name;
		$(screen).find('#briefing_slider').append('<ul class="briefing_slider_ul" id="'+level.name+'"></ul>');

		for(var i = 0; i < level.briefingImages.length; i++){
			var src = level.briefingImages[i];
			var html = '<li><img src="'+src+'" alt=""/></li>';
			$(screen).find('#briefing_slider').find(id).append(html);
		}
		var index = 1;
		
		$(document).ready(function(){

		$(id).rhinoslider({
			effect: 'fade',
			easing: 'easeOutQuint',
			changeBullets: 'after',
			controlsKeyboard: false,
			controlsMousewheel: false,
			controlsPlayPause: false,
			showBullets: 'never',
			showControls: 'always',
			cycled: false,
			callBackInit: function(){
				$('.rhino-prev').hide();
			},
			
			callBackNext: function(){
				index ++;
				if(index == level.briefingImages.length){
					$(screen).find('.enter_button').fadeIn(600);
					$(screen).find('.back_button').fadeIn(600);
					$(screen).find('.bg_startmission').fadeIn(600);
					$(screen).find('.bg_back').fadeIn(600);

					$('.rhino-next').fadeOut(600);
				}else if(index > 1){
					$('.rhino-prev').fadeIn(600);
				}
			},

			callBackPrev: function(){
				index --;
				if(index < level.briefingImages.length){
					$(screen).find('.enter_button').fadeOut(600);
					$(screen).find('.back_button').fadeOut(600);
					$(screen).find('.bg_startmission').fadeOut(600);
					$(screen).find('.bg_back').fadeOut(600);
					$('.rhino-next').fadeIn(600);
				}else if (index == 1){
					$('.rhino-prev').fadeOut(600);
				}
			}
		});
		});
		$('.rhino-btn').mouseover(function(){
			sounds.play("button");
		});
		
	},

	hide: function (){
		// Show the starting menu layer
		$('.gamelayer').hide();
        screens.show('start_screen');
	},
}