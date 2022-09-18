const db = require('../../config/db');
const passwords = require('password-hash');

exports.insertUser = async function(values) { // Insert new user into database
    console.log( `Request to insert new user into the database...` );

    const newpassword = await passwords.hash(values.password)
    const conn = await db.getPool().getConnection();
    const query = 'insert into user (first_name, last_name, email, password) values ( ? )';
    const [ result ] = await conn.query( query, [[[ values.firstName ], [ values.lastName ], [ values.email ], [ newpassword ]]] );
    conn.release();
    return result;
};

passwords.hash = async function (sql){
   return passwords.generate(sql);
}

exports.loginUser = async function(values, token) {

    const conn = await db.getPool().getConnection();
    const query = 'select * from user where email = ?';
    const [ result ] = await conn.query( query, [values.email]);
    conn.release();

    if (result.length != 0) {
        const query1 = 'select password from user where email = ?';
        const [ result1 ] = await conn.query( query1, [ values.email ]);
        conn.release();
        const pass = result1[0].password;
        const passwordT = passwords.verify(values.password, pass);

        if (passwordT === true) {
            const query2 = 'update user set auth_token = ? where email = ?';
            const [result2] = await conn.query(query2, [[token], [values.email]]);
            conn.release();
            return result;
        }
    }
};

exports.logoutUser = async function(token) {

    //const [[catchToken]] = await conn.query(`select * from user where auth_token = '${token}'`);
    const conn = await db.getPool().getConnection();
    const query = 'update user set auth_token = ? where auth_token = ?';
    const [ result ] = await conn.query( query, [[null], [token]]);
    conn.release();
    return result;

};


exports.getUserId = async function(id) {

    const conn = await db.getPool().getConnection();
    const query = 'select * from user where id = ?';
    const [ rows ] = await conn.query( query, [ id ] );
    conn.release();
    return rows;

};



exports.checkIdMatchToken = async function(id, token) {

    const conn = await db.getPool().getConnection();
    const query = 'select * from user where id = ? and auth_token = ? ';
    const [ rows ] = await conn.query( query, [[ id ], [ token ]]);
    conn.release();
    return rows;
};

exports.checkId = async function (id){

    const conn = await db.getPool().getConnection();
    const query = 'select * from user where id = ?';
    const [ rows ] = await conn.query( query, [ id ]);
    conn.release();
    return rows;

};

// exports.updateUserId = async function(req) {
//     const token = req.header('X-Authorization');
//     if(!token)
//         return 401;
//     const id = req.params.id
//     const body = req.body;
//     console.log (body)
//     let firstName = false;
//     let lastName = false;
//     let email = false;
//     let password = false;
//     let currentPassword = false;
//     if ("firstName" in body) {
//         if (typeof body.firstName === 'string' && body.firstName.length) {
//             firstName = true;
//         } else {
//             return 400;
//         }
//     };
//     if ("lastName" in body) {
//         if (typeof body.lastName === 'string' && body.lastName.length) {
//             lastName = true;
//         } else {
//             return 400;
//         }
//
//     };
//     if ("email" in body) {
//         if (typeof body.email === 'string' && body.email.length && body.email.indexOf("@") === -1) {
//             email = true;
//         } else {
//             return 400;
//         }
//     };
//     if ("password" in body && 'currentPassword' in body) {
//         if (typeof body.password === 'string') {
//             password.verify
//         }
//
//     };
//
//     if (firstName) {
//         const conn = await db.getPool().getConnection();
//         const query = 'update user set first_name = ?  where id = ?';
//         const [ rows ] = await conn.query( firstName, [ id ]);
//         conn.release();
//     };
//
//
// };
