const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

// get route to /api/reports/1/2020-12-05/2020-12-10(year-month-day)
router.get('/:id/:start/:end', (req, res) => {
    
    let queryText = `SELECT COUNT(*) FROM "work_orders" WHERE "assigned_to" = $1 AND "date_completed" >= $2 AND "date_completed" <= $3;`

    pool.query(queryText, [req.params.id, req.params.start, req.params.end])
    .then(result => {res.send(result.rows), console.log('result.rows:', result.rows)})
    .catch(e => {
        console.log('error in report get route', e);
        res.sendStatus(500);
    });
})




module.exports = router;