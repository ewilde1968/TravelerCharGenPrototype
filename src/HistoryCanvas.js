function HistoryCanvas( tcg) {
	var canvas = $('<div />').attr('id', 'historyCanvas');
	var history = tcg.character.history;

	textarea = $('<textarea />').attr('id','historyTA').attr('disabled','true');
	
	var resultText = "";
	for(counter = 0;counter < history.length; counter++) {
		var ho = history[counter];
		resultText += ho["When"] + ": " + ho["What"] + "\r\n";
	}
	textarea.text(resultText);

	canvas.append( textarea);

	return canvas;
}