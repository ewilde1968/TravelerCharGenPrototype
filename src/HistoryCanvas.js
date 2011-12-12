function HistoryCanvas( tcg) {
	var canvas = $('<div />').attr('id', 'historyCanvas');
	var history = tcg.character.history;

	// create lookup options and table
	var table = $('<table />').attr('id', 'historyTable')
							  .append( $('<tr />').append( $('<th />').attr('id','historyWhenHeader').text("Time"))
									  			  .append( $('<th />').attr('id','historyWhatHeader').text("Event")));
	
	for(counter = 0;counter < history.length; counter++)
		table.append( $('<tr />').append( $('<td />').text( history[counter]["When"]))
								 .append( $('<td />').text( history[counter]["What"])));
		
	canvas.append( table);

	return canvas;
}