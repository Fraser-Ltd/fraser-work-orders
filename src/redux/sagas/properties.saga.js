import { put, takeLatest } from "redux-saga/effects";
import Axios from "axios";

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
        yield put({ type: 'FETCH_PROPERTY'})
    } catch (err) {console.log('error fetching units', err)}    
}

function* editPropertySaga(action) {
    try {
        const response = yield Axios.put(`/api/properties/`, action.payload);
        yield put({ type: "FETCH_PROPERTY" });
    } catch(err) {
        console.log('error editing unit', err)
    }
}

function* deletePropertySaga(action) {
    try {
        const response = yield Axios.delete(`/api/properties/${action.payload}`);
    } catch (err) { console.log('error deleting unit', err) }

    const actionToDispatch = {
        type: "FETCH_PROPERTY",
    };
    yield put(actionToDispatch);
    }

function* propertiesSaga() {
    yield takeLatest('FETCH_UNITS', getPropertySaga);
    yield takeLatest('LOOSE_UNITS', deletePropertySaga);
    yield takeLatest('ADD_UNITS', addPropertySaga);
    yield takeLatest('EDIT_UNITS', editPropertySaga);
}

export default propertiesSaga;