function RootCanvas( tcg, canvasName) {
	var handleChange = function() {
		var tcg = DOM_.activeTCG;
		var char = tcg.character;
		var attrName = this.id.substr(1).replace("_"," ");	// skip first _
				 
		char[attrName].value = parseInt( this.value);
		tcg.RefreshScreen();
	};
	var charAttribute = function(attrName,character) {
		idStr = attrName.replace(/ /g,"_");
		var result = $('<form />').attr('id',idStr)
								  .append( $('<label />').attr('for',"_" + idStr).text(character[attrName].nameString + " "))
								  .append( $('<input />').attr('id', "_" + idStr).attr('type','text').val(character[attrName].value)
										  				 .change( handleChange));
		
		return result;
	}
	
	var character = tcg.character;
	
	// create the root canvas
	var div = $('<div />').attr('id',canvasName);
	
	// create the basic attributes for a character
	var statsA = [ "Strength", "Dexterity", "Endurance", "Intelligence", "Education", "Social Standing"];
	for(counter=0;counter<statsA.length;counter++) {
		var attrName = statsA[counter];
		if( character[ attrName] == null)
			character.SetAttribute( attrName, new Roll( "2d6").value);

		div.append( charAttribute(attrName,character));
		
		if( canvasName == "canvasStats") {
			// add temporary values as well.
			var tempName = attrName + " Temporary";
			var idStr = tempName.replace(/ /g,"_");
			if( character[tempName] == null)
				character.SetAttribute( tempName, character[attrName].value);
			
			var tempForm = $('<form />').attr('id',idStr)
										.append( $('<label />').attr('for',"_" + idStr).text("/"))
										.append( $('<input />').attr('id', "_" + idStr).attr('type','text').val(character[tempName].value)
															   .change( handleChange));
			
			div.append( tempForm);
		}
	}
	
	return div;
}
