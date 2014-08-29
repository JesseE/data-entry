var value = 0;
$('.nav').click(function(){
	switch (value) {
		case 0 :
			$('.nav--off-window').show();
			$('header, section, footer').addClass('menu-active');
			value = 1;
			console.log('show');
			break;
		case 1 :
			$('.nav--off-window').hide();
			$('header, section, footer').removeClass('menu-active');
			value = 0;
			console.log('hide');
			break;
	}
});
var mode = 2;
$('.block-item').click(function(){	
	var id = $(this).attr('id');
	
	console.log(id + '  the value = '+ mode);
	
	switch (mode) {
		case 2:	
			$('.block-item').hide();
			$(this).show();
			console.log('vanish');
			mode = 3;
		break;
		case 3:
		$('.block-item').show();
			console.log('appear');
			mode = 2;
		break;
	}
});
var postid = [];
var posts = [
		post = {
			name:'Datavisualisation',
			paragraph: 'bitches bitch like to bitch about those bitches',
			images:'bitches bitch'
		},
		post = {
			name:'Resizer',
			paragraph: 'bitches bitch like to bitch about those bitches',
			images:'bitches bitch'
		},
		post = {
			name:'Melkweg',
			paragraph: 'bitches bitch like to bitch about those bitches',
			images:'bitches bitch'
		},
		post = {
			name:'Score app',
			paragraph: 'bitches bitch like to bitch about those bitches',
			images:'bitches bitch'
		},
		post = {
			name:'Eikema reintegratie',
			paragraph: 'bitches bitch like to bitch about those bitches',
			images:'bitches bitch'
		}
	];

	for (var i = 0, len = posts.length; i < len; i++) {
		posts[i];
		console.log(post[i]);
		postid.push(posts[i]);
		console.log(posts[1].name);
	}; 