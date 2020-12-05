
import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

//reportsSaga will fire on "FETCH_REPORTS"

function* getReportsSaga(action){
    let id = action.payload.id;
    let start = action.payload.start;
    let end = action.payload.end;
    try{
        const response = yield axios.get(`api/reports/${id}/${start}/${end}`)
        yield put({type: 'SET_REPORT', payload: response.data})
    }catch(err) { console.log('error in getReportsSaga unit', err) }
}
function* reportsSaga(){
    yield takeLatest('FETCH_REPORTS', getReportsSaga);
}
export default reportsSaga;