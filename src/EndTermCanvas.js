function EndTermCanvas( tcg) {
	var canvas = $('<div />').attr('id', 'actionCanvas');

	var addChanceToTable = function( str, t) {
		var row = $('<tr />').append( $('<td />').text(str))
							 .append( $('<td />').text( tcg.character.DetermineThreshold( tcg.selectedService[str])));
		t.append( row);
	};
	var titleRow = $('<tr />').append( $('<th />').text('Action'))
							  .append( $('<th />').text('Chance'));
	var careerTable = $('<table />').attr('id','endTermTable').append( titleRow);
	addChanceToTable( "Survival", careerTable);
	addChanceToTable( "Commission", careerTable);
	addChanceToTable( "Promotion", careerTable);
	addChanceToTable( "Reenlist", careerTable);

	var selectDDL = $('<select />').attr('id', 'selectDDL')
								   .append( $('<option />').attr( 'value', 'Reenlist').text( 'Reenlist'))
								   .append( $('<option />').attr( 'value', 'Muster Out').text( 'Muster Out'));
								   
	var selectB = $('<button >').attr('id',"selectB").attr('type','button')
								.text('Roll')
								.click( function() {
									var tcg = DOM_.activeTCG;
									var service = tcg.selectedService;
									var char = tcg.character;
		
									if( $('#selectDDL').val() == "Reenlist")
										tcg.ChangeState( service.TryToReenlist( char) ? "Reenlisted" : "MusterOut");
									else
										tcg.ChangeState( service.TryToMusterOut( char) ? "MusterOut" : "Reenlisted");
								});

	var instructions = $('<p />').attr('id','instructions').text('Reenlist for another term or muster out.');
	
	canvas.append( careerTable).append( instructions).append( selectDDL).append( selectB);

	return canvas;
}

EndTermCanvas_Create = function(tcg,context) {
	return new EndTermCanvas(tcg);
};