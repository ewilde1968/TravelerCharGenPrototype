function MusterOutCanvas( tcg) {
	var character = tcg.character;
	var service = tcg.selectedService;
	var canvas = $('<div />').attr('id', 'actionCanvas');
	
	var instructions = $('<p />').attr('id', 'instructionsP')
								 .text("Please choose an item or cash:");
	
	var selectDDL = $('<select />').attr('id', 'musterOutSelectDDL')
								   .append( $('<option />').attr('value',"Item").text("Item"));

	// create lookup options and table
	var table = $('<table />').attr('border', 1);
	var header = $('<tr />').append( $('<th />').text("Roll"))
							.append( $('<th />').text("Item"));
	
	// limited number of times a character can choose cash
	if( character["CashChoices"] > 0) {
		header.append( $('<th />').text("Cash"));
		selectDDL.append( $('<option />').attr('value',"Cash").text("Cash"));
	}

	table.append( header);

	for(counter=0;counter<7;counter++) {
		var row = $('<tr />').append( $('<td />').text(counter+1));

		var benny = service.GetBenny( "Muster Out Item",counter);
		row.append( $('<td />').text( (benny == null) ? "-" : benny["nameString"]));

		if( character["CashChoices"] > 0) {
			benny = service.GetBenny( "Muster Out Cash",counter);
			row.append( $('<td />').text( (benny == null) ? "-" : benny["quantity"] + " CR"));
		}
		
		table.append(row);
	}

	// create button
	var selectB = $('<button >').attr('id',"musterOutSelectB").attr('type','button')
								.text('Roll')
								.click( function() {
									var tcg = DOM_.activeTCG;
									
									var cash = $('#musterOutSelectDDL').val() == "Cash";
									tcg.selectedService.SelectMusterOutBenny( tcg.character, cash);
								});

	canvas.append( instructions).append( table).append( selectDDL).append( selectB);

	return canvas;
}