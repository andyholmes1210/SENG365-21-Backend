const db = require('../../config/db');


exports.requestEventAtten = async function (values, user_id) {
    console.log( 'Request to join event from the database...' );


    const conn = await db.getPool().getConnection();
    const query = 'insert into event_attendees (event_id, user_id,' +
        'attendance_status_id) values ( ? )';
    const [ rows ] = await conn.query( query, [ [[values.id], [user_id], [2] ]] );
    conn.release();
    return rows

};

exports.getDate = async function (id) { // Getting the date of the event in the data base
    console.log( 'Request to get event data from the database...' );

    const conn = await db.getPool().getConnection();
    const query = 'select date from event where id = ?';
    const [ rows ] = await conn.query( query, [id]);
    conn.release();
    return rows;

};


exports.deleteEventAtten = async function (values, user_id) { // Delete event attendees
    console.log( 'Request to get delete data from the database...' );

    const conn = await db.getPool().getConnection();
    const query = 'delete from event_attendees where user_id = ? and event_id = ?';
    await conn.query( query, [[ user_id ], [ values.id ]]);
    conn.release();
    return 'Deleted from database'

};

exports.getAttendeeid = async function (values, user_id) { //Get Attendee Id
    console.log( 'Request to get Attendee id data from the database...' );

    const conn = await db.getPool().getConnection();
    const query = 'select attendance_status_id from event_attendees where user_id = ? and event_id = ?';
    const [ rows ] = await conn.query( query ,  [[user_id], [values.id]]);
    conn.release();
    return rows;

};

exports.checkEvent = async function (values) {
    console.log( 'Request to check event from the database...' );

    const conn = await db.getPool().getConnection();
    const query = 'select * from event where id = ?';
    const [ rows ] = await conn.query (query, [values.event_id]);
    conn.release();
    return rows;

};

exports.patchEvents = async function (values, user_id) {
    console.log( 'Request to patch event from the database...' );
    var statusid;
    const result  = values.status;
    if (result == "accepted") {
        statusid = 1;
    } else if (result == "pending") {
        statusid = 2;
    } else if (result == "rejected") {
        statusid = 3
    } else {
        return null
    }
    const conn = await db.getPool().getConnection();
    const query = 'update event_attendees set attendance_status_id = ? where user_id = ? and event_id = ?';
    const [ rows ] = await (conn.query ( query, [[statusid], [user_id], [values.id]]));
    conn.release();
    return rows;

};

exports.getOrganizerId = async function (user_id) {
    console.log( 'Request to get organizerid from the database...' );

    const conn = await db.getPool().getConnection();
    const query = 'select organizer_id from event where organizer_id = ?';
    const [ rows ] = await (conn.query ( query, [user_id]));
    conn.release();
    return rows;

}