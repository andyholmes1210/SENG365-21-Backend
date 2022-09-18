const db = require('../../config/db');
const mime = require('mime');
const fs = require('mz/fs');

exports.getImageUsers = async function (id) { // Get image from Users from the Database
    console.log( 'Request to get user image from the database...' );

    const conn = await db.getPool().getConnection();
    const query = 'select image_filename from user where id = ?';
    const [ [rows] ] = await conn.query( query, [ id ] );
    conn.release();
    const photo = await fs.readFile('storage/images/' + rows.image_filename)
    return {photo: photo , type: mime.getType(rows.image_filename)};
};


exports.deleteUserImage = async function (values) { // Delete user image from the database
    console.log( 'Request to delete user image from the database...' );

    const conn = await db.getPool().getConnection();
    const query = 'update user set image_filename = ? where id = ?';
    const [rows] = await conn.query( query, [[null], [values]]);
    conn.release();
    return rows;
}