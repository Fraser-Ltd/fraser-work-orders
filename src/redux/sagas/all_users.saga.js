import { put, takeEvery } from 'redux-saga/effects';
<<<<<<< HEAD
import axios from 'Axios';
=======
import Axios from 'axios';
>>>>>>> b649f99f31be71fd1ff4d5be6e7bc7bfed9974fd

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
        const response = yield Axios.get('api/edit_user');
        yield put({type:'SET_USERS', payload: response.data})
    }catch(err){console.log('ERROR loading users', err);}
}

function* userUpdateSaga(action){
    try{
        yield Axios.put(`/api/edit_user/user`, action.payload);
        yield put({type:'GET_USERS'})
    }catch(err){console.log('ERROR updating user (user)', err);}
}

function* adminUpdateSaga(action){
    try{
        yield Axios.put(`/api/edit_user/admin`, action.payload);
        yield put({type:'GET_USERS'})
    }catch(err){console.log('ERROR updating user (admin)', err);}
}

function* updatePasswordSaga(action){
    try{
        yield Axios.put(`/api/edit_user/password`, action.payload);
        yield put({type:'GET_USERS'})
    }catch(err){console.log('ERROR updating password', err);}
}

export default allUsersSaga;