const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();




//(get)      api/work_orders/getWorkOrder
        // get request for user with level 1 or below shoudl recieve all work orders
        // get request for user with level 2 should get all work
        //        orders assinend to that maintenance person
        // get request for user with level 3 should get all work 
        //        orders in which they are assigned to the property as RC
        

// (post)      api/work_orders/createWorkOrder





// (put)      api/work_orders/editWorkOrder






// (delete)    api/work_orders/deleteWorkOrder/:id

module.exports = router;