const events = require( '../controllers/events.controller' );
const eventsimage = require( '../controllers/eventimages.controller' );
const eventatten = require('../controllers/events.attendees.controller');
const authenticate = require("../middleware/authenticate");

module.exports = function( app ) {

    app.route(app.rootUrl +  '/events/' )
        .get( events.listevents )
        .post( events.createevent );

    app.route(app.rootUrl + '/events/categories' )
        .get( events.listcategory );

    app.route(app.rootUrl + '/events/:id' )
        .get( events.readoneevent )
        .get( events.listevents );

    app.route(app.rootUrl + '/events/:id/image')
        .get( eventsimage.readeventimage );

    app.route(app.rootUrl + '/events/:id/attendees')
        .post( authenticate.loginRequired, eventatten.requesteventatten)
        .delete( authenticate.loginRequired, eventatten.deleteeventatten);

    app.route(app.rootUrl + '/events/:event_id/attendees/:user_id')
        .patch ( authenticate.loginRequired, eventatten.patchevents);



};