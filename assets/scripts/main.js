var value = 0;
$('.nav__button').click(function(){
	switch (value) {
		case 0 :
			$('.nav__list').show();
			value = 1;
			console.log('show');
			break;
		case 1 :
			$('.nav__list').hide();
			value = 0;
			console.log('hide');
			break;
	}
});

