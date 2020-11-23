const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated, } = require('../modules/authentication-middleware');

// GET Route /api/units/
// Will deliver the entire unit list

router.get("/", rejectUnauthenticated, (req, res) => {

  const queryText = `SELECT * FROM "units"`;
  pool
    .query(queryText)
    .then((result) => res.send(result.rows))
    .catch((err) => {
      console.log('Error in units GET request', err);
      res.sendStatus(500);
    })
});


//  (POST)  /api/properties/
//  Incomming body should look like this:
//      {
//        property_ID: value,
//        property_Unit: value,
//       }

router.post("/", rejectUnauthenticated, (req, res) => {

  const propertyName = req.body.property_ID
  const unitNumber = req.body.property_Unit
  const queryText = `INSERT INTO "units" ("unit", "property_id") 
                      VALUES ($1, $2)`;
  pool
    .query(queryText, [unitNumber, propertyName])
    .then((result) => res.sendStatus(200))
    .catch((err) => {
      console.log('Error in unit POST route', err);
      res.sendStatus(500);
    })
});

//  (PUT)       /api/properties/:id
//  Incomming body should look like this:
//      { id: value,
//        property_ID: value,
//        property_Unit: value,}

router.put('/', rejectUnauthenticated, (req, res) => {

  const id = req.body.id
  const propertyName = req.body.property_ID
  const unitNumber = req.body.property_Unit

  let queryText = `UPDATE "units" SET "unit" = $1 "property_id" = $2
                 WHERE "id" =$3`
  pool.query(queryText, [unitNumber, propertyName, id])
    .then(result => {
      res.sendStatus(204);
    })
    .catch(err => {
      console.log('Error in unit PUT route', err);
      res.sendStatus(500);
    })
})

//  (DELETE)    /api/properties/:id

router.delete('/:id', (req, res) => {
  let queryText = `DELETE FROM "units" WHERE id=$1`;
  pool.query(queryText, [req.params.id])
    .then(result => {
      res.send('Succesfully Deleted Unit');
    }).catch((err) => {
      console.log('Error in unit DELETE route', err);
      res.sendStatus(500);
    })
})

module.exports = router;