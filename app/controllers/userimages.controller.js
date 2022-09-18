const userimage = require('../models/userimages.model');
const user = require('../models/users.model');


exports.readuserimage = async function(req, res){ // Read user image
    console.log( '\nRequest to read a user image...' );
    const id = req.params.id;

    try {
        const result = await userimage.getImageUsers( id );
        res.contentType( result.type );
        res.status( 200 )
            .send( result.photo );
    } catch( err ) {
        if (err.errno === -2 || err.code === 'ENOENT') {
            res.status(404)
                .send('Bad Request: Not Found');
        } else {
            res.status(500)
                .send(`ERROR reading event ${id}: ${ err }`);
        }
    }
};


exports.deleteimage = async function(req, res) { // Delete user image

    const token = req.header('X-Authorization');
    const id = req.params.id
    const loginid = req.authenticatedUserId

    if (loginid == id) {
        try {
            const result = await userimage.deleteUserImage(id);
            res.status(200)
                .send('OK')
        } catch (err) {
            res.status(500)
                .send('Internal Server Error');
        }

    } else {
        res.status(403)
            .send('For')

    }

};


