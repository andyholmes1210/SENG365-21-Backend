const user = require('../models/users.model');
const randtoken = require('rand-token').generator();

exports.createuser = async function(req, res) { // Create user
    console.log('\nRequest to create a new user...');
    const password = req.body.password;
    const email = req.body.email;

    if (email.indexOf("@") === -1) {
        res.status(400)
            .send('Email must contain @');
    } else if (password.length === 0) {
        res.status(400)
            .send('Password cannot be empty');
    } else {
        try {
            const userid = await user.insertUser(req.body)
            console.log(`User ${userid.insertId} is successfully added`);
            res.status(201)
                .send({userId: userid.insertId});
        } catch (err) {
            if (err.errno === 1062 || err.code === 'ER_DUP_ENTRY')
            {
                res.status(400)
                    .send('Email already in use, please try again');

            } else {
                res.status(500)
                    .send('Internal Server Error');
            }

        }
    }
};

exports.loginuser = async function(req, res) { // Login user into the database
    console.log('\nRequest to login a user...');
    const token = randtoken.generate(32);
    try {
        const userid = await user.loginUser(req.body, token);
        if (userid) {
            res.header('X-Authorization', token);
            res.statusMessage = 'Login Successful';
            res.status(200)
                .send({userId: userid[0].id, token: token});

        } else {
            res.statusMessage = 'Not Found';
            res.status(400)
                .send();
        }
    } catch {
        res.status(500)
            .send('Internal Server Error')
    }

};

exports.logoutuser = async function(req, res) { // Logout user from database
    console.log('\nRequest to logout a user...');

    const token = req.header('X-Authorization');

    try {
        await user.logoutUser(token);
        const tokennull = null;
        res.header('X-Authorization', tokennull);
        res.status(200)
            .send('Logout Successful');
    } catch (err) {
        res.status(500)
            .send(`Internal Server Error ${err}`)
    }
};



exports.getuserid = async function(req, res) { // Get the user Id

    const token = req.header('X-Authorization');
    const id = req.params.id;
    const userpass = await user.checkId(id);
    const authpass = await user.checkIdMatchToken(id, token);
    console.log(userpass);
    console.log(authpass);

    if (userpass != 0) {
        if (authpass != 0) {
            try{
                const result1 = await user.getUserId(id);
                res.statusMessage = 'OK';
                res.status(200)
                    .send({firstName: result1[0].first_name, lastName: result1[0].last_name, email: result1[0].email});

            } catch (err) {
                res.status(500)
                    .send('Internal Server Error');
            }
        } else {
            const result2 = await user.getUserId(id);
            res.statusMessage = 'OK';
            res.status(200)
                .send({firstName: result2[0].first_name, lastName: result2[0].last_name});
        }
    } else {
        res.status(404)
            .send('Not Found');
    }
};

// exports.updateUserId = async function (req, res) {
//     const response = await user.updateUserId (req)
//
// };
