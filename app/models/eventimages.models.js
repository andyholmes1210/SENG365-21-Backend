const db = require('../../config/db');
const mime = require('mime');
const fs = require('mz/fs');

exports.getImageEvents = async function(id) { // Get image from Events from the Database
    console.log( 'Request to get event image from the database...' );

    const conn = await db.getPool().getConnection();
    const query = 'select image_filename from event where id = ?';
    const [ [rows] ] = await conn.query( query, [ id ] );
    conn.release();
    const photo = await fs.readFile('storage/images/' + rows.image_filename);
    return {photo: photo , type: mime.getType(rows.image_filename)} ;
};
