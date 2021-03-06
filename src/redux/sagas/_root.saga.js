// Sagas hooked up 11/20 by all.


import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import allUsersSaga from './all_users.saga';
import workOrdersSaga from './work_orders.saga';
import propertiesSaga from './properties.saga';
import unitSaga from './unit.saga';
import reportsSaga from './reports.saga';


// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
    workOrdersSaga(),
    propertiesSaga(),
    unitSaga(),
    allUsersSaga(),
    reportsSaga(),
  ]);
}
