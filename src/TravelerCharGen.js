/*******************************************************************
 * Entry point to the character generation wizard.
 * 
 * Assumptions: Player must be logged in to reach this step.
 * 
 * Input: The unique identifier for the character. If the character
 * 		is complete its "State" field is set to EditCharacter. Otherwise
 * 		the character is still being generated. If no "State" field
 * 		exists then it is a brand new character.
 * 
 * @returns {TravelerCharGen}
 */
function TravelerCharGen( uid) {
	// Create the basic character
	this.character = new Character( uid);
	
	if( this.character["State"] == null || this.character["State"] == "ChooseService") {
		this.selectedService = null;
		this.createActionCanvas = ChooseServiceCanvas_Create;
		this.ChangeState("ChooseService", "DoNotRefresh");
	} else {
		this.selectedService = FindServiceByName( character["Service"]);
		this.createActionCanvas = null;
		this.ChangeState( (character.Age == "Deceased") ? "Dead" : "EditCharacter");
	}
}

TravelerCharGen.prototype.ChangeState = function( newState, data) {
	this.state = newState;
	this.stateContext = data;

	switch( newState) {
	case "ChooseService":
		// need to create the root canvas first to generate character stats
		var rootCanvas = new RootCanvas( this, "canvasRoot");

		DOM_.body.empty();
		DOM_.body.append( new ChooseServiceCanvas( this))
				 .append( rootCanvas)
				 .append( new HistoryCanvas( this))
				 .append( new RerollCanvas( this));
		break;
	case "ServiceSelected":
		var service = new Service( data);
		this.selectedService = service.Enlist( this.character);

		// add term to character
		var enlistmentResult = this.selectedService.AddTerm( this.character);
		if( enlistmentResult != "Dead")
			this.createActionCanvas = AddTermCanvas_Create;
		else
			this.ChangeState( "Dead");
		break;
	case "SpecifyGenericSkill":
		// always coming from AddTerm screen
		this.createActionCanvas = SpecifyGenericSkillCanvas_Create;
		break;
	case "SkillSelected":
		this.character[ "SkillsToChoose"]--;
		if( this.character["SkillsToChoose"] > 0)
			this.createActionCanvas = AddTermCanvas_Create;
		else {
			// characters must retire after 7 terms
			if( this.character.Age < (18 + 7*4))
				this.createActionCanvas = EndTermCanvas_Create;
			else {
				this.character.AddHistory( "Aged " + this.character.Age, "Forced to retire.")
				this.ChangeState( "MusterOut")
			}
		}
		break;
	case "Reenlisted":
		// add term to character
		var enlistmentResult = this.selectedService.AddTerm( this.character);
		if( enlistmentResult != "Dead")
			this.createActionCanvas = AddTermCanvas_Create;
		break;
	case "MusterOut":
		// Max of three cash choices
		if( this.character["CashChoices"] == null)
			this.character["CashChoices"] = 3;

		this.createActionCanvas = MusterOutCanvas_Create;
		break;
	case "MusterOutSelected":
		this.character[ "Muster Out Benefits"]--;
		if( this.character[ "Muster Out Benefits"] > 0)
			this.createActionCanvas = MusterOutCanvas_Create;
		else {
			// remove temporary character fields used only for chargen
			this.character["CashChoices"] = null;
			this.character[ "Muster Out Benefits"] = null;
			this.character[ "SkillsToChoose"] = null;
			
			// add retirement pay
			if( this.character.Age == 38)
				this.character["Retirement Pay"] = 4000;	// 5 terms
			else if( this.character.Age == 42)
				this.character["Retirement Pay"] = 6000;	// 6 terms
			else if( this.character.Age == 46)
				this.character["Retirement Pay"] = 8000;	// 7 terms
			else if( this.character.Age >= 50)
				this.character["Retirement Pay"] = 10000;	// 8 or more terms

			// move to character complete and edit state
			this.createActionCanvas = null;
			this.ChangeState( "EditCharacter")
		}
		break;
	case "SpecifyGenericItem":
		this.createActionCanvas = SpecifyGenericItemCanvas_Create;
		break;
	case "Dead":
		this.character.Age = "Deceased";
		// fall through
	case "EditCharacter":
		// empty out the current contents
		this.createActionCanvas = null;

		var editCanvas = $('<div />').attr('id','editCanvas');
		var detailsB = $('<button >').attr('id',"detailsB").attr('type','button')
									 .click( function() {
										 // handle click
										 DOM_.activeTCG.ChangeState("DetailsPopup");
									 });

		editCanvas.append(new NameCanvas(this))
				  .append( new RootCanvas(this,"canvasStats"))
				  .append( new PortraitCanvas(this))
				  .append(detailsB);
		
		DOM_.body.empty();
		DOM_.body.append( editCanvas);
		
		// Don't refresh screen as elements just created
		this.stateContext = "DoNotRefresh";
		break;
	case "DetailsPopup":
		DOM_.body.empty();
		DOM_.body.append( new PopupCanvas( DOM_.activeTCG));
		break;
	}

	// Don't refresh screen when elements just created
	if( this.stateContext == "DoNotRefresh")
		this.stateContext = null;
	else
		this.RefreshScreen();
};

TravelerCharGen.prototype.RefreshScreen = function() {
	var createActionC = function(f,t,c) {
		return (f!=null) ? f(t,c) : null;
	};
	
	switch( this.state) {
	case "ChooseService":
	case "ServiceSelected":
	case "SpecifyGenericSkill":
	case "SkillSelected":
	case "Reenlisted":
	case "MusterOut":
	case "MusterOutSelected":
	case "SpecifyGenericItem":
		$('#actionCanvas').replaceWith( createActionC( this.createActionCanvas, this, this.stateContext));
		$('#canvasRoot').replaceWith( new RootCanvas( this, "canvasRoot"));
		$('#historyCanvas').replaceWith( new HistoryCanvas(this));
		break;
	case "Dead":
	case "EditCharacter":
		$('#canvasName').replaceWith( new NameCanvas(this));
		$('#canvasStats').replaceWith( new RootCanvas( this, "canvasStats"));
		break;
	}
};

TravelerCharGen.prototype.AddYears = function( years) {
	// assume years is <= 4;
	if( years > 4 || years < 0)
		throw( "Invalid number of years added.");

	this.character.Age += years;
	
	var ReduceState = function(c,s,n) {
		c[s].value -= n;
		c.AddHistory( "Aged " + c.Age, s + " reduced by " + n + " due to age.")

		if( c[s].value == 0) {
			// aging crisis
			c.AddHistory( "Aged " + c.Age, "Aging crisis from zero " + s)

			if( new Roll("2d6").value < 8) {
				this.ChangeState( "Dead");
				c.AddHistory( "Aged " + c.Age, "Died of old age.")
			} else
				c[s].value = 1;
		}
	};

	if((this.character.Age % 4) == 2) {
		// every four years check for aging
		if( this.character.Age >= 34 && this.character.Age <= 46) {
			if( new Roll("2d6").value < 8)
				ReduceState( this.character, "Strength", 1);
			if( new Roll("2d6").value < 7)
				ReduceState( this.character, "Dexterity", 1);
			if( new Roll("2d6").value < 8)
				ReduceState( this.character, "Endurance", 1);
		} else if( this.character.Age >= 50 && this.character.Age <= 62) {
			if( new Roll("2d6").value < 9)
				ReduceState( this.character, "Strength", 1);
			if( new Roll("2d6").value < 8)
				ReduceState( this.character, "Dexterity", 1);
			if( new Roll("2d6").value < 9)
				ReduceState( this.character, "Endurance", 1);
		} else if( this.character.Age >= 66) {
			if( new Roll("2d6").value < 9)
				ReduceState( this.character, "Strength", 2);
			if( new Roll("2d6").value < 9)
				ReduceState( this.character, "Dexterity", 2);
			if( new Roll("2d6").value < 9)
				ReduceState( this.character, "Endurance", 2);
			if( new Roll("2d6").value < 9)
				ReduceState( this.character, "Intelligence", 1);
		}
	}
};
