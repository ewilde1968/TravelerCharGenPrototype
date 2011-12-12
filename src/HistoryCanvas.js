function HistoryCanvas( tcg) {
	var history = tcg.character.history;
	var canvas = $('<div />').attr('id', 'historyCanvas');

	// create lookup options and table
	var table = $('<table />').attr('border', 1)
							  .append( $('<tr />').append( $('<th />').text("Time"))
									  			  .append( $('<th />').text("Event")));
	
	for(counter = 0;counter < history.length; counter++)
		table.append( $('<tr />').append( $('<td />').text( history[counter]["When"]))
								 .append( $('<td />').text( history[counter]["What"])));
		
	canvas.append( table);

	return canvas;
}