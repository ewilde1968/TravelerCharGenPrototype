function PopupCanvas( tcg, dataType) {
	var tableData = function( charData, headers, widths, fields) {
		var result = $('<table />');

		var header = $('<tr />');
		for(i=0;i<headers.length;i++)
			header.append( $('<th />').text( headers[i]));
		result.append( header);
		
		if( charData.length > 0) {
			for(i=0;i<charData.length;i++) {
				var row = $('<tr />');
				
				for(j=0;j<fields.length;j++)
					row.append( $('<td />').attr('width',widths[j])
										   .attr('min-width',widths[j])
										   .text( charData[i][fields[j]]));
				
				result.append(row);
			}
		} else {
			for( x in charData) {
				var row = $('<tr />');
				
				for(i=0;i<fields.length;i++)
					row.append( $('<td />').attr('width',widths[i])
										   .attr('min-width',widths[i])
										   .text( charData[x][fields[i]]));
				
				result.append(row);
			}
		}
		
		return result;
	}
	
	var div = $('<div />').attr('id',"popupCanvas")
						  .click( function() {$(this).remove();});

	var data = null;
	switch( dataType) {
	case "Possessions":
		div.append( tableData(tcg.character.possessions,
					[ "Item", "Quantity"],
					[ 450, 100],
					[ "nameString", "quantity"]));
		break;
	case "Skills":
		div.append( tableData(tcg.character.skills,
				[ "Skill", "Level"],
				[ 450, 100],
				[ "nameString", "level"]));
		break;
	case "Description":
		var data = tcg.character["Description Text"];
		var textarea = $('<textarea />').attr('id','descriptionTA')
									 .val((data==null)?"":data)
									 .change( function() {
										DOM_.activeTCG.character["Description Text"] = this.value; 
									 })
									 .click( function(event) {
										 event.stopPropagation();
									 });
		div.append( textarea);
		break;
	case "History":
		div.append( tableData(tcg.character.history,
				[ "When", "Event"],
				[ 100, 450],
				[ "When", "What"]));
		break;
	}
	
	return div;
}