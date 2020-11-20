const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();




//(get)      api/work_orders/
        // get request for user with level 1 or below should recieve all work orders


        // get request for user with level 2 should get all work
        //        orders assinend to that maintenance person


        // get request for user with level 3 should get all work 
        //        orders in which they are assigned to the property as RC
        

// (post)      api/work_orders/
    // incoming body should look like:
    // {
    //     propertyId: value,
    //     dateAdded: value,
    //     permissionToEnter: value,
    //     emergency: value,
    //     workToBeDone: value,
    //     status: value,
    //     addedById: value,
    //     reac_inspection: value,
    //     remarks: value,
    //     unitId: value,
    //     tenantNotHome: value
    // }





// (put)      api/work_orders/
    // incoming body should look like:
    // {   
    //     permissionToEnter: value,
    //     doorHanger: value,
    //     emergency: value,
    //     workToBeDone: value,
    //     detailsOfWorkDone: value,
    //     timeIn: value,
    //     timeOut: value,
    //     status: value,
    //     assignedTo: value,
    //     reacInspection: value,
    //     smokeDetectors: value,
    //     housekeepingInspection: value,
    //     exterminating: value,
    //     remarks: value,
    //     unitId: value,
    //     tenantNotHome: value,
    //     dateCompleted: value
    // }





// (delete)    api/work_orders/:id

module.exports = router;