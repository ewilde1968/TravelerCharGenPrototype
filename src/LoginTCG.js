function LoginTCG( uid) {
	this.uid = uid;
	DOM_.activeTCG = this;
	this.ChangeState( "LoggedOut", uid);
}

LoginTCG.prototype.ChangeState = function( newState, context) {
	this.state = newState;
	this.context = context;
	
	switch( newState) {
	case "LoggedOut":
		DOM_.activeTCG["error message"] = null;
		break;
	case "LoggedIn":
		DOM_.activeTCG["error message"] = null;
		DOM_.userID = context;
		DOM_.activeTCG = (DOM_.storedTCG != null) ? DOM_.storedTCG : new TravelerCharGen();
		break;
	case "InvalidPassword":
		DOM_.activeTCG["error message"] = "invalid password";
		break;
	case "InvalidUsername":
		DOM_.activeTCG["error message"] = "invalid username";
		break;
	case "ForgotPW":
	case "Register":
		DOM_.activeTCG["error message"] = null;
		break;
	}
	
	DOM_.activeTCG.RefreshScreen( true);
};

LoginTCG.prototype.RefreshScreen = function( restore) {
	DOM_.body.empty();

	switch( this.state) {
	case "LoggedOut":
	case "InvalidPassword":
	case "InvalidUsername":
		DOM_.body.append( new LoginCanvas( this.context));
		break;
	case "ForgotPW":
	case "Register":
		DOM_.body.append( new RegisterAccountCanvas( this.context));
		break;
	}
};

LoginTCG.prototype.TryToLogin = function( username, password) {
	// check against database of usernames
	var collection = DOM_.db.getCollection( "users");
	var request = new MongoHQRequest( function( response, status, xhr) {
		// a zero array response means an invalid username
		// a mismatched password means an invalid password
		if( response.length == 0) {
			this.ChangeState("InvalidUsername", this.uid);
		} else {
			var result = response[0];
			if( password == result.password) {
				this.uid = response[0];
				this.ChangeState("LoggedIn", this.uid);
			} else
				this.ChangeState("InvalidPassword", this.uid);
		}
	}, this);

	this.uid = new Account( username);
	var foundUID = collection.find( request, this.uid);
}

LoginTCG.prototype.TryToRegister = function( username, password) {
	// check against database of usernames
	var collection = DOM_.db.getCollection( "users");
	var request = new MongoHQRequest( function( response, status, xhr) {
		// a zero array response means an invalid username
		// a mismatched password means an invalid password
		if( response.length == 0) {
			var callback = function( doc) {
				// account created successfully
				var tcg = DOM_.activeTCG;
				tcg.ChangeState( "LoggedIn", doc.value);
			};
			this.uid.password = password;
			var createUID = new MongoHQDocument( collection, this.uid, callback);
		} else {
			// account already exists
			this["error message"] = "username already exists";
			this.RefreshScreen();
		}
	}, this);

	this.uid = new Account( username);
	var foundUID = collection.find( request, this.uid);
}
