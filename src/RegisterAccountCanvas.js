function RegisterAccountCanvas( lic) {
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
			onCreate();
		}
	};
	
	var onCreate = function() {
		var tcg = DOM_.activeTCG;
		var username = $('#usernameTA').val();
		if( validateEmail()) {
			var password = $('#passwordTA').val();
			var confirm = $('#confirmPasswordTA').val()
			
			if( password == confirm) {
				tcg.TryToRegister( username, password)
				return;
			}

			tcg["error message"] = "password mismatch";
		} else
			tcg["error message"] = "invalid email address";
		
		// failed to validate or login
		// reset the data appropriately and refresh the screen
		tcg.uid["Username"] = username;
		tcg.uid["Password"] = "";
		tcg.RefreshScreen();
	};
	
	var createB = $('<button />').attr('id','createB').attr('type','button')
								 .text("create")
								 .click( function() { onCreate();});
	var cancelB = $('<button />').attr('id','cancelB').attr('type','button')
								 .text("cancel")
								 .click( function() {
									 DOM_.activeTCG.ChangeState("LoggedOut", DOM_.activeTCG.uid);
								 });

	var usernameP = $('<p />').attr('id','usernameP').text('email address');
	var prefillUsername = lic != null ? lic["Username"] : "";
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

	var confirmPasswordP = $('<p />').attr('id','confirmPasswordP').text('password');
	var confirmPasswordTA = $('<textarea />').attr('id','confirmPasswordTA')
											 .attr('type','confirm password')
											 .keydown( handleKeydown);
	var confirmPasswordDiv = $('<div />').attr('id','confirmPasswordDiv')
										 .append( confirmPasswordP)
										 .append( confirmPasswordTA);
	
	var canvas = $('<div />').attr('id', 'registerCanvas')
							 .append( usernameDiv)
							 .append( passwordDiv)
							 .append( confirmPasswordDiv)
							 .append( createB)
							 .append( cancelB);

	var em = DOM_.activeTCG["error message"];
	if( em != null && em.length > 0)
		canvas.append( $('<p />').attr('id','createErrorMsgP').text(em));
	
	return canvas;
}
