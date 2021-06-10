import * as ActionTypes from "../Actions/ActionTypes";
import { updateObject } from '../utility';
import { extractToken } from "../../TokenService/TokenService";

const initialState = {
    userInfo: null,
    authenticated: false,
    loading: false,
    token: {},
    error: "",
};

const onAuthenticateUserStart = (state: any, action: any) => {
    return updateObject(state, {
        userInfo: null,
        authenticated: false,
        loading: true,
        token: {},
        error: "",
    });
};

const onAuthenticateUser = (state: any, action: any) => {
    const userInfo = action.token.token ? extractToken(action.token.token) : extractToken(action.token);
    return updateObject(state, {
        userInfo: userInfo,
        token: action.token,
        loading: false,
        authenticated: true,
        error: "",
    });
};

const onAuthenticateUserFail = (state: any, action: any) => {
    return updateObject(state, {
        userInfo: null,
        loading: false,
        authenticated: false,
        token: {},
        error: action.error,
    });
};

const onClearErrorMessage = (state: any, action: any) => {
    return updateObject(state, {
        error: "",
    });
}

const onRemoveAuthentication = (state: any, action: any) => {
    return updateObject(state, {
        userInfo: null,
        loading: false,
        authenticated: false,
        token: {},
        error: "",
    });
}

const reducer = (state = initialState, action: any) => {
    switch (action.type) {
        case ActionTypes.AUTHENTICATE_USER_START: return onAuthenticateUserStart(state, action);

        case ActionTypes.AUTHENTICATE_USER_SUCCESS: return onAuthenticateUser(state, action);

        case ActionTypes.AUTHENTICATE_USER_FAIL: return onAuthenticateUserFail(state, action);

        case ActionTypes.CLEAR_ERROR_MESSAGE: return onClearErrorMessage(state, action);

        case ActionTypes.LOGOUT: return onRemoveAuthentication(state, action);

        default: return state;
    }
}

export default reducer;

