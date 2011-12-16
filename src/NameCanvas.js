function NameCanvas( tcg) {
	// create the root canvas
	var div = $('<div />').attr('id',"canvasName")

	var character = tcg.character;
	
	var handleKey = function(event) {
		if( event.which == 13 || event.keyCode == 13) {
			// on ENTER go to next field
			event.stopPropagation();
			$(this).change();
		}
	};
	
	var handleChange = function(event) {
		var tcg = DOM_.activeTCG;
		var character = tcg.character;
		var nm = this.id.substr(1).replace(/_/g," ");	// skip first "_"
		
		character[nm] = this.value;
		tcg.RefreshScreen();
	};
	
	var addField = function(nm) {
		var idStr = nm.replace(/ /g, "_");
		var result = $('<div />').attr('id',idStr)
								 .append( $('<p />').text(nm))
								 .append( $('<textarea />').attr('id',"_"+idStr)
										 				   .val( character[nm])
										 				   .change( handleChange)
										 				   .keydown( handleKey));
		return result;
	};
	
	var nameD = addField( "Name");
	var raceD = addField( "Race");
	var hwD = addField( "Home World");
	var heightD = addField( "Height");
	var weightD = addField( "Weight");
	var ageD = addField( "Age");
	
	var genderDDL = $('<select />').attr('id',"genderDDL")
	   .append( $('<option />').text('Male'))
	   .append( $('<option />').text('Female'))
	   .change( function() {
		   DOM_.activeTCG.character["Gender"]=this.value;
		   DOM_.activeTCG.RefreshScreen();
	   });
	genderDDL[0].selectedIndex = character["Gender"] == "Female" ? 1 : 0;

	var title = character["Titles"];
	if( title == null) {
		if( character["Commissioned"] == true) {
			var service = FindServiceByName( character["Service"]);
			var rankA = service["Ranks"];
			title = rankA[ character["Rank"]].nameString;
		}
		
		if( character["Social Standing"].value > 10) {
			var NobleTitle = [{"Male":"Knight","Female":"Dame"},
			                  {"Male":"Baron","Female":"Baroness"},
			                  {"Male":"Marquis","Female":"Marchioness"},
			                  {"Male":"Count","Female":"Countess"},
			                  {"Male":"Duke","Female":"Duchess"}];
			var gender = character["Gender"] == null ? "Male" : character["Gender"];
			var noble = NobleTitle[character["Social Standing"].value - 11][gender];
			if( title != null && title != "")
				title += ", " + noble;
			else
				title = noble;
		}
		
		// if still null, provide a default value of empty string
		if( title == null)
			title = "";
	}
	var rankD = $('<div />').attr('id',"Titles")
							.append( $('<p />').text("Titles"))
							.append( $('<textarea />').attr('id',"_Titles")
													  .val( title)
													  .change( handleChange)
													  .keydown( handleKey));

	div.append( nameD)
	   .append( raceD)
	   .append( hwD)
	   .append( rankD)
	   .append( heightD)
	   .append( weightD)
	   .append( ageD)
	   .append( genderDDL);
	
	return div;
}
