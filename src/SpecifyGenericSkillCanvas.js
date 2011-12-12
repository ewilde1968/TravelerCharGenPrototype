function SpecifyGenericSkillCanvas( tcg, skill) {
	var canvas = $('<div />').attr('id', 'actionCanvas');

	var selectionA = new Array();
	for( sk in SKILLS) {
		var item = SKILLS[sk];
		if( item.type == skill.subtype)
			selectionA.push( item);
	}

	var selectionDDL = $('<select />').attr('id','selectionDDL');
	for(i=0;i<selectionA.length;i++) {
		var str = selectionA[i].nameString;
		selectionDDL.append( $('<option />').val(str).text( str));
	}

	// add button for selecting skill
	var selectB = $('<button >').attr('id',"selectB").attr('type','button')
								.text('Select')
								.click( function() {
									var tcg = DOM_.activeTCG;
									
									var data = $('#selectionDDL').val();
									var skill = new Skill( data);
									tcg.character.AddSkill( skill);
									tcg.ChangeState( "SkillSelected");
								});

	canvas.append( selectionDDL).append(selectB);

	return canvas;
}