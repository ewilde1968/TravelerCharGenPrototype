function BrowseCharListCanvas( uid) {
	var newCharB = $('<button />').attr('id','newCharB')
								   .text('new character')
								   .click( function() {
									   DOM_.activeTCG = new TravelerCharGen();
								   });
	
	var ul = $('<ul />').attr('id','charListUL');
	var canvas = $('<div />').attr('id','BrowseCharListCanvas')
							 .append( ul)
							 .append( newCharB);

	// get the search object
	var searchObject = null;
	if( uid != null) {
		searchObject = new Object();
		searchObject.owner = uid._id;
	}
	
	var col = DOM_.db.getCollection( "characters");
	var request = new MongoHQRequest( function(response,status,xhr) {
		if( status == "success") {
			for(i=0;i<response.length;i++) {
				var li = new CharacterListItem( response[i]);
				var ul = $('#charListUL').append(li);
				
			}
		}
	});
	col.find( request, searchObject);	// TODO limit by fields
	
	return canvas;
}