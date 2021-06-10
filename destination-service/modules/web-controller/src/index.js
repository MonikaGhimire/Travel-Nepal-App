import "@babel/polyfill";
import { returnErrorResponse, returnResponse } from './util/ApiGatewayUtil';
import { handleAddDestination, handleGetDestination, handlePatchDestination, handleDeleteDestination, handleSearch, handleAddReview, handleGetReviews } from './controller/handler';
import { verifyToken } from './service/TokenService'

export const handler = async (event, context, callback) => {

  const path = event.path;
  const method = event.httpMethod;
  const headers = event.headers;

  if (path.startsWith('/api/destinations/search') && method === 'GET') {
    return handleSearch(event, context, callback);
  } else if (path.startsWith('/api/destinations/reviews') && method === 'GET') {
    return handleGetReviews(event, context, callback);
  } else if (path.startsWith('/api/destinations/') && method === 'GET') {
    return handleGetDestination(event, context, callback);
  }

  const token = getBearerToken(headers);
  let decodedToken = {};

  try {
    decodedToken = verifyToken(token);
  } catch (error) {
    return returnErrorResponse(callback, 401, "Unauthorized");
  }

  if (path === '/api/destinations' && method === 'POST') {
    return handleAddDestination(event, context, callback);
  } else if (path.startsWith('/api/destinations/') && method === 'PATCH') {
    return handlePatchDestination(event, context, callback);
  } else if (path.startsWith('/api/destinations/') && method === 'DELETE') {
    return handleDeleteDestination(event, context, callback);
  } else if (path.startsWith('/api/destinations/reviews') && method === 'POST') {
    return handleAddReview(event, context, callback, decodedToken);
  } else {
    return returnErrorResponse(callback, 404, 'Resource not found');
  }
};

const getBearerToken = (headers) => {
  const authHeader = headers.Authorization;
  return authHeader ? authHeader.replace('Bearer ', '') : authHeader;
}
