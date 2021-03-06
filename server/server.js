
const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const editUserRouter = require('./routes/edit_user.router');
const propertiesRouter = require('./routes/properties.router');
const workOrdersRouter = require('./routes/work_order.router');
const unitsRouter = require('./routes/units.router');
const reportRouter = require('./routes/report.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/reports', reportRouter);
app.use('/api/user', userRouter);
app.use('/api/edit_user', editUserRouter);
app.use('/api/properties', propertiesRouter);
app.use('/api/work_orders', workOrdersRouter);
app.use('/api/units', unitsRouter)

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
