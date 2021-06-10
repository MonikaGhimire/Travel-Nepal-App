import "@babel/polyfill";
import { returnErrorResponse, returnResponse } from './util/ApiGatewayUtil';
import { handleSignup, handleLogin, handleGetUser, handleUpdateUser, handleDeleteUser } from './controller/handler';

export const handler = async (event, context, callback) => {

  const path = event.path;
  const method = event.httpMethod;

  if (path === '/api/signup' && method === 'POST') {
    return handleSignup(event, context, callback);
  } else if (path === '/api/login' && method === 'POST') {
    return handleLogin(event, context, callback);
  } else {
    return returnErrorResponse(callback, 404, 'Resource not found');
  }
};
