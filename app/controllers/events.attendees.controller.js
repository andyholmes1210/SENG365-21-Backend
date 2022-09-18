const event = require('../models/events.attendees.model');


exports.requesteventatten = async function(req, res) { // Join an Event
    console.log( '\nRequest to join a event attendees...' );
    const values = req.params;
    const id = req.params.id
    const user_id = req.authenticatedUserId;

    try {
        const result1 = await event.requestEventAtten( values, user_id );
        const result2 = await event.getDate( id );

        if (result2 < result1.date_of_interest) {
            res.status(403)
                .send('Forbidden');
        } else {
            res.status(201)
                .send('OK');
        }
    } catch (err) {
        if (err.errno === 1062 || err.code === 'ER_DUP_ENTRY') {
            res.status(403)
                .send('Forbidden');
        } else if (err.errno === 1452 || err.code === 'ER_NO_REFERENCED_ROW_2') {
            res.status(404)
                .send('Bad Request: Not Found');
        } else {
            console.log(err);
            res.status(500)
                .send('Internal Server Error');
        }
    }

};


exports.deleteeventatten = async function(req, res) { // Delete an event attendees
    console.log( '\nRequest to delete a event attendees...' );
    const values = req.params;
    const user_id = req.authenticatedUserId;
    const checkatten = await event.getAttendeeid( values, user_id );
    const checkevent =  await event.checkEvent(values);
    var today = new Date();

    if (checkevent.length <= 0) {
        res.status(404)
            .send('Not Found');
    } else if (checkatten == 3 || checkatten == 0) {
        res.status(403)
            .send('Forbidden');
    } else if (checkevent[0].date < today) {
        res.status(403)
            .send('Forbidden');
    } else {
        try {
            await event.deleteEventAtten( values, user_id );
            res.status(200)
                .send('Deleted');
            } catch (err) {
                console.log(err);
                res.status(500)
                    .send('Internal Server Error');
            }
    }

};


exports.patchevents = async function (req, res) { // Patch events
    console.log( '\nRequest to patch a event attendees...' );
    const values = req.params;
    const user_id = req.authenticatedUserId;
    const checkevent = await event.checkEvent( values);
    const organizerid = await event.getOrganizerId( user_id);


    if (checkevent.length <= 0) {
        res.status(404)
            .send('Not Found');
    } else if (organizerid == user_id) {
        res.status(403)
            .send('Forbidden');
    } else {
        try {
            const patchatten = await event.patchEvents( values, user_id );
            if (patchatten == null) {
                res.status(400)
                    .send('Bad Request')
            } else {
                res.status(200)
                    .send('OK')
            }
        } catch (err) {
            res.status(500)
                .send('Internal Server Error')
        }
    }






};


