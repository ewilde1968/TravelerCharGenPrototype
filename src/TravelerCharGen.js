/**
 * A map of names to jQuery elements which compose the app.
 * @type {Object.<string, jQuery>}
 * @private
 */
var DOM_ = {
  body: null,
  activeTCG: null,
  canvasRoot: null,
  canvasAction: null,
  canvasHistory: null,
};

function TravelerCharGen() {
	// Create the basic character
	this.character = new Character();
	this.selectedService = null;
	DOM_.activeTCG = this;

	// create the root canvas
	DOM_.canvasRoot = new RootCanvas( this.character);

	// create the first action canvas
	DOM_.canvasAction = new ChooseServiceCanvas( this);
	
	// create the history canvas
	DOM_.canvasHistory = new HistoryCanvas( this);

	DOM_.body = $('body')
		.append( DOM_.canvasAction)
		.append( DOM_.canvasHistory)
		.append( DOM_.canvasRoot);
}

TravelerCharGen.prototype.ChangeState = function( newState, data) {
	switch( newState) {
	case "ServiceSelected":
		var service = new Service( data);
		this.selectedService = service.Enlist( this.character);

		// add term to character
		var enlistmentResult = this.selectedService.AddTerm( this.character);
		if( enlistmentResult != "Dead")
			$('#actionCanvas').replaceWith( new AddTermCanvas( this));
		break;
	case "Dead":
		$('#actionCanvas').replaceWith( null);
		break;
	case "SpecifyGenericSkill":
		// always coming from AddTerm screen
		$('#actionCanvas').replaceWith( new SpecifyGenericSkillCanvas( this, data));
		break;
	case "SkillSelected":
		this.character[ "SkillsToChoose"]--;
		if( this.character["SkillsToChoose"] > 0)
			$('#actionCanvas').replaceWith( new AddTermCanvas( this));
		else {
			// characters must retire after 7 terms
			if( this.character.age < (18 + 7*4))
				$('#actionCanvas').replaceWith( new EndTermCanvas( this));
			else {
				this.character.AddHistory( "Aged " + this.character.age, "Forced to retire.")
				this.ChangeState( "MusterOut")
			}
		}
		break;
	case "Reenlisted":
		// add term to character
		var enlistmentResult = this.selectedService.AddTerm( this.character);
		if( enlistmentResult != "Dead")
			$('#actionCanvas').replaceWith( new AddTermCanvas( this));
		break;
	case "MusterOut":
		// Max of three cash choices
		if( this.character["CashChoices"] == null)
			this.character["CashChoices"] = 3;
		
		$('#actionCanvas').replaceWith( new MusterOutCanvas( this));
		break;
	case "MusterOutSelected":
		this.character[ "Muster Out Benefits"]--;
		if( this.character[ "Muster Out Benefits"] > 0)
			$('#actionCanvas').replaceWith( new MusterOutCanvas( this));
		else {
			$('#actionCanvas').replaceWith( null);

			// remove temporary character fields used only for chargen
			this.character["CashChoices"] = null;
			this.character[ "Muster Out Benefits"] = null;
			this.character[ "SkillsToChoose"] = null;
			
			// add retirement pay
			if( this.character.age == 38)
				this.character["Retirement Pay"] = 4000;	// 5 terms
			else if( this.character.age == 42)
				this.character["Retirement Pay"] = 6000;	// 6 terms
			else if( this.character.age == 46)
				this.character["Retirement Pay"] = 8000;	// 7 terms
			else if( this.character.age >= 50)
				this.character["Retirement Pay"] = 10000;	// 8 or more terms
		}
		break;
	case "SpecifyGenericItem":
		$('#actionCanvas').replaceWith( new SpecifyGenericItemCanvas( this, data));
		break;
	}
	
	$('#canvasRoot').replaceWith( new RootCanvas( this.character));
	$('#historyCanvas').replaceWith( new HistoryCanvas(this));
};

TravelerCharGen.prototype.AddYears = function( years) {
	// assume years is <= 4;
	if( years > 4 || years < 0)
		throw( "Invalid number of years added.");

	this.character.age += years;
	
	var ReduceState = function(c,s,n) {
		c[s].value -= n;
		c.AddHistory( "Aged " + c.age, s + " reduced by " + n + " due to age.")

		if( c[s].value == 0) {
			// aging crisis
			c.AddHistory( "Aged " + c.age, "Aging crisis from zero " + s)

			if( new Roll("2d6").value < 8) {
				this.ChangeState( "Dead");
				c.AddHistory( "Aged " + c.age, "Died of old age.")
			} else
				c[s].value = 1;
		}
	};

	if((this.character.age % 4) == 2) {
		// every four years check for aging
		if( this.character.age >= 34 && this.character.age <= 46) {
			if( new Roll("2d6").value < 8)
				ReduceState( this.character, "Strength", 1);
			if( new Roll("2d6").value < 7)
				ReduceState( this.character, "Dexterity", 1);
			if( new Roll("2d6").value < 8)
				ReduceState( this.character, "Endurance", 1);
		} else if( this.character.age >= 50 && this.character.age <= 62) {
			if( new Roll("2d6").value < 9)
				ReduceState( this.character, "Strength", 1);
			if( new Roll("2d6").value < 8)
				ReduceState( this.character, "Dexterity", 1);
			if( new Roll("2d6").value < 9)
				ReduceState( this.character, "Endurance", 1);
		} else if( this.character.age >= 66) {
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
