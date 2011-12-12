PHYSICALITEMS = {
          "Low Passage":{ "nameString":"Low Passage", "type":"basic"},
          "High Passage":{ "nameString":"High Passage", "type":"basic"},
          "Traveler's Aid Society":{ "nameString":"Traveler's Aid Society", "type":"basic", "limit":1},
          "Blade Combat":{ "nameString":"Blade Combat", "type":"generic", "subtype":"blade"},
          "Credits":{ "nameString":"Credits", "type":"basic"},
          "Gun Combat":{ "nameString":"Gun Combat", "type":"generic","subtype":"gun"},
          "Middle Passage":{ "nameString":"Middle Passage", "type":"basic"},
          "Scout Ship":{ "nameString":"Scout Ship", "type":"starship"},
          "Free Trader":{ "nameString":"Free Trader", "type":"starship"},
          "Dagger":{ "nameString":"Dagger", "type":"blade","PlusDM":8,"MinusDM":3,"Wounds":"2d6"},
          "Blade":{ "nameString":"Blade", "type":"blade","PlusDM":9,"MinusDM":4,"Wounds":"2d6"},
          "Foil":{ "nameString":"Foil", "type":"blade","PlusDM":10,"MinusDM":4,"Wounds":"1d6"},
          "Sworld":{ "nameString":"Sword", "type":"blade","PlusDM":10,"MinusDM":5,"Wounds":"2d6"},
          "Cutlass":{ "nameString":"Cutlass", "type":"blade","PlusDM":11,"MinusDM":7,"Wounds":"3d6"},
          "Broadsword":{ "nameString":"Broadsword", "type":"blade","PlusDM":12,"MinusDM":7,"Wounds":"4d6"},
          "Bayonet":{ "nameString":"Bayonet", "type":"blade","PlusDM":9,"MinusDM":4,"Wounds":"3d6"},
          "Spear":{ "nameString":"Spear", "type":"blade","PlusDM":9,"MinusDM":4,"Wounds":"2d6"},
          "Halberd":{ "nameString":"Halberd", "type":"blade","PlusDM":10,"MinusDM":5,"Wounds":"3d6"},
          "Pike":{ "nameString":"Pike", "type":"blade","PlusDM":10,"MinusDM":6,"Wounds":"3d6"},
          "Cudgel":{ "nameString":"Cudgel", "type":"blade","PlusDM":8,"MinusDM":5,"Wounds":"2d6"},
          "Body Pistol":{ "nameString":"Body Pistol", "type":"gun","PlusDM":11,"MinusDM":7,"Wounds":"2d6"},
          "Auto Pistol":{ "nameString":"Auto Pistol", "type":"gun","PlusDM":10,"MinusDM":6,"Wounds":"3d6"},
          "Revolver":{ "nameString":"Revolver", "type":"gun","PlusDM":9,"MinusDM":6,"Wounds":"3d6"},
          "Carbine":{ "nameString":"Carbine", "type":"gun","PlusDM":9,"MinusDM":4,"Wounds":"3d6"},
          "Rifle":{ "nameString":"Rifle", "type":"gun","PlusDM":8,"MinusDM":5,"Wounds":"3d6"},
          "Auto Rifle":{ "nameString":"Auto Rifle", "type":"gun","PlusDM":10,"MinusDM":6,"Wounds":"3d6"},
          "Shotgun":{ "nameString":"Shotgun", "type":"gun","PlusDM":9,"MinusDM":3,"Wounds":"4d6"},
          "SMG":{ "nameString":"SMG", "type":"gun","PlusDM":9,"MinusDM":6,"Wounds":"3d6"},
          "Laser Carbine":{ "nameString":"Laser Carbine", "type":"gun","PlusDM":10,"MinusDM":5,"Wounds":"4d6"},
          "Laser Rifle":{ "nameString":"Laser Rifle", "type":"gun","PlusDM":11,"MinusDM":6,"Wounds":"5d6"}
};

//nm must be a name
function PhysicalItem( nm, quantity) {
	var temp = PHYSICALITEMS[nm];
	var x;
	for( x in temp) {
		var val = temp[x];
		this[ x] = val;
	}
	
	this.quantity = (quantity == null) ? 1 : quantity;
	if( this["limit"])
		this.quantity = (this.quantity < this["limit"]) ? this.quantity : this["limit"];
}
