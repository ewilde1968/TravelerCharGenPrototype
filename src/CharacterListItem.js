function CharacterListItem( char) {
	this.character = char;
	
	var nmStr = char["Name"];
	if( nmStr == null || nmStr.length < 1)
		nmStr = "unnamed";
	
	var ugc = "UGC";
	ugc += char["Strength"].value.toString(16);
	ugc += char["Dexterity"].value.toString(16);
	ugc += char["Endurance"].value.toString(16);
	ugc += char["Intelligence"].value.toString(16);
	ugc += char["Education"].value.toString(16);
	ugc += char["Social Standing"].value.toString(16);
	
	var result = $('<li />').append( $('<p />').attr('id','charName').text( char["Name"]))
							.append( $('<p />').text( 'Aged ' + char["Age"]))
							.append( $('<p />').text( ugc))
							.click( function(event) {
								// user selected a character, open it for edit
								DOM_.activeTCG = new TravelerCharGen( char)
							});

	
	return result;
}