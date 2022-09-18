const db = require('../../config/db');

exports.getAllEvents = async function() { // Get all Events from the Database
    console.log( 'Request to get all events from the database...' );

    const conn = await db.getPool().getConnection();
    const query = 'select * from event';
    const [ rows ] = await conn.query( query );
    conn.release();
    return rows;
};

exports.getOneEvent = async function(id) { // Get one Event from the Database
    console.log( `Request to get event ${id} from the database...` );

    const conn = await db.getPool().getConnection();
    const query = 'select * from event where id = ?';
    const [ rows ] = await conn.query( query, [ id ] );
    conn.release();
    return rows;
};

exports.getEventCategories = async function() { // Get all the Event Categories
    console.log( 'Request to get all events from the database...' );

    const conn = await db.getPool().getConnection();
    const query = 'select * from category';
    const [ rows ] = await conn.query( query );
    conn.release();
    return rows;
};

exports.deleteEvent = async function(id) { // Delete an Event
    console.log( 'Request to delete an event...' );

    const conn = await db.getPool().getConnection();
    const query = 'delete from event where id = (?)'
    const [ rows ] = await conn.query ( query, [ id ] );
    conn.release();
    return rows;

}

exports.insertEvent = async function(values) { // Insert event into database
    console.log( `Request to insert new event into the database...` );

    const conn = await db.getPool().getConnection();
    const query = 'insert into events (title, description, date, image_filename, is_online, url, ' +
        'venue, capacity, requires_attendance_control, fee, organizer_id) values ( ? )';

    const query1 = 'insert into event_category (category_id) values ( ? )';

    const [ result ] = await conn.query( query, query1, [ values.categoryIds ], [ values.title ], [ values.description ], [ values.date ],
        [ values.image_filename ], [ values.is_online ], [ values.url ], [ values.venue ], [ values.capacity ],
        [ values.requires_attendance_control ], [ values.fee ], [ values.orgransizer_id ]);
    conn.release();
    return result;
};
