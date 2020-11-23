import { put, takeLatest } from "redux-saga/effects";
import Axios from "axios";

function* getUnitListSaga(action) {
    const response = yield Axios.get("/api/units/");
    const actionToDispatch = {
        type: "SET_UNITS",
        payload: response.data,
    };
    yield put(actionToDispatch);
}

function* addUnitSaga(action) {
    try {
        const response = yield Axios.post("/api/units", action.payload)
        yield put({ type: 'FETCH_UNITS'})
    } catch (err) {console.log('error fetching units', err)}    
}

function* editUnitsSaga(action) {
    try {
        const response = yield Axios.put(`/api/units/`, action.payload);
        yield put({ type: "FETCH_ITEMS" });
    } catch(err) {
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