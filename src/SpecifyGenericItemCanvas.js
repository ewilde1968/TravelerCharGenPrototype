function SpecifyGenericItemCanvas( tcg, item) {
	var canvas = $('<div />').attr('id', 'actionCanvas');

	var instructions = $('<p />').attr('id','instructions')
								 .text('Choose a specific item.');

	var selectionA = new Array();
	for( pi in PHYSICALITEMS) {
		var obj = PHYSICALITEMS[pi];
		if( obj.type == item.subtype)
			selectionA.push( obj);
	}

	var selectionDDL = $('<select />').attr('id','selectDDL');
	for(i=0;i<selectionA.length;i++) {
		var str = selectionA[i].nameString;
		selectionDDL.append( $('<option />').val(str).text( str));
	}

	// add button for selecting skill
	var selectB = $('<button >').attr('id',"selectB").attr('type','button')
								.text('Select')
								.click( function() {
									var tcg = DOM_.activeTCG;
									
									var data = $('#selectDDL').val();
									if( tcg.character.possessions[ data] != null) {
										var skill = new Skill( data);
										tcg.character.AddSkill( skill);
									} else {
										var pi = new PhysicalItem( data);
										tcg.character.AddPossession( pi);
									}
									tcg.ChangeState( "MusterOutSelected");
								});

	canvas.append( instructions).append( selectionDDL).append(selectB);

	return canvas;
}