const event = require('../models/eventimages.models');


exports.readeventimage = async function(req, res){ // Get event image
    console.log( '\nRequest to read a event image...' );
    const id = req.params.id;
    try {
        const result = await event.getImageEvents( id );
        res.contentType( result.type );
        res.status( 200 )
            .send(result.photo);
    } catch( err ) {
        if (err.errno === -2 || err.code === 'ENOENT') {
            res.status(404)
                .send('Bad Request: Not Found');
        } else{
            res.status(500)
                .send(`ERROR reading event ${id}: ${err}`);
        }
    }
};
