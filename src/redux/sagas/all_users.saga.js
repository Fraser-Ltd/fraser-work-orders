import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "REGISTER" actions
function* allUsersSaga() {
    yield takeEvery('GET_USERS', getUserSaga);
    yield takeEvery('UPDATE_USER', userUpdateSaga);
    yield takeEvery('UPDATE_USER_ADMIN', adminUpdateSaga);
    yield takeEvery('UPDATE_PASSWORD', updatePasswordSaga);
}

// calls all users
function* getUserSaga(action){
    try{
        const response = yield Axios.get('api/');
        yield put({type:'SET_USERS', payload: response.data})
    }catch(err){console.log('ERROR loading users', err);}
}

function* userUpdateSaga(action){
    try{
        yield Axios.put(`/api/user`, action.payload);
        yield put({type:'GET_USERS'})
    }catch(err){console.log('ERROR updating user (user)', err);}
}

function* adminUpdateSaga(action){
    try{
        yield Axios.put(`/api/admin`, action.payload);
        yield put({type:'GET_USERS'})
    }catch(err){console.log('ERROR updating user (admin)', err);}
}

function* updatePasswordSaga(action){
    try{
        yield Axios.put(`/api/password`, action.payload);
        yield put({type:'GET_USERS'})
    }catch(err){console.log('ERROR updating password', err);}
}

export default allUsersSaga;