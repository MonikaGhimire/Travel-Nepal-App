import { takeEvery } from 'redux-saga/effects';
import { handleAuthenticateUser } from './userSaga';
import * as ActionTypes from '../Actions/ActionTypes';

export function* watchAuth() {
    yield takeEvery(ActionTypes.AUTHENTICATE_USER, handleAuthenticateUser);
};