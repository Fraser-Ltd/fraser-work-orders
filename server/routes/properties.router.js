const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated, } = require('../modules/authentication-middleware');

// GET Route /api/properties/
// Will deliver the entire property list

router.get("/", rejectUnauthenticated, (req, res) => {

  const queryText = `SELECT "properties"."id", "property_name", "property_address", "resident_coordinator", CONCAT("first_name", ' ',  "last_name") as "rc_name" FROM "properties"
  JOIN "user" ON "user"."id" = "properties"."resident_coordinator" ORDER BY "properties"."id" ASC`;
  pool
    .query(queryText)
    .then((result) => res.send(result.rows))
    .catch((err) => {
      console.log('Error in properties GET request', err);
      res.sendStatus(500);
    })
});


//  (POST)  /api/properties/
//  Incomming body should look like this:
//      {
//        propertyName: value,
//        propertyAddress: value,
//        residentCoordinator: value,
//       }

router.post("/", rejectUnauthenticated, (req, res) => {

  const propertyName = req.body.propertyName
  const propertyAddress = req.body.propertyAddress
  const residentCoordinator = req.body.residentCoordinator
  const queryText = `INSERT INTO "properties" ("property_name", "property_address", "resident_coordinator")
                      VALUES ($1, $2, $3)`;
  pool
    .query(queryText, [propertyName, propertyAddress, residentCoordinator])
    .then((result) => res.sendStatus(200))
    .catch((err) => {
      console.log('Error in property POST route', err);
      res.sendStatus(500);
    })
});

//  (PUT)       /api/properties/:id
//  Incomming body should look like this:
//      {
//        propertyName: value,
//        propertyAddress: value,
//        residentCoordinator: value,
//       }

router.put('/', rejectUnauthenticated, (req, res) => {

  const propId = req.body.id
  const propName = req.body.propertyName
  const propAdd = req.body.propertyAddress
  const propRes = req.body.residentCoordinator

  let queryText = `UPDATE "properties" SET "property_name" = $1, "property_address" = $2, "resident_coordinator" = $3
                 WHERE "id" =$4`
  pool.query(queryText, [propName, propAdd, propRes, propId])
    .then(result => {
      res.sendStatus(204);
    })
    .catch(err => {
      console.log('Error in property PUT route', err);
      res.sendStatus(500);
    })
})

//  (DELETE)    /api/properties/:id

router.delete('/:id', rejectUnauthenticated, (req, res) => {
  let queryText = `DELETE FROM "properties" WHERE id=$1`;
  pool.query(queryText, [req.params.id])
    .then(result => {
      res.send('Succesfully Deleted Property');
    }).catch((err) => {
      console.log('Error in property DELETE route', err);
      res.sendStatus(500);
    })
})

module.exports = router;
