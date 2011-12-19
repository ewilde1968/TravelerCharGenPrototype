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
 * A map of names to jQuery elements which compose the app.
 * @type {Object.<string, jQuery>}
 * @private
 */
var DOM_ = {
  body: null,
  activeTCG: null,
  storedTCG: null,
  userID: null
};

/**
 * The primary application object used for managing the view
 * @type {TravelerCharGen}
 * @private
 */
var handleLoad = null;

(function() {
	handleLoad = function() {
		// Setup the DOM object, credentials, database and cache
		DOM_.body = $('body');

		// Create the main application object, which will create the DOM
		//		and start the wizard walkthrough.
		DOM_.activeTCG = new TravelerCharGen();
	}
})();

