import * as ActionTypes from './ActionTypes';

export const authenticateUsersStart = () => {
    return {
        type: ActionTypes.AUTHENTICATE_USER_START
    };
};

export const authenticateUserSuccess = (token: any) => {
    return {
        type: ActionTypes.AUTHENTICATE_USER_SUCCESS,
        token,
    };
};

export const authenticateUsers = (user: any) => {
    return {
        type: ActionTypes.AUTHENTICATE_USER,
        user,
    };
};

export const authenticateUsersFail = (errorMessage: string) => {
    return {
        type: ActionTypes.AUTHENTICATE_USER_FAIL,
        error: errorMessage
    };
};

export const clearErrorMessage = () => {
    return {
        type: ActionTypes.CLEAR_ERROR_MESSAGE,
    }
}

export const clearAuthentication = () => {
    return {
        type: ActionTypes.LOGOUT,
    }
}
