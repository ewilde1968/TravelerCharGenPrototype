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
	case "InvalidPassword":
	case "InvalidUsername":
	case "ForgotPW":
	case "Register":
		break;
	}
};

LoginTCG.prototype.RefreshScreen = function() {
	this.ChangeState( this.state, this.context);
};

LoginTCG.prototype.TryToLogin = function( username, password) {
	this.uid["Username"] = username;
	this.uid["Password"] = password;

	// check against database of usernames
	var collection = DOM_.db.getCollection( "users");
	var request = new MongoHQRequest( function( response, status, xhr) {
		// a zero array response means an invalid username
		// a mismatched password means an invalid password
		if( response.length == 0) {
			this.ChangeState("InvalidUsername", this.uid);
		} else {
			var result = response[0];
			if( password == result["Password"]) {
				this.uid.id = result._id.$oid;
				
				this.ChangeState("LoggedIn", this.uid);
			} else
				this.ChangeState("InvalidPassword", this.uid);
		}
	}, this);
	var foundUID = collection.find( request, '{"Username":"' + username +'"}');
};
