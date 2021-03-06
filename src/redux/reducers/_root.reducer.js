import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import allUsers from './all_users.reducer';
import properties from './properties.reducer';
import workOrders from './work_orders.reducer';
import completedWorkOrders from './completedWorkOrders.reducer';
import units from './units.reducer';
import reports from './reports.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  allUsers, //
  properties, // will link resident coordinators to their assigned property
  workOrders, // will house work order details
  completedWorkOrders,  //will allow user to view completed work orders
  units,//will house all units
  reports

});

export default rootReducer;
