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
	this.possessions = new Array();
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
