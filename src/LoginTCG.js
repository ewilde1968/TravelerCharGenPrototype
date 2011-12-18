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
		DOM_.activeTCG = new TravelerCharGen();
		break;
	case "ForgotPW":
	case "Register":
		break;
	}
};

LoginTCG.prototype.TryToLogin = function( username, password) {
	// TODO, check against database of usernames
	this.uid["Username"] = username;
	this.uid["Password"] = password;
	
	this.ChangeState("LoggedIn", this.uid);
	
	return true;
};
