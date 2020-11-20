const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//(get)      api/work_orders/
router.get('/', (req, res) => {
    const role = req.user.role;
    let queryText = '';
    if (role <= 1) {// get request for user with level 1 or below should recieve all work orders
        queryText = `SELECT * FROM "work_orders" WHERE "status" != 'complete'`;
        pool.query(queryText).then(result => res.send(result.rows)).catch(error => {
            console.log('error getting work orders for level 1', error);
            res.sendStatus(500);
        })
    } else if (role === 2) {//user with level 2 should get all work orders assinend to that maintenance person
        queryText = `SELECT * FROM "work_orders" WHERE "assigned_to" = $1 && "status" != 'complete'`;
        pool.query(queryText,[req.user.id]).then(result => res.send(result.rows)).catch(error => {
            console.log('error getting work orders for level 2', error);
            res.sendStatus(500);
        })
    } else if (role === 3) {//user with level 3 should get all work orders in which they are assigned to the property as RC
        queryText = `SELECT * FROM "work_orders" 
                        JOIN "properties" ON "properties"."id" = "work_orders"."property_id"
                        WHERE "status" != 'complete' AND "resident_coordinator" = $1`;
        pool.query(queryText,[req.user.id]).then(result => res.send(result.rows)).catch(error => {
            console.log('error getting work orders for level 3', error);
            res.sendStatus(500);
        })
    }
});

//(get) api/work_orders/complete




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
//     dateCompleted: value,
//     priorty: value
// }





// (delete)    api/work_orders/:id

module.exports = router;