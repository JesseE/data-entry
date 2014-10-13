var sounds = {
	list:{
		"splashMusic" : ["intro_loop"],
		"background4" : ["background4"],
		"background2" : ["background2"],
		"background1" : ["background1"],

		"bullet":["ball","splat", "splash"],
		"bullet_green": ["ball","splat", "splash"],
		"bullet_yellow": ["ball","splat", "splash"],
		"bullet_white": ["ball","splat", "splash"],
		"bullet_white2": ["ball","splat", "splash"],
		"bullet_boss": ["bullet_boss"],
		"heatseeker":[],
		"fireball":["ball","splat", "splash"],
		"fireball_red":["fireball_1", "fireball_2", "fireball_3"],
		"fireball_black":["fireball_1", "fireball_2", "fireball_3"],
		"cannon-ball":["ball","splat", "splash"],

		"bullet_boss_explode":["bullet_boss_explosion"],

		"message-received":["message"],
		"acknowledge-attacking":["engaging"],
		"acknowledge-moving":["nanobot"],

		"gurgle" : ["gurgle"],
		"danger" : ["danger"],
		"explode": ["explode"],

		"screenSwap" : ["screen_swap"],
		"showMenu" : ["screen_swap"],
		"startGame" : ["startGame"],
		"button" : ["button"]
	},
	mute: false,
	loaded:{},
	init: function(){
		for(var soundName in this.list){
			var sound = {};
			sound.audioObjects = [];
			for (var i=0; i < this.list[soundName].length; i++) {
				sound.audioObjects.push(loader.loadSound('audio/'+this.list[soundName][i]));
			};			
			this.loaded[soundName] = sound;
		}		
	},
	play: function(soundName, loop, fade){
		if(!game.paused){
			var sound = sounds.loaded[soundName];
			if(sound && sound.audioObjects && sound.audioObjects.length>0){
				if(!sound.counter || sound.counter>= sound.audioObjects.length){
					sound.counter = 0;
				}
				var audioObject = sound.audioObjects[sound.counter];
				sound.counter++;
				audioObject.play();
				audioObject.loop = loop;
				if(fade && !sounds.mute){
					audioObject.volume = 0;
					sounds.fadeVolume(soundName, 1, fade);
				}
				if(sounds.mute){
					audioObject.volume = 0;
				}
			}
		}
				
	},
	stop: function(soundName){
		var sound = sounds.loaded[soundName];
		if(sound && sound.audioObjects && sound.audioObjects.length>0){
			if(!sound.counter || sound.counter>= sound.audioObjects.length){
				sound.counter = 0;
			}
			var audioObject = sound.audioObjects[sound.counter];

			audioObject.pause();
		}
	},

	soundPause: function(soundName){
		var sound = sounds.loaded[soundName];
		if(sound && sound.audioObjects && sound.audioObjects.length>0){
			if(!sound.counter || sound.counter>= sound.audioObjects.length){
				sound.counter = 0;
			}
			var audioObject = sound.audioObjects[sound.counter];

			audioObject.pause();
		}		
	},

	fadeVolume: function(soundName, newVolume, speed){
		var sound = sounds.loaded[soundName];
		if(sound && sound.audioObjects && sound.audioObjects.length>0){
			if(!sound.counter || sound.counter>= sound.audioObjects.length){
				sound.counter = 0;
			}
			var audioObject = sound.audioObjects[sound.counter];
			sound.counter ++;

			$(audioObject).animate({volume: newVolume}, speed);
		}
	},

	stopAll: function(){
		for(var soundName in sounds.loaded){
			sounds.stop(soundName);
		}
	},

	toggleMute: function(){
		var muteButton = $("#mute-button");
		if(sounds.mute == false){
			for(var soundName in sounds.loaded){
				sounds.fadeVolume(soundName, 0, 500);
			}
			muteButton.addClass('muted');
			sounds.mute = true;
		}
		else if(sounds.mute == true){
			for(var soundName in sounds.loaded){
				sounds.fadeVolume(soundName, 1, 300);
			}
			muteButton.removeClass('muted');
			sounds.mute = false;
		}
	}

};