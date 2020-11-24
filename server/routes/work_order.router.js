const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

//(get)      api/work_orders/
router.get('/', rejectUnauthenticated, (req, res) => {
    const role = req.user.role;
    console.log('req.user:',req.user);
    let queryText = '';
    if(role === null){res.sendStatus(403);
    }
    else if (role <= 1 && role != null) {// get request for user with level 1 or below should recieve all work orders
        queryText = `SELECT * FROM "work_orders" WHERE "status" != 'complete'`;
        pool.query(queryText)
        .then(result => res.send(result.rows))
        .catch(error => {
            console.log('error getting work orders for level 1', error);
            res.sendStatus(500);
        })
    } else if (role === 2) {//user with level 2 should get all work orders assinend to that maintenance person
        queryText = `SELECT * FROM "work_orders" WHERE "assigned_to" = $1 AND "status" != 'complete'`;
        pool.query(queryText,[req.user.id])
        .then(result => res.send(result.rows))
        .catch(error => {
            console.log('error getting work orders for level 2', error);
            res.sendStatus(500);
        })
    } else if (role === 3) {//user with level 3 should get all work orders in which they are assigned to the property as RC
        queryText = `SELECT "work_orders"."id", "property_id", "date_added", "permission_to_enter",
            "door_hanger", "emergency", "work_to_be_done", "details_of_work_done", "time_in", "time_out",
            "status", "assigned_to", "added_by_id", "reac_inspection", "smoke_detectors", 
            "housekeeping_inspection", "exterminating", "remarks" FROM "work_orders" 
            JOIN "properties" ON "properties"."id" = "work_orders"."property_id" 
            WHERE "status" != 'complete' AND "resident_coordinator" = $1`;
        pool.query(queryText,[req.user.id])
        .then(result => res.send(result.rows))
        .catch(error => {
            console.log('error getting work orders for level 3', error);
            res.sendStatus(500);
        })
    }
});

//(get) api/work_orders/complete
router.get('/complete', rejectUnauthenticated, (req, res) => {
    let queryText = ''; 
        queryText = `SELECT * FROM "work_orders" WHERE "status" = 'complete'`;
    pool.query(queryText).then(result => res.send(result.rows)).catch(error => {
        console.log('error getting completed work orders for level 1', error);
        res.sendStatus(500);
    })
})
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
//     reacInspection: value,
//     remarks: value,
//     unitId: value,
//     tenantNotHome: value
// }
router.post('/', rejectUnauthenticated, (req, res) =>{
    console.log(req.body);
    console.log('in workOrderRouter')
    const { propertyId, dateAdded, permissionToEnter, emergency,
        workToBeDone, status, addedById, reacInspection, remarks, unitId, tenantNotHome} = req.body
    const queryText = `INSERT INTO "work_orders" (property_id, date_added, permission_to_enter, emergency,
         work_to_be_done, status, added_by_id, reac_inspection, remarks, unit_id, tenant_not_home)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`;
    pool
        .query(queryText, [propertyId, dateAdded, permissionToEnter, emergency,
            workToBeDone, status, addedById, reacInspection, remarks, unitId, tenantNotHome])
        .then(() => res.sendStatus(201))
        .catch((err) => {
            console.log("Error in workOrderRouter POST", err)
            res.sendStatus(500)
        });
});

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
router.put('/', rejectUnauthenticated, (req, res) => {
    console.log('in workOrderRouter')
    const { permissionToEnter, doorHanger, emergency,
        workToBeDone, detailsOfWorkDone, status, assignedTo, reacInspection, smokeDetectors, 
        housekeepingInspection, exterminating, remarks, unitId, tenantNotHome, priority, workOrderId } = req.body
    const queryText = `UPDATE "work_orders" SET "permission_to_enter"=$1, "door_hanger"=$2, "emergency"=$3,
        "work_to_be_done"=$4, "details_of_work_done"=$5, "status"=$6, "assigned_to"=$7, 
        "reac_inspection"=$8, "smoke_detectors"=$9, "housekeeping_inspection"=$10, "exterminating"=$11, 
        "remarks"=$12, "unit_id"=$13, "tenant_not_home"=$14, "priority"=$15 
        WHERE "id"=$16`;
    pool
        .query(queryText, [permissionToEnter, doorHanger, emergency,
            workToBeDone, detailsOfWorkDone, status, assignedTo,
            reacInspection, smokeDetectors, housekeepingInspection, exterminating,
            remarks, unitId, tenantNotHome, priority, workOrderId])
        .then(() => res.sendStatus(201))
        .catch((err) => {
            console.log("Error in workOrderRouter POST", err)
            res.sendStatus(500)
        });
});

// This will update the time in on the workOrder
router.put('/timeIn', (req, res) => {
    console.log ('Clocked In', req.body);
    let queryText = 
    `UPDATE "work_orders" SET 
    "time_in" = NOW()
     WHERE "id" = $1`;
    pool.query(queryText, [req.body.workOrderId])
    .then(result => res.sendStatus(200)).catch(err => {
        console.log('ERROR in put timeIn', err);
        res.sendStatus(500);
    });
});

// This will update the time out on the workOrder
router.put('/timeOut', (req, res) => {
    console.log ('Clocked Out', req.params);
    let queryText = 
    `UPDATE "work_orders" SET 
    "time_out" = NOW()
     WHERE id = $1`;
    pool.query(queryText, [req.body.workOrderId])
    .then(result => res.sendStatus(200)).catch(err => {
        console.log('ERROR in put timeOut', err);
        res.sendStatus(500);
    });
});

// This will update the date work order was complete
router.put('/dateCompleted', (req, res) => {
    console.log ('Work Order Complete', req.params);
    let queryText = 
    `UPDATE "work_orders" SET 
    "date_completed" = NOW()
     WHERE id = $1`;
    pool.query(queryText, [req.body.workOrderId])
    .then(result => res.sendStatus(200)).catch(err => {
        console.log('ERROR in put dateCompleted', err);
        res.sendStatus(500);
    });
});

// (delete)    api/work_orders/:id
router.delete('/:id', rejectUnauthenticated, (req, res) => {
    console.log(req.params);
        let queryText = `DELETE FROM "work_orders" WHERE "id"=$1;`;
        pool.query(queryText, [req.params.id])
            .then(function (result) {
                res.send('Successfully Deleted work order'); // 200
            }).catch(function (err) { 
                console.log('Error making DELETE query:', queryText, err);
                // send a SERVER ERROR 500 because things went wrong
                res.sendStatus(500);
            });
    });
module.exports = router;