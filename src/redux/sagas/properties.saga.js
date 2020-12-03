import { put, takeLatest } from "redux-saga/effects";
import Axios from "axios";
import swal from 'sweetalert';

function* getPropertySaga(action) {
    const response = yield Axios.get("/api/properties/");
    const actionToDispatch = {
        type: "SET_PROPERTY",
        payload: response.data,
    };
    yield put(actionToDispatch);
}

function* addPropertySaga(action) {
    try {
        const response = yield Axios.post("/api/properties/", action.payload)
        yield swal('Successfully Added New Property', { timer: 1500, buttons: false, icon: 'success' });
        yield put({ type: 'FETCH_PROPERTY'})
    } catch (err) {
        yield swal('Error Adding Property', { timer: 3500, buttons: false, icon: 'error' });
        console.log('error fetching units', err)}    
}

function* editPropertySaga(action) {
    console.log('in editPropertySaga', action.payload);
    try {
        yield Axios.put(`/api/properties/`, action.payload);
        yield swal('Edit Property Successful', { timer: 1500, buttons: false, icon: 'success' });
        yield put({ type: "FETCH_PROPERTY" });
    } catch(err) {
        yield swal('Error Editing Property', { timer: 3500, buttons: false, icon: 'error' });
        console.log('error editing unit', err)
    }
}

function* deletePropertySaga(action) {
    console.log('in deleteProperties', action.payload);
    try {
        yield Axios.delete(`/api/properties/${action.payload}`);
        yield put({type: 'SET_PROPERTY'})
    } catch (err) { console.log('error deleting unit', err) }

    const actionToDispatch = {
        type: "FETCH_PROPERTY",
    };
    yield put(actionToDispatch);
    }

function* propertiesSaga() {
    yield takeLatest('FETCH_PROPERTY', getPropertySaga);
    yield takeLatest('LOOSE_PROPERTY', deletePropertySaga);
    yield takeLatest('ADD_PROPERTY', addPropertySaga);
    yield takeLatest('EDIT_PROPERTY', editPropertySaga);
}

export default propertiesSaga;