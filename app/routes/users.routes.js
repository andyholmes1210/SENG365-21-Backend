const users = require( '../controllers/users.controller' );
const usersimage = require( '../controllers/userimages.controller' );
const authenticate = require("../middleware/authenticate");

module.exports = function( app ) {

    app.route(app.rootUrl + '/users/register')
        .post( users.createuser );

    app.route(app.rootUrl + '/users/login')
        .post( users.loginuser);

    app.route(app.rootUrl + '/users/logout')
        .post( authenticate.loginRequired, users.logoutuser);

    app.route(app.rootUrl + '/users/:id/image')
        .get( usersimage.readuserimage)
        .delete( authenticate.loginRequired, usersimage.deleteimage);

    app.route(app.rootUrl + '/users/:id')
        .get( users.getuserid)
       // .patch( authenticate.loginRequired, users.updateUserId);



}