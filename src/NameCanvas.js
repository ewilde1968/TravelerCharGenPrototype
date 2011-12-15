function NameCanvas( tcg) {
	// create the root canvas
	var div = $('<div />').attr('id',"canvasName")

	var character = tcg.character;
	var nameForm = $('<form />').attr('id',"nameForm")
								.append( $('<label />').attr('for',"_nameForm").text("Name"))
								.append( $('<input />').attr('id', "_nameForm").attr('type','text').val(character["Name"]))
								.change( function() {DOM_.activeTCG.character["Name"] = this.value;});
	var raceForm = $('<form />').attr('id',"raceForm")
								.append( $('<label />').attr('for',"_raceForm").text("Race"))
								.append( $('<input />').attr('id', "_raceForm").attr('type','text').val(character["Race"]))
								.change( function() {DOM_.activeTCG.character["Race"] = this.value;});
	var hwForm = $('<form />').attr('id',"hwForm")
							  .append( $('<label />').attr('for',"_hwForm").text("Home World"))
							  .append( $('<input />').attr('id', "_hwForm").attr('type','text').val(character["Home World"]))
							  .change( function() {DOM_.activeTCG.character["Home World"] = this.value;});
	var heightForm = $('<form />').attr('id',"heightForm")
								  .append( $('<label />').attr('for',"_heightForm").text("Height"))
								  .append( $('<input />').attr('id', "_heightForm").attr('type','text').val(character["Height"]))
								  .change( function() {DOM_.activeTCG.character["Height"] = this.value;});
	var weightForm = $('<form />').attr('id',"weightForm")
								  .append( $('<label />').attr('for',"_weightForm").text("Weight"))
								  .append( $('<input />').attr('id', "_weightForm").attr('type','text').val(character["Weight"]))
								  .change( function() {DOM_.activeTCG.character["Weight"] = this.value;});
	var ageForm = $('<form />').attr('id',"ageForm")
							   .append( $('<label />').attr('for',"_ageForm").text("Age"))
							   .append( $('<input />').attr('id', "_ageForm").attr('type','text').val(character.age))
							   .change( function() {DOM_.activeTCG.character.age = this.value;});
	
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
	var rankForm = $('<form />').attr('id',"rankForm")
								.append( $('<label />').attr('for',"_rankForm").text("Titles"))
								.append( $('<input />').attr('id', "_rankForm").attr('type','text').text(title).val(title))
								.change( function() {DOM_.activeTCG.character["Titles"]=this.value});

	div.append( nameForm)
	   .append( heightForm)
	   .append( weightForm)
	   .append( ageForm)
	   .append( raceForm)
	   .append( hwForm)
	   .append( rankForm)
	   .append( genderDDL);
	
	return div;
}
