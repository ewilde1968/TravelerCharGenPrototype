function LoginCanvas( lic) {
	var validateEmail = function() {
		var input = $('#usernameTA').val();
		if( input != null && input.length > 2) {
			var at = input.indexOf("@");
			var dot = input.indexOf(".",at);
			
			if( at < 0 || dot < 0) {
				// show error message
				DOM_.activeTCG["error message"] = "invalid email address";
				return false;
			}
			
			return true;
		}
		
		DOM_.activeTCG["error message"] = "enter email address";
		return false;
	};
	
	var handleKeydown = function(event) {
		if( event.which == 13 || event.keyCode == 13) {
			event.stopPropagation();
			event.stopImmediatePropagation();
			onLogin();
		}
	};
	
	var onLogin = function() {
		var tcg = DOM_.activeTCG;
		var username = $('#usernameTA').val();
		if( validateEmail()) {
			tcg.TryToLogin( username, $('#passwordTA').val());
			return;
		}
		
		// failed to validate or login
		// reset the data appropriately and refresh the screen
		tcg.uid = new Account( username);
		tcg.ChangeState("InvalidUsername", tcg.uid);
	};
	
	var loginB = $('<button />').attr('id','loginB').attr('type','button')
								.text("login")
								.click( function() { onLogin();});
	var forgotPasswordB = $('<button />').attr('id','forgotPasswordB').attr('type','button')
										 .text("forgot password")
										 .click( function() {
											 // forgot workflow
										 });
	var registerB = $('<button />').attr('id','registerB').attr('type','button')
								   .text("register")
								   .click( function() {
										var tcg = DOM_.activeTCG;
										var username = $('#usernameTA').val();

										tcg.uid = new Account( validateEmail() ? username : "");
										tcg.ChangeState("Register", tcg.uid);
								   });

	var usernameP = $('<p />').attr('id','usernameP').text('email address');
	var prefillUsername = lic != null ? lic.username : "";
	var usernameTA = $('<textarea />').attr('id','usernameTA')
									  .change( validateEmail)
									  .keydown( handleKeydown)
									  .val( prefillUsername);
	var usernameDiv = $('<div />').attr('id','usernameDiv')
								  .append( usernameP)
								  .append( usernameTA);
	var passwordP = $('<p />').attr('id','passwordP').text('password');
	var passwordTA = $('<textarea />').attr('id','passwordTA')
									  .attr('type','password')
									  .keydown( handleKeydown);
	var passwordDiv = $('<div />').attr('id','passwordDiv')
								  .append( passwordP)
								  .append( passwordTA);

	var canvas = $('<div />').attr('id', 'loginCanvas')
							 .append( usernameDiv)
							 .append( passwordDiv)
							 .append( loginB)
							 .append( forgotPasswordB)
							 .append( registerB);

	var em = DOM_.activeTCG["error message"];
	if( em != null && em.length > 0)
		canvas.append( $('<p />').attr('id','loginErrorMsgP').text(em));
	
	return canvas;
}
