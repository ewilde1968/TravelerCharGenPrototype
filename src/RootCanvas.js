function RootCanvas( tcg, canvasName) {
	var charAttribute = function(attrName,character) {
		idStr = attrName.replace(" ","_");
		var result = $('<form />').attr('id',idStr)
								  .append( $('<label />').attr('for',"_" + idStr).text(character[attrName].nameString + " "))
								  .append( $('<input />').attr('id', "_" + idStr).attr('type','text').val(character[attrName].value)
										  				 .change( function(event) {
										  					 var tcg = DOM_.activeTCG;
										  					 var char = tcg.character;
										  					 var attrName = this.id.substr(1).replace("_"," ");	// skip first _
										  					 
										  					 char[attrName].value = this.value;
										  					 tcg.RefreshScreen();
										  				 }));
		
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
	}
	
	return div;
}
