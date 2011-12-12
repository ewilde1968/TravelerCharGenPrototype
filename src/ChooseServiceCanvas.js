function ChooseServiceCanvas( tcg) {
	var canvas = $('<div />').attr('id', 'actionCanvas');

	var instructions = $('<p />').attr('id','instructions').text('Choose a service in which to enlist.');
	
	// add the services and service selection
	var addServiceToTable = function( service, char, t) {
		var row = $('<tr />').append( $('<td />').text( service["nameString"]))
							 .append( $('<td />').text( char.DetermineThreshold( service["Enlistment"])))
							 .append( $('<td />').text( char.DetermineThreshold( service["Survival"])))
							 .append( $('<td />').text( char.DetermineThreshold( service["Commission"])))
							 .append( $('<td />').text( char.DetermineThreshold( service["Promotion"])))
							 .append( $('<td />').text( char.DetermineThreshold( service["Reenlist"])));
		t.append( row);
	};
	var addSelectOption = function( service, counter, s) {
		var str = service[ "nameString"];
		var option = $('<option />').attr( 'value', counter).text( str);
		s.append( option);
	}
	var titleRow = $('<tr />').append( $('<th />').text('Service'))
							  .append( $('<th />').text('Enlistment'))
							  .append( $('<th />').text('Survival'))
							  .append( $('<th />').text('Commission'))
							  .append( $('<th />').text('Promotion'))
							  .append( $('<th />').text('Reenlist'));
	var careerTable = $('<table />').attr('id','careerTable').attr('border','1').append( titleRow);
	var selectDDL = $('<select />').attr('id',"selectDDL");
	counter = 0;
	while( counter < CAREERS.length) {
		var service = new Service( counter);
		addServiceToTable( service, tcg.character, careerTable);
		addSelectOption( service, counter++, selectDDL);
	}

	// add button for selecting service
	var selectB = $('<button >').attr('id',"selectB").attr('type','button')
								.text('Roll')
								.click( function() {
									var tcg = DOM_.activeTCG;
									
									var service = $("#selectDDL").val();
									tcg.ChangeState( "ServiceSelected", service);
								});

	canvas.append( careerTable).append(instructions).append( selectDDL).append(selectB);

	return canvas;
}