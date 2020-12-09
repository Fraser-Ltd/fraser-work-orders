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
function* getUserSaga(action) {
    try {
        const response = yield Axios.get('api/edit_user');
        yield put({ type: 'SET_USERS', payload: response.data })

    } catch (err) {
        console.log('ERROR loading users (getUserSaga)', err);
    }
}

function* userUpdateSaga(action) {
    try {
        yield Axios.put(`/api/edit_user/user`, action.payload);
        yield swal("Success! User Profile Updated.",
            { timer: 1500, buttons: false, icon: 'success' })
        yield put({ type: 'FETCH_USER' })
    } catch (err) {
        console.log('ERROR updating user (userUpdateSaga)', err);
        yield swal("Oops!", 'ERROR updating user (userUpdateSaga)',
            { timer: 3500, buttons: false, icon: 'error' });
    }
}

function* adminUpdateSaga(action) {//This also archives users when employee status is changed to REMOVED
    try {
        yield Axios.put(`/api/edit_user/admin`, action.payload);
        yield swal("Success! User updated by Admin.",
            { timer: 1500, buttons: false, icon: 'success' });
        yield put({ type: 'GET_USERS' })

    } catch (err) {
        console.log('ERROR updating user (adminUpdateSaga)', err);
        yield swal("Oops!", 'ERROR updating user (adminUpdateSaga)',
            { timer: 3500, buttons: false, icon: 'error' });
    }
}

function* updatePasswordSaga(action) {
    try {
        yield Axios.put(`/api/edit_user/password`, action.payload);
        yield swal("Success! Password Updated.",
            { timer: 1500, buttons: false, icon: 'success' });
        yield put({ type: 'GET_USERS' })
    } catch (err) {
        console.log('ERROR updating password (updatePasswordSaga)', err);
        yield swal("Oops!", 'ERROR updating password (updatePasswordSaga)',
            { timer: 3500, buttons: false, icon: 'error' });
    }
}

export default allUsersSaga;