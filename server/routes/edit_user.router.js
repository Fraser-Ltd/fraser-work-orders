const express = require('express');
const pool = require('../modules/pool');
const encryptLib = require('../modules/encryption');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


//(get) /api/edit_user
// this should get all users in the user table , however DO NOT send the password.
// router.get('/', rejectUnauthenticated, (req, res) => {
//     // Send back user object from the session (previously queried from the database)
//     res.send(req.user);
// });

//(put) /api/edit_user/:id
// This put is just for the maintenance and RC (they can't change their own role)
// req.body will look like this
//  {
//  username: value,
//  email: value,
//  first_name: value,
//  last_name: value
//  }

//(put) /api/edit_user/admin/:id
// This put is just for the admin (they can change staff's role)
// req.body will look like this
//  {
//  username: value,
//  email: value,
//  role: value,
//  first_name: value,
//  last_name: value
//  }

//(put) /api/edit_user/password/:id
// this route will be used to update a users password the password should be run through 
// passport to hash and salt it before it is stored in the DB
//const password = encryptLib.encryptPassword(req.body.password);
// {
// password: value
// }


//(delete) /api/edit_user/:id



module.exports = router;