import * as actions from "../Actions/index";
import { put, call } from 'redux-saga/effects';
import axios from 'axios';
import { TokenStorage } from "../../Queries/Utilities/TokenStorage";

export function* handleAuthenticateUser(action: any) {
    yield put(actions.authenticateUsersStart());
    try {
        const response = yield call(axios.post, 'https://kqfymcgiok.execute-api.eu-west-2.amazonaws.com/v1/api/login', { email: action.user.username, password: action.user.password });
        yield put(actions.authenticateUserSuccess(response.data));
        TokenStorage.storeToken(response.data.token);
    } catch (error) {
        yield put(actions.authenticateUsersFail('An error occurred while logging in'));
    }
}
