/*	Javascript main for WebApp
 *
 *
 */

/**
 * Syncs local copies of shared state with those on the server and renders the
 *     app to reflect the changes.
 * @param {!Array.<Object.<!string, *>>} add Entries added to the shared state.
 * @param {!Array.<!string>} remove Entries removed from the shared state.
 */

/**
 * The primary application object used for managing the view
 * @type {TravelerCharGen}
 * @private
 */
var handleLoad = null;

(function() {
	var LazyLoad = function( scriptURL) {
	    var s = document.createElement('script');
	    s.type = 'text/javascript';
	    s.async = true;
	    s.src = scriptURL;
	    var x = document.getElementsByTagName('script')[0];
	    x.parentNode.insertBefore(s, x);
	}

	handleLoad = function() {
		// Load all lazy loading libraries
//		LazyLoad( "../Character.js");

		// Setup the DOM object, credentials, database and cache
		
		// TODO: For now, assume a specific set of credentials for the user
		// 	will need to implement login screen before accessing database
		
		// Create the main application object, which will create the DOM
		//		and start the wizard walkthrough.
		DOM_.activeTCG = new TravelerCharGen();
	}
})();

