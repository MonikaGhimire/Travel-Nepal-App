import { loginUser, signupUser } from '../service/UserService';
import { returnErrorResponse, returnResponse } from '../util/ApiGatewayUtil';
import { getUuid } from '../util/util';

export const handleSignup = async (event, context, callback) => {

    const body = JSON.parse(event.body);
    const userId = getUuid();

    const user = {
        id: userId,
        name: body.name,
        email: body.email,
        password: body.password,
        role: 'USER'
    };

    try {
        const emailCheckResponse = await signupUser({ id: body.email });
    } catch (error) {
        return returnErrorResponse(callback, 400, 'Invalid or already used email specified');
    }

    try {
        const signupResponse = await signupUser(user);
        delete user.password;
        return returnResponse(callback, 201, user);
    } catch (error) {
        console.log(error);
        return returnErrorResponse(callback, 500, 'Signup failed');
    }
};

export const handleLogin = async (event, context, callback) => {

    const body = JSON.parse(event.body);

    if (!body || !body.email || !body.password) {
        return returnErrorResponse(callback, 400, 'Email and password required');
    }

    try {
        const loginResult = await loginUser(body.email, body.password);
        return returnResponse(callback, 200, loginResult);
    } catch (error) {
        return returnErrorResponse(callback, 401, 'Login failed');
    }
};

export const handleGetUser = (event, context, callback) => {

};

export const handleUpdateUser = (event, context, callback) => {

};

export const handleDeleteUser = (event, context, callback) => {

};