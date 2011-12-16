function RootCanvas( tcg, canvasName) {
	var character = tcg.character;
	
	var handleChange = function() {
		var tcg = DOM_.activeTCG;
		var char = tcg.character;
		var attrName = this.id.substr(1).replace(/_/g," ");	// skip first _
				 
		char[attrName].value = parseInt( this.value);
		tcg.RefreshScreen();
	};
	
	var handleKey = function(event) {
		if( event.which == 13 || event.keyCode == 13) {
			// on ENTER go to next field
			event.stopPropagation();
			$(this).change();
		}
	};
	
	var charAttribute = function(attrName,character) {
		idStr = attrName.replace(/ /g,"_");
		var result = $('<div />').attr('id',idStr)
								 .append( $('<p />').attr('id',idStr+"L").text(character[attrName].nameString))
								 .append( $('<textarea />').attr('id',"_"+idStr).val(character[attrName].value)
										 				   .attr('maxlength',4).attr('required',true)
										 				   .change( handleChange)
										 				   .keydown( handleKey));
		
		if(canvasName=="canvasStats") {
			switch( attrName) {
			case "Strength":
			case "Dexterity":
			case "Endurance":
				if( character[attrName+"Temp"] == null)
					character.SetAttribute( attrName+"Temp", character[attrName].value);
				tempVal = character[attrName+"Temp"].value;

				result.append( $('<p />').attr('id',idStr+"Slash").text("/"))
					  .append( $('<textarea />').attr('id',"_"+idStr+"Temp").val(tempVal)
							  					.attr('maxlength',4).attr('required',true)
							  					.change( handleChange)
							  					.keydown( handleKey));
			}
		}
		
		return result;
	};
	
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
