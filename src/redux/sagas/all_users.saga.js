import { put, takeEvery } from 'redux-saga/effects';
import Axios from 'axios';
import swal from 'sweetalert';

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
        yield put({ type: 'GET_USERS' })

        // swal("Oops! That didn't work. The username might already be taken. Try again!",
        //     { timer: 3500, buttons: false, icon: 'error' });
    }catch(err){console.log('ERROR updating user (admin)', err);}
}

function* updatePasswordSaga(action){
    try{
        yield Axios.put(`/api/edit_user/password`, action.payload);
        yield put({type:'GET_USERS'})
    }catch(err){console.log('ERROR updating password', err);}
}

export default allUsersSaga;