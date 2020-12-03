const express = require('express');
const { rejectUnauthenticated, } = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');

const router = express.Router();

// Allows are users to be viewed but not their passwords, Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {

  let queryText = `SELECT "user"."id", "user"."username", "user"."role", "user"."email", "user"."first_name", "user"."last_name", "user"."archive_employee" 
                      FROM "user" WHERE "archive_employee"='false';`


  pool.query(queryText).then(result => res.send(result.rows)).catch(err => {
    console.log('ERROR in GET to /', err);
    res.send(req.user);
  });
});

// This put is just for the maintenance and RC (they can't change their own role)
router.put('/user', rejectUnauthenticated, (req, res) => {
  console.log('user updated', req.body);
  console.log('req.params', req.params)
  let queryText = `UPDATE "user" SET "username"=$1, "first_name"=$2, "last_name"=$3, "email"=$4  WHERE "id"=$5;`;
  pool.query(queryText, [req.body.userName, req.body.firstName, req.body.lastName, req.body.email, req.body.id])
    .then(result => res.sendStatus(200)).catch(err => {
      console.log('ERROR in PUT user edit_user', err);
      res.sendStatus(500);
    });
});

// This put is just for the admin (they CAN change staff's role)
router.put('/admin', rejectUnauthenticated, (req, res) => {
  console.log('admin updated user', req.body);
  let queryText = `UPDATE "user" SET "username"=$1, "first_name"=$2, "last_name"=$3, "email"=$4, "role"=$5, "archive_employee"=$6 WHERE "id"=$7;`;
  pool.query(queryText, [req.body.username, req.body.firstName, req.body.lastName, req.body.email, req.body.role, req.body.archiveEmployee, req.body.id])
    .then(result => res.sendStatus(200)).catch(err => {
      console.log('ERROR in PUT admin edit_user', err);
      res.sendStatus(500);
    });
});

// this route will be used to update a users password the password should be run through 
// passport to hash and salt it before it is stored in the DB
router.put('/password', rejectUnauthenticated, (req, res) => {
  console.log('attempting to update password', req.body)
  const password = encryptLib.encryptPassword(req.body.password);

  const queryText = `UPDATE "user"  SET "password"=$1 WHERE "id"=$2`;
  pool
    .query(queryText, [password, req.body.id])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('ERROR in PUT change password', err);
      res.sendStatus(500);
    });
});



//const password = encryptLib.encryptPassword(req.body.password);
// {
// password: value
// }

module.exports = router;