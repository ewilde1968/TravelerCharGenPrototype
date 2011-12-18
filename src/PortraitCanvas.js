function PortraitCanvas( tcg) {
	var div = $('<div />').attr('id',"portraitCanvas");

	var char = DOM_.activeTCG.character;
	var portrait = char["Portrait"];
	
	var img;
	if( portrait == null || portrait["DataType"] == null) {
		img = $('<button >').attr('id',"defaultImageB").attr('type','button');
	} else if( portrait["DataType"] == "URL") {
		img = $('<img />').attr('id',"portraitImage")
						  .attr('src',portrait["URL"]);
		div.attr('id','portraitCanvasImaged');
	}
	
	img.click( function() {
							var uri = prompt("Please enter a publicly accessible URL.");
							if( uri != null && uri != "") {
								var obj = new Object();
								obj["DataType"] = "URL";
								obj["URL"] = uri;

								var character = DOM_.activeTCG.character;
								character["Portrait"] = obj;
								
								$('#portraitCanvas').replaceWith( new PortraitCanvas( tcg));
							}
	});

	div.append( img);
	
	return div;
}