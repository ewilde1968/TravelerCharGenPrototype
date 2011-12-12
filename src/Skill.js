SKILLS = {
          "Gambling":{ "nameString":"Gambling", "type":"basic"},
          "Brawling":{ "nameString":"Brawling", "type":"basic"},
          "Bribery":{ "nameString":"Bribery", "type":"basic"},
          "Ship's Boat":{ "nameString":"Ship's Boat", "type":"basic"},
          "Vaccuum Suit":{ "nameString":"Vaccuum Suit", "type":"basic"},
          "Forward Observer":{ "nameString":"Forward Observer", "type":"basic"},
          "Gunnery":{ "nameString":"Gunnery", "type":"basic"},
          "Air/Raft":{ "nameString":"Air/Raft", "type":"basic"},
          "Mechanical":{ "nameString":"Mechanical", "type":"basic"},
          "Navigation":{ "nameString":"Navigation", "type":"basic"},
          "Electronics":{ "nameString":"Electronics", "type":"basic"},
          "Jack of All Trades":{ "nameString":"Jack of All Trades", "type":"basic"},
          "Steward":{ "nameString":"Steward", "type":"basic"},
          "Engineering":{ "nameString":"Engineering", "type":"basic"},
          "Tactics":{ "nameString":"Tactics", "type":"basic"},
          "Medical":{ "nameString":"Medical", "type":"basic"},
          "Streetwise":{ "nameString":"Streetwise", "type":"basic"},
          "Forgery":{ "nameString":"Forgery", "type":"basic"},
          "Computer":{ "nameString":"Computer", "type":"basic"},
          "Pilot":{ "nameString":"Pilot", "type":"basic"},
          "Admin":{ "nameString":"Admin", "type":"basic"},
          "Leader":{ "nameString":"Leader", "type":"basic"},
          "Blade Combat":{ "nameString":"Blade Combat", "type":"generic", "subtype":"blade"},
          "Gun Combat":{ "nameString":"Gun Combat", "type":"generic", "subtype":"gun"},
          "Vehicle":{ "nameString":"Vehicle", "type":"generic", "subtype":"vehicle"},
          "Dagger":{ "nameString":"Dagger", "type":"blade"},
          "Blade":{ "nameString":"Blade", "type":"blade"},
          "Foil":{ "nameString":"Foil", "type":"blade"},
          "Sword":{ "nameString":"Sword", "type":"blade"},
          "Cutlass":{ "nameString":"Cutlass", "type":"blade"},
          "Broadsword":{ "nameString":"Broadsword", "type":"blade"},
          "Bayonet":{ "nameString":"Bayonet", "type":"blade"},
          "Spear":{ "nameString":"Spear", "type":"blade"},
          "Halberd":{ "nameString":"Halberd", "type":"blade"},
          "Pike":{ "nameString":"Pike", "type":"blade"},
          "Cudgel":{ "nameString":"Cudgel", "type":"blade"},
          "Body Pistol":{ "nameString":"Body Pistol", "type":"gun"},
          "Auto Pistol":{ "nameString":"Auto Pistol", "type":"gun"},
          "Revolver":{ "nameString":"Revolver", "type":"gun"},
          "Carbine":{ "nameString":"Carbine", "type":"gun"},
          "Rifle":{ "nameString":"Rifle", "type":"gun"},
          "Auto Rifle":{ "nameString":"Auto Rifle", "type":"gun"},
          "Shotgun":{ "nameString":"Shotgun", "type":"gun"},
          "SMG":{ "nameString":"SMG", "type":"gun"},
          "Laser Carbine":{ "nameString":"Laser Carbine", "type":"gun"},
          "Laser Rifle":{ "nameString":"Laser Rifle", "type":"gun"},
          "Ground Car":{ "nameString":"Ground Car", "type":"vehicle"},
          "Watercraft":{ "nameString":"Watercraft", "type":"vehicle"},
          "Winged Craft":{ "nameString":"Winged Craft", "type":"vehicle"},
          "Hovercraft":{ "nameString":"Hovercraft", "type":"vehicle"},
          "Grav Belt":{ "nameString":"Grav Belt", "type":"vehicle"}
};

//nm must be a name
function Skill( nm) {
	var temp = SKILLS[nm];
	var x;
	for( x in temp) {
		var val = temp[x];
		this[ x] = val;
	}
	
	this.level = 0;
}

Skill.prototype.Learn = function( character) {
	this.level++;
};

