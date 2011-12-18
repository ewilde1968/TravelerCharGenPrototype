var PUC_lastTick;
var PUC_TimeToSlide = 200;
var PUC_timeLeft;
var PUC_closingId;
var PUC_openingId;
var PUC_openAccordion;

function PopupCanvas( tcg, dataType) {
	
	var tableData = function( charData, headers, widths, alignments, fields) {
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
										   .attr('text-align',alignments[j])
										   .text( charData[i][fields[j]]));

				result.append(row);
			}
		} else {
			for( x in charData) {
				var row = $('<tr />');

				for(i=0;i<fields.length;i++)
					row.append( $('<td />').attr('width',widths[i])
										   .attr('min-width',widths[i])
										   .attr('text-align',alignments[i])
										   .text( charData[x][fields[i]]));

				result.append(row);
			}
		}

		return result;
	}

	function runAccordion(index,event)
	{
		// don't close the parent popup
		if( event != null)
			event.stopPropagation();
		   
		var nID = "Accordion" + index + "Content";
		if(PUC_openAccordion == nID)
			return;	// don't close the only open content
	  
//		ContentHeight = document.getElementById("Accordion" + index + "Content"+"_").offsetHeight;
//		var funcStr = "PopupCanvas_animate(" + new Date().getTime() + "," + PUC_TimeToSlide + ",'" + openAccordion + "','" + nID + "')";
		PUC_lastTick = new Date().getTime();
		PUC_timeLeft = PUC_TimeToSlide;
		PUC_closingId = PUC_openAccordion;
		PUC_openingId = nID;
		setTimeout( PopupCanvas_animate, 33);
	 
		PUC_openAccordion = nID;
	};

	// reset globals
	PUC_openAccordion = "";
	
	var historyContent = $('<div />').append( tableData(tcg.character.history,
														[ "When", "Event"],
														[ 100, 450],
														[ "center", "left"],
														[ "When", "What"]));
	var skillContent = $('<div />').append( tableData(tcg.character.skills,
														[ "Skill", "Level"],
														[ 450, 100],
														[ "left", "center"],
														[ "nameString", "level"]));
	var possessionsContent = $('<div />').append( tableData(tcg.character.possessions,
														[ "Item", "Quantity"],
														[ 450, 100],
														[ "left", "right"],
														[ "nameString", "quantity"]));
	var data = tcg.character["Description Text"];
	var textarea = $('<textarea />').attr('id','descriptionTA')
									.val((data==null)?"":data)
									.change( function() {
										DOM_.activeTCG.character["Description Text"] = this.value; 
									})
									.click( function(event) {
										event.stopPropagation();
	 								});
	var notesContent = $('<div />').append( textarea);
	
	var ac = $('<div />').attr('id','AccordionContainer').attr('class','AccordionContainer')
						 .append( $('<div />').click(function(event) {runAccordion(1,event);})
								 			  .append( $('<div />').attr('class','AccordionTitle').select(function() {return false;})
								 					  			   .text('History')))
						 .append( $('<div />').attr('id','Accordion1Content').attr('class','AccordionContent')
								 			  .append( $('<div />').attr('id','Accordion1Content_').attr('class','AccordionContent_')
								 					  			   .append( historyContent)));
	ac.append( $('<div />').click(function(event) {runAccordion(2,event);})
						   .append( $('<div />').attr('class','AccordionTitle').select(function() {return false;})
								   				.text('Skills')))
	  .append( $('<div />').attr('id','Accordion2Content').attr('class','AccordionContent')
			   			   .append( $('<div />').attr('id','Accordion2Content_').attr('class','AccordionContent_')
			   					   				.append( skillContent)));
	ac.append( $('<div />').click(function(event) {runAccordion(3,event);})
						   .append( $('<div />').attr('class','AccordionTitle').select(function() {return false;})
								   				.text('Possessions')))
	  .append( $('<div />').attr('id','Accordion3Content').attr('class','AccordionContent')
			  			   .append( $('<div />').attr('id','Accordion3Content_').attr('class','AccordionContent_')
			  					   				.append( possessionsContent)));
	ac.append( $('<div />').click(function(event) {runAccordion(4,event);})
							.append( $('<div />').attr('class','AccordionTitle').select(function() {return false;})
												 .text('Notes')))
	  .append( $('<div />').attr('id','Accordion4Content').attr('class','AccordionContent')
			  			   .append( $('<div />').attr('id','Accordion4Content_').attr('class','AccordionContent_')
			  					   				.append( notesContent)));

	var result = $('<div />').attr('id','popupCanvas')
							 .append( ac)
							 .click( function() {
								 $(this).remove();
								 DOM_.activeTCG.ChangeState("EditCharacter");
							 });
	
	// open History by default
	runAccordion(1,null);
	
	return result;
}

function PopupCanvas_animate() {  
	var ContentHeight = 305;
	var curTick = new Date().getTime();
	var elapsedTicks = curTick - PUC_lastTick;
	 
	var opening = (PUC_openingId == '') ? null : document.getElementById(PUC_openingId);
	var closing = (PUC_closingId == '') ? null : document.getElementById(PUC_closingId);
	
	if( opening != null)
		opening.style.overflow = 'hidden';
	if( closing != null)
		closing.style.overflow = 'hidden';
	 
	if(PUC_timeLeft <= elapsedTicks) {
		if(opening != null) {
			opening.style.height = 'auto';
			opening.style.overflow = 'auto';
		}

	    if(closing != null) {
	      //closing.style.display = 'none';
	      closing.style.height = '0px';
	    }

	    return;
	}

	PUC_timeLeft -= elapsedTicks;
	var newClosedHeight = Math.round((PUC_timeLeft/PUC_TimeToSlide) * ContentHeight);

	if(opening != null) {
		if(opening.style.display != 'block')
			opening.style.display = 'block';
		opening.style.height = (ContentHeight - newClosedHeight) + 'px';
	}

	if(closing != null)
		closing.style.height = newClosedHeight + 'px';

//	setTimeout("PopupCanvas_animate(" + curTick + "," + timeLeft + ",'" + closingId + "','" + openingId + "')", 33);
	PUC_lastTick = curTick;
	setTimeout( PopupCanvas_animate, 33);
}
