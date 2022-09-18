const db = require('../../config/db');

exports.loginRequired = async function (req, res, next) {
    const token = req.header('X-Authorization');

    try {
        const result = await findUserIdbyToken(token);
        if (result === null) {
            res.statusMessage = 'Unauthorized';
            res.status(401)
                .send();
        } else {
            req.authenticatedUserId = result.toString();
            next();
        }

    } catch (err) {
        if (!err.hasBeenLogged) console.error(err);
        res.statusMessage = 'Internal Server Error';
        res.status(500)
            .send();
    }
};

findUserIdbyToken = async function (values) {

    const conn = await db.getPool().getConnection();
    const query = 'select id from user where auth_token = ?';
    const [ result ] = await conn.query( query, [values]);
    //console.log(result[0].id);
    if (result.length === 0){
        return null
    } else {
        return result[0].id;
    }

};