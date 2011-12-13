function HistoryCanvas( tcg) {
	var canvas = $('<div />').attr('id', 'historyCanvas');
	var history = tcg.character.history;

	textarea = $('<textarea />').attr('id','historyTA').attr('disabled','true');
	
	// create lookup options and table
/*	var table = $('<table />').attr('id', 'historyTable')
							  .append( $('<tr />').append( $('<th />').attr('id','historyWhenHeader').text("Time"))
									  			  .append( $('<th />').attr('id','historyWhatHeader').text("Event")));
	*/
	var resultText = "";
	for(counter = 0;counter < history.length; counter++) {
		var ho = history[counter];
		resultText += ho["When"] + ": " + ho["What"] + "\r\n";
		/*		table.append( $('<tr />').append( $('<td />').text( history[counter]["When"]))
										 .append( $('<td />').text( history[counter]["What"])));*/
		
	}
	textarea.text(resultText);

	canvas.append( textarea);

	return canvas;
}