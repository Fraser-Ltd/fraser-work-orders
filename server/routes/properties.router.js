const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET Route /api/properties/

router.get('/', (req, res) => {
  // GET route code here
});




//  (POST)  /api/properties/
//  Incomming body should look like this:
//      {
//        propertyName: value,
//        propertyAddress: value,
//        residentCoordinator: value,
//       }
router.post('/', (req, res) => {
  // POST route code here
});





//  (PUT)       /api/properties/:id
//  Incomming body should look like this:
//      {
//        propertyName: value,
//        propertyAddress: value,
//        residentCoordinator: value,
//       }



//  (DELETE)    /api/properties/:id


module.exports = router;
