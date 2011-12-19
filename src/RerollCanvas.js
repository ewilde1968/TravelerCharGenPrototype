function RerollCanvas( tcg) {
	var rerollB = $('<button />').attr('id','rerollB').attr('type','button')
								 .click( function() {DOM_.activeTCG = new TravelerCharGen();});
	var rerollP = $('<p />').attr('id','rerollP').text("reroll");

	var canvas = $('<div />').attr('id', 'rerollCanvas')
							 .append( rerollP)
							 .append( rerollB);

	return canvas;
}

RerollCanvas_Create = function(tcg,context) {
	return new RerollCanvas(tcg);
};
