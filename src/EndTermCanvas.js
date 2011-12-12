function EndTermCanvas( tcg) {
	var canvas = $('<div />').attr('id', 'actionCanvas');

	var addChanceToTable = function( str, t) {
		var row = $('<tr />').append( $('<td />').text(str))
							 .append( $('<td />').text( tcg.character.DetermineThreshold( tcg.selectedService[str])));
		t.append( row);
	};
	var titleRow = $('<tr />').append( $('<th />').text('Action'))
							  .append( $('<th />').text('Chance'));
	var careerTable = $('<table />').attr('border','1').append( titleRow);
	addChanceToTable( "Survival", careerTable);
	addChanceToTable( "Commission", careerTable);
	addChanceToTable( "Promotion", careerTable);
	addChanceToTable( "Reenlist", careerTable);

	var reenlistB = $('<button >').attr('type','button')
								  .text('Reenlist')
								  .click( function() {
									  var tcg = DOM_.activeTCG;
									  var service = tcg.selectedService;

									  // try to reenlist
									  tcg.ChangeState( service.TryToReenlist( tcg.character) ? "Reenlisted" : "MusterOut");
								  });
	var musterOutB = $('<button >').attr('type','button')
								   .text('Muster Out')
								   .click( function() {
									   var tcg = DOM_.activeTCG;
									   var service = tcg.selectedService;
									   var char = tcg.character;

									   // try to muster out
									   tcg.ChangeState( service.TryToMusterOut( char) ? "MusterOut" : "Reenlisted");
								   });

	var instructions = $('<p />').attr('id','instructions').text('Reenlist for another term or muster out.');
	
	canvas.append( careerTable).append( instructions).append( reenlistB).append(musterOutB);

	return canvas;
}