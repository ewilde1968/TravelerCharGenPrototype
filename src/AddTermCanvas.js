function AddTermCanvas( tcg) {
	var character = tcg.character;
	var service = tcg.selectedService;
	var canvas = $('<div />').attr('id', 'actionCanvas');
	
	var instructions = $('<p />').attr('id', 'instructions')
								 .text("Please choose an area of improvement:");
	
	var selectionA = ["Personal Development", "Active Service", "Training", "Advanced Education"];
	var selectDDL = $('<select />').attr('id', 'selectDDL');

	// create lookup options and table
	var table = $('<table />').attr( 'id', "addTermServiceTable").attr('border', 1);
	var header = $('<tr />').append( $('<th />').text("Roll"));
	table.append( header);
	
	var rows = new Array();
	for(counter = 0;counter < selectionA.length; counter++) {
		var str = selectionA[ counter];
		
		// check to see if eligible for this choice
		if( str == "Advanced Education" && character["Education"].value < 8)
			continue;
		else
			table.attr('id',"addTermServiceTableBig");	// bigger style table

		// add option
		var option = $('<option />').attr( 'value', counter).text( str);
		selectDDL.append( option);

		// add column
		header.append( $('<th />').text(str));
		var bennyA = service[str];
		for(i=0;i<bennyA.length;i++) {
			var obj = service.GetBenny( str, i);

			if( rows[i] == null) {
				rows[i] = $('<tr />').append( $('<td />').text(i+1));
				table.append( rows[i]);
			}
			rows[i].append( $('<td />').text( obj["nameString"]));
		}
	}

	// create button
	var selectB = $('<button >').attr('id',"selectB").attr('type','button')
								.text('Roll')
								.click( function() {
									var tcg = DOM_.activeTCG;
									
									var area = selectionA[$("#selectDDL").val()];
									tcg.selectedService.SelectTermBenny( area, tcg.character);
								});

	canvas.append( instructions)
		  .append( selectDDL)
		  .append( selectB)
		  .append( table);
		  
	return canvas;
}

AddTermCanvas_Create = function( tcg, context) {
	return new AddTermCanvas( tcg);
}