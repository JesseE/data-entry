var value = 0;
$('.nav__button').click(function(){
	switch (value) {
		case 0 :
			$('.nav--off-window').show();
			value = 1;
			console.log('show');
			break;
		case 1 :
			$('.nav--off-window').hide();
			value = 0;
			console.log('hide');
			break;
	}
});

