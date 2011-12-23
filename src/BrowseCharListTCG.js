function BrowseCharListTCG( uid) {
	DOM_.activeTCG = this;
	this.ChangeState( "Default", uid);
}

BrowseCharListTCG.prototype.ChangeState = function( newState, context) {
	this.state = newState;
	this.context = context;
	
	switch( newState) {
	default:
		break;
	}
	
	DOM_.activeTCG.RefreshScreen( true);
};

BrowseCharListTCG.prototype.RefreshScreen = function( restore) {
	DOM_.body.empty();

	switch( this.state) {
	default:
		DOM_.body.append( new WelcomeCanvas( this))
				 .append( new BrowseCharListCanvas( this.context));
		break;
	}
};
