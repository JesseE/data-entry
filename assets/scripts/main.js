var value = 0;
$('.nav__button').click(function(){
	switch (value) {
		case 0 :
			$('.nav--off-window').show();
			$('header').addClass('menu-active');
			$('section').addClass('menu-active');
			value = 1;
			console.log('show');
			break;
		case 1 :
			$('.nav--off-window').hide();
			$('header').removeClass('menu-active');
			$('section').removeClass('menu-active');
			value = 0;
			console.log('hide');
			break;
	}
});

