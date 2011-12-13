function CharAttribute( attrName, character) {
	idStr = attrName.replace(" ","_");
	var result = $('<form />').attr('id',idStr)
							  .append( $('<label />').attr('for',"_" + idStr).text(character[attrName].nameString + " "))
							  .append( $('<input />').attr('id', "_" + idStr).attr('type','text').val(character[attrName].value));
	
	return result;
}

CharAttribute.prototype.Changed = function() {
	
}

function RootCanvas( character, canvasName) {
	// create the root canvas
	var div = $('<div />').attr('id',canvasName);
	
	// create the basic attributes for a character
	var statsA = [ "Strength", "Dexterity", "Endurance", "Intelligence", "Education", "Social Standing"];
	for(counter=0;counter<statsA.length;counter++) {
		var attrName = statsA[counter];
		if( character[ attrName] == null)
			character.SetAttribute( attrName, new Roll( "2d6").value);

		div.append( new CharAttribute(attrName,character));
	}
	
	return div;
}
