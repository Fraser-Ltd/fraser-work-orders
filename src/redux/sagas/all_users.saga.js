import { put, takeEvery } from 'redux-saga/effects';
import Axios from 'axios';
import swal from 'sweetalert';

// worker Saga: will be fired on "REGISTER" actions
function* allUsersSaga() {
    yield takeEvery('GET_USERS', getUserSaga);
    yield takeEvery('UPDATE_USER', userUpdateSaga);
    yield takeEvery('UPDATE_USER_ADMIN', adminUpdateSaga);
    yield takeEvery('UPDATE_PASSWORD', updatePasswordSaga);
    yield takeEvery('FETCH_USERS', archiveEmployeeSaga);
}

// calls all users
function* getUserSaga(action) {
    try {
        const response = yield Axios.get('api/edit_user');
        yield swal("Success! New User Added.",
            { timer: 3500, buttons: false, icon: 'success' })
        yield put({ type: 'SET_USERS', payload: response.data })

    } catch (err) {
        console.log('ERROR loading users (getUserSaga)', err);
        yield swal("Oops! That didn't work. Please add user again!",
            { timer: 3500, buttons: false, icon: 'error' });
    }
}

function* userUpdateSaga(action) {
    try {
        yield Axios.put(`/api/edit_user/user`, action.payload);
        yield swal("Success! User Profile Updated.",
            { timer: 3500, buttons: false, icon: 'success' })
        yield put({ type: 'SET_USER_UPDATE' })
    } catch (err) {
        console.log('ERROR updating user (userUpdateSaga)', err);
        yield swal("Oops!", 'ERROR updating user (userUpdateSaga)',
            { timer: 3500, buttons: false, icon: 'error' });
    }
}

function* adminUpdateSaga(action) {
    try {
        yield Axios.put(`/api/edit_user/admin`, action.payload);
        yield swal("Success! User updated by Admin.",
            { timer: 3500, buttons: false, icon: 'success' });
        yield put({ type: 'GET_ADMIN_UPDATE' })

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
            { timer: 3500, buttons: false, icon: 'success' });
        yield put({ type: 'GET_PASSWORD' })
    } catch (err) {
        console.log('ERROR updating password (updatePasswordSaga)', err);
        yield swal("Oops!", 'ERROR updating password (updatePasswordSaga)',
            { timer: 3500, buttons: false, icon: 'error' });
    }
}
//delete
function* archiveEmployeeSaga(action) {
    try {//removes employee(s), SEND IN ONLY ID
        yield Axios.delete(`/api/edit_user/archiveEmployee ${action.payload}`);
        //refreshes the page
        yield put({ type: 'FETCH_USERS' });
    }
    catch (error) {
        console.log('ArchiveEmployee remove request in archiveEmployeeSaga failed', error);
    }
}

export default allUsersSaga;