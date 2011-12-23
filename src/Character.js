/* Attribute block to handle the statistics of a character
 * 
 */
function Attribute(nameString,val) {
	this.nameString = nameString;
	this.value = val;
}

function Character() {
	this.Age = 18;
	this.history = new Array();
	this.skills = new Object();
	this.possessions = new Object();
}

Character.prototype.SetAttribute = function( nameString, val) {
	this[nameString] = new Attribute( nameString, val);
};

Character.prototype.DetermineThreshold = function( modifier) {
	if( modifier != null) {
		var result = modifier.minValue;
		
		if( modifier.DM != null) {
			var counter = 0;
			while( counter < modifier.DM.length) {
				var dM = modifier.DM[counter++];
				result -= (this[dM.attribute].value >= dM.minValue) ? dM.bonus : 0;
			}
		}
		
		return result;
	}
	
	return "-";
};

Character.prototype.AddHistory = function( when, what) {
	var event = new Object();
	event["When"] = when;
	event["What"] = what;
	this.history.push( event);
};

Character.prototype.AddSkill = function(skill) {
	var oldSkill = this.skills[ skill["nameString"]];
	if( oldSkill == null)
		this.skills[ skill["nameString"]] = skill;
	else
		skill = oldSkill;
	
	skill.Learn( this);
	this.AddHistory( "Aged " + this.Age, skill["nameString"] + " learned to " + skill.level);
};

Character.prototype.AddPossession = function( item) {
	var oldItem = this.possessions[ item["nameString"]];
	if( oldItem == null)
		this.possessions[ item["nameString"]] = item;
	else {
		oldItem.quantity += item.quantity;
		if( oldItem["limit"] != null && oldItem["limit"] < oldItem.quantity)
			oldItem.quantity = oldItem["limit"];
	}

	this.AddHistory( "Aged " + this.Age, "Gained " + item["nameString"]);
};

Character.prototype.SaveObject = function() {
	// create the object's representation that will be saved
	// objects which are embedded vs. objects which are referenced must be decided here

	if( DOM_.userID != null) {
		if( this.owner == null)
			this.owner = DOM_.userID._id.$oid;
		
		if( this.owner == DOM_.userID._id.$oid)
			return this;	// for the nonce, all objects are embedded
	}

	return null;
}

LoadCharacter = function( doc) {
	// load a document to a character object
	var result = new Character();
	
	// transfer the data
	var x;
	for( x in doc) {
		var val = doc[x];
		result[ x] = x=="_id"?val["$oid"]:val;
	}
	
	return result;
}

Character.prototype.Save = function() {
	var obj = this.SaveObject();
	if( obj == null)
		return;
	
	// ensure the collection exists
	var col = new MongoHQCollection( "characters", DOM_.db, true);

	var char = this;
	if( this._id == null)
		var doc = new MongoHQDocument( col, obj, function( doc) {
			// doc is the new character document
			char._id = doc._id;
		});
	else
		// update the existing document
		new MongoHQDocument( col, obj, null, this._id).update( new MongoHQRequest());
}