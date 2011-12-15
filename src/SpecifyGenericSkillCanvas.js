function SpecifyGenericSkillCanvas( tcg, skill) {
	var canvas = $('<div />').attr('id', 'actionCanvas');

	var instructions = $('<p />').attr('id','instructions')
								 .text('Choose a specific skill.');
	
	var selectionA = new Array();
	for( sk in SKILLS) {
		var item = SKILLS[sk];
		if( item.type == skill.subtype)
			selectionA.push( item);
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
									var skill = new Skill( data);
									tcg.character.AddSkill( skill);
									tcg.ChangeState( "SkillSelected");
								});

	canvas.append( instructions).append( selectionDDL).append(selectB);

	return canvas;
}

SpecifyGenericSkillCanvas_Create = function(tcg,context) {
	return new SpecifyGenericSkillCanvas(tcg,context);
};