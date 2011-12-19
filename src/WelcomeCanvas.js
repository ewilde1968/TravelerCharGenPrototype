function WelcomeCanvas( tcg) {
	var onLoginActionClick = function() {
		var data = $(this).html();
		switch( data) {
		case "login":
			DOM_.storedTCG = DOM_.activeTCG;
			DOM_.activeTCG = new LoginTCG( DOM_.userID);
			break;
		case "logout":
			DOM_.userID = null;
			DOM_.activeTCG.RefreshScreen();
			break;
		}
	};

	var p = $('<p />').attr('id','welcomeP');
	var b = $('<button />').attr('id','loginWelcomeB')
						   .click( onLoginActionClick);
	var div = $('<div />').attr('id',"welcomeCanvas")
						  .append( p)
						  .append( b);
	
	if( DOM_.userID != null && DOM_.userID["Username"] != null) {
			p.html( "welcome " + DOM_.userID["Username"]);
			b.html( "logout");
	} else {
		p.html( "");
		b.html( "login");
	}
	
	return div;
}