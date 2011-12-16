/**
 * A map of names to jQuery elements which compose the app.
 * @type {Object.<string, jQuery>}
 * @private
 */
var DOM_ = {
  body: null,
  activeTCG: null
};

function TravelerCharGen() {
	// Create the basic character
	this.character = new Character();
	this.selectedService = null;
	this.createActionCanvas = ChooseServiceCanvas_Create;
	this.state = "ChooseService";
	this.stateContext = null;
	
	// need to create the root canvas first to generate character stats
	var rootCanvas = new RootCanvas( this, "canvasRoot");

	DOM_.body = $('body').append( new ChooseServiceCanvas( this))
						 .append( rootCanvas)
						 .append( new HistoryCanvas( this));
	
	var rerollB = $('<button />').attr('id','rerollB').attr('type','button')
								 .click( function() {
									 DOM_.body.empty();
									 DOM_.activeTCG = new TravelerCharGen();
								 });
	var rerollP = $('<p />').attr('id','rerollP').text("Reroll");
	DOM_.body.append( rerollP).append(rerollB);
}

TravelerCharGen.prototype.ChangeState = function( newState, data) {
	this.state = newState;
	switch( newState) {
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
		this.stateContext = data;
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
		this.stateContext = data;
		break;
	case "Dead":
		this.createActionCanvas = null;
		this.character.Age = "Deceased";
		// fall through
	case "EditCharacter":
		// empty out the current contents
		DOM_.body.empty();
		
		var historyB = $('<button >').attr('id',"historyB").attr('type','button')
									 .click( function() {
										 DOM_.body.append( new PopupCanvas(DOM_.activeTCG,"History"));
									 });

		var skillsB = $('<button >').attr('id',"skillsB").attr('type','button')
									.click( function() {
										 DOM_.body.append( new PopupCanvas(DOM_.activeTCG,"Skills"));
									});

		var possessionsB = $('<button >').attr('id',"possessionsB").attr('type','button')
										 .click( function() {
											 DOM_.body.append( new PopupCanvas(DOM_.activeTCG,"Possessions"));
										 });
		
		var descriptionB = $('<button >').attr('id',"descriptionB").attr('type','button')
										 .click( function() {
											 DOM_.body.append( new PopupCanvas(DOM_.activeTCG,"Description"));
										 });

		DOM_.body.append(new NameCanvas(this))
				 .append( new RootCanvas(this,"canvasStats"))
				 .append( new PortraitCanvas(this));
		DOM_.body.append(historyB).append(skillsB).append(possessionsB).append(descriptionB);
		break;
	}

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
