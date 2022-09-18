const event = require('../models/events.model');

exports.listevents = async function(req, res){ // List all events
    console.log( '\nRequest to list events...' );

    try {
        if (req.params !== 0) {
            const result = await event.getAllEvents();
            res.status(200)
                .send(result);
        } else {
            res.status(400)
                .send( 'Bad Request' )
        }
    } catch(err){
        res.status( 500 )
            .send( `Internal Server Error ${err}` );
    }
};

exports.listcategory = async function(req, res){ // List all category
    console.log( '\nRequest to list categories...' );

    try {
        const result = await event.getEventCategories();
        res.status( 200 )
            .send( result );
    } catch(err){

        res.status( 500 )
            .send( `ERROR getting category ${err}`);
    }

};

exports.readoneevent = async function(req, res){ // Read one event
    console.log( '\nRequest to read a event...' );

    const id = req.params.id;

    try {
        const result = await event.getOneEvent( id );
        if( result.length === 0){
            res.status( 404 )
                .send('Id Not Found');
        }
        else {
            res.status( 200 )
                .send( result );
        }
    } catch( err ) {

        res.status(500)
            .send(`Internal Server Error: reading event ${id}: ${ err }`);
    }
};

exports.createevent = async function(req, res) { // Create event
    console.log('\nRequest to create a event...');

    try {
        const result = await event.insertEvent(req);
        res.status(201)
            .send({event_id: result.insertId});
    } catch (err) {
        res.status(500)
            .send(`ERROR create event ${err}`);
    }
};

exports.deleteevent = async function(req, res) { // Delete Event
    console.log('\nRequest to delete an event...');

   // const id = req.params.id;

    try {
        //const result = await event.deleteEvent(id);
        res.status(200)
            .send( 'OK' );
    } catch(err){
        res.status(500)
            .send(`ERROR getting event: ${err}`);
    }

}

