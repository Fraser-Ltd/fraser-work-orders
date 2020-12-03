import { put, takeLatest } from "redux-saga/effects";
import Axios from "axios";
import swal from 'sweetalert';

function* getUnitListSaga(action) {
    try {
        const response = yield Axios.get("/api/units/");
        const actionToDispatch = {
            type: "SET_UNITS",
            payload: response.data,
        };
        yield put(actionToDispatch);
    }catch(err){
        console.log('error fetching units', err);
    }
}

function* addUnitSaga(action) {
    try {
        const response = yield Axios.post("/api/units", action.payload)
        yield swal('Successfully Added Unit', { timer: 1000, buttons: false, icon: 'success' });

        yield put({ type: 'FETCH_UNITS' })
    } catch (err) { 
        yield swal('Error Adding Unit', { timer: 3500, buttons: false, icon: 'error' });
        console.log('error fetching units', err) }
}

function* editUnitsSaga(action) {
    try {
        const response = yield Axios.put(`/api/units/`, action.payload);
        yield swal('Edit Successful', { timer: 1500, buttons: false, icon: 'success' });
        yield put({ type: "FETCH_UNITS" });
    } catch (err) {
        yield swal('Error Editing Unit', { timer: 3500, buttons: false, icon: 'error' });
        console.log('error editing unit', err)
    }
}

function* deleteSaga(action) {
    try {
        const response = yield Axios.delete(`/api/units/${action.payload}`);
    } catch (err) { console.log('error deleting unit', err) }

    const actionToDispatch = {
        type: "FETCH_UNITS",
    };
    yield put(actionToDispatch);
}

function* unitSaga() {
    yield takeLatest('FETCH_UNITS', getUnitListSaga);
    yield takeLatest('LOOSE_UNITS', deleteSaga);
    yield takeLatest('ADD_UNITS', addUnitSaga);
    yield takeLatest('EDIT_UNITS', editUnitsSaga);
}

export default unitSaga;