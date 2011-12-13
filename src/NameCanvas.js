function NameCanvas( character) {
	// create the root canvas
	var div = $('<div />').attr('id',"canvasName")

	var nameForm = $('<form />').attr('id',"nameForm")
								.append( $('<label />').attr('for',"_nameForm").text("Name"))
								.append( $('<input />').attr('id', "_nameForm").attr('type','text').val(character["Name"]));
	var raceForm = $('<form />').attr('id',"raceForm")
								.append( $('<label />').attr('for',"_raceForm").text("Race"))
								.append( $('<input />').attr('id', "_raceForm").attr('type','text').val(character["Race"]));
	var hwForm = $('<form />').attr('id',"hwForm")
							  .append( $('<label />').attr('for',"_hwForm").text("Home World"))
							  .append( $('<input />').attr('id', "_hwForm").attr('type','text').val(character["Home World"]));

	div.append( nameForm).append( raceForm).append( hwForm);
	
	return div;
}
