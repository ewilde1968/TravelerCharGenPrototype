function RootCanvas( character) {
	// create the root canvas
	var canvas = $('<div />').attr('id', 'canvasRoot');

	// create the basic attributes for a character
	var statsA = [ "Strength", "Dexterity", "Endurance", "Intelligence", "Education", "Social Standing"];
	for(counter=0;counter<statsA.length;counter++) {
		var attrName = statsA[counter];
		if( character[ attrName] == null)
			character.SetAttribute( attrName, new Roll( "2d6").value);

		var span = $('<span />').text( character[attrName].value);
		var idStr = attrName;
		var para = $('<p />').attr('id', idStr.replace( " ","_"))
			.text( character[attrName].nameString + " ")
			.append( span);
		canvas.append( para);
	}

	return canvas;
}
