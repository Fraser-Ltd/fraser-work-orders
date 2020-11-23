// Boilerplate installed 11/20

import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// workOrdersSaga: will be fired on "FETCH_WORKORDERS" actions
function* getWorkOrders(){
    try{
        const response = yield axios.get('api/work_orders')
        yield put({ type: 'SET_WORKORDERS', payload: response.data})
    }catch (error){
        console.log('Error in getWorkOrders saga', error);
    }
}
//another get for completed w/o's
function* getCompletedWorkOrders() {
    try {
        console.log('in getCompletedWorkOrders saga');
        const response = yield axios.get('api/work_orders/completed')//IS THIS THE CORRECT ENDPOINT??
        yield put({ type: 'SET_COMPLETEDWORKORDERS', payload: response.data })
    } catch (error) {
        console.log('Error in getWorkOrders saga', error);
    }
}
//post
function* addWorkOrders(action) {
    try {
        console.log('in addWorkOrders saga');
        yield axios.post('api/work_orders/list', action.payload)
        yield put({ type: 'FETCH_WORKORDERS' })//Refreshes list after new work order is submitted
    } catch (error) {
        console.log('Error in addWorkOrders saga', error);
    }
}
//put
function* updateWorkOrders(action) {
    try {
        console.log('in updateWorkOrders saga');
        yield axios.put('/api/work_orders', action.payload);
        yield put({ type: 'FETCH_WORKORDERS' });//updating the db
    }
    catch (error) {
        console.log('updateWorkOrders PUT request in failed', error);
    }
}
//delete
function* removeWorkOrders(action) {
    try {//removes workOrders from the database, SEND IN ONLY ID
        yield axios.delete(`/api/work_orders/${action.payload}`);
        //refreshes the page
        yield put({ type: 'FETCH_WORKORDERS' });
    }
    catch (error) {
        console.log('Work_OrdersSaga delete request in removeWorkOrder failed', error);
    }
}
function* timeIn(action){
    try {
        yield axios.put('api/work_orders/timeIn', action.payload);
        yield put({ type: 'FETCH_WORKORDERS'});
    }catch (error) {
        console.log("TimeIn SAGA failed", error);
    }
}
function* timeOut(action) {
    try {
        yield axios.put('api/work_orders/timeOut', action.payload);
        yield put({ type: 'FETCH_WORKORDERS' });
    } catch (error) {
        console.log("TimeOut SAGA failed", error);
    }
}
function* dateCompleted(action) {
    try {
        yield axios.put('api/work_orders/dateCompleted', action.payload);
        yield put({ type: 'FETCH_WORKORDERS' });
    } catch (error) {
        console.log("DateCompleted SAGA failed", error);
    }
}


function* workOrdersSaga() {
    yield takeLatest('FETCH_WORKORDERS', getWorkOrders);
    yield takeLatest('SET_TIMEIN', timeIn);
    yield takeLatest('SET_TIMEOUT', timeOut); 
    yield takeLatest('SET_DATECOMPLETED', dateCompleted);
    yield takeLatest('FETCH_COMPLETEDWORKORDERS', getCompletedWorkOrders);
    yield takeLatest('ADD_WORKORDER', addWorkOrders); 
    yield takeLatest('REMOVE_WORKORDERS', removeWorkOrders);
    yield takeLatest('UPDATE_WORKORDERS', updateWorkOrders);
}

export default workOrdersSaga;