function LoginTCG( uid) {
	if( uid == null) {
		uid = new Object();
		uid["Username"] = "";
		uid["Password"] = "";
	}

	this.uid = uid;
	this.ChangeState( "LoggedOut", uid);
}

LoginTCG.prototype.ChangeState = function( newState, context) {
	this.state = newState;
	this.context = context;
	
	switch( newState) {
	case "LoggedOut":
		DOM_.body.empty();
		DOM_.body.append( new LoginCanvas( context));
		break;
	case "LoggedIn":
		DOM_.userID = context;
		DOM_.activeTCG = (DOM_.storedTCG != null) ? DOM_.storedTCG : new TravelerCharGen();
		DOM_.activeTCG.RefreshScreen( true);
		break;
	case "ForgotPW":
	case "Register":
		break;
	}
};

LoginTCG.prototype.RefreshScreen = function() {
	this.ChangeState( this.state, this.context);
};

LoginTCG.prototype.TryToLogin = function( username, password) {
	// TODO, check against database of usernames
	this.uid["Username"] = username;
	this.uid["Password"] = password;
	
	this.ChangeState("LoggedIn", this.uid);
	
	return true;
};
