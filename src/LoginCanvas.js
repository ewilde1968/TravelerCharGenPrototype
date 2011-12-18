function LoginCanvas( lic) {
	var validateEmail = function() {
		var input = $('#emailI').val();
		var at = input.indexOf("@");
		var dot = input.indexOf(".",at);
		
		if( at < 0 || dot < 0) {
			// show error message
			
			return false;
		}
		
		return true;
	};
	
	var onLogin = function() {
		var username = $('#emailI').val();
		var password = $('#passwordI').val();

		if( validateEmail()) {
			var tcg = DOM_.activeTCG;
			tcg.TryToLogin( username, password);	// will change states appropriately
		}
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
									   // register workflow
								   });

	var prefillUsername = lic != null ? lic["Username"] : "";
	var emailForm = $('<form />').attr('id','emailForm')
							.append( $('<label />').attr('for','emailI').text('email address'))
							.append( $('<input />').attr('id','emailI')
												   .attr('type','text')
												   .change( validateEmail)
												   .val( prefillUsername));
	var passwForm = $('<form />').attr('id','passwForm')
							.append( $('<label />').attr('for','passwordI').text('password'))
							.append( $('<input />').attr('id','passwordI')
												   .attr('type','password'));

	var canvas = $('<div />').attr('id', 'loginCanvas')
							 .append( emailForm)
							 .append( passwForm)
							 .append( loginB)
							 .append( forgotPasswordB)
							 .append( registerB);

	return canvas;
}
