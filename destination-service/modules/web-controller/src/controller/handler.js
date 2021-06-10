import { returnErrorResponse, returnResponse } from '../util/ApiGatewayUtil';
import { addDestination, getDestination, patchImageUrls, deleteDestination, searchDestinations } from '../service/DestinationService';
import { addReview, getReviewsForADestination } from '../service/ReviewService';

export const handleAddDestination = async (event, context, callback) => {

    if (!event.body) {
        return returnErrorResponse(callback, 400, 'Destination is not provided');
    }

    const destination = JSON.parse(event.body);
    if (!destination.location) {
        return returnErrorResponse(callback, 400, 'Location must be specified');
    }

    const location = destination.location;
    if (!location.name || !location.longitude || !location.latitude) {
        return returnErrorResponse(callback, 400, 'Location name, longitude and latitude must be specified');
    }

    if (destination.imageUrls && !Array.isArray(destination.imageUrls)) {
        return returnErrorResponse(callback, 400, 'Valid imageUrls must be specified');
    }

    try {
        await addDestination(destination);
        destination.imageUrls = destination.imageUrls.urls;
        return returnResponse(callback, 201, destination);
    } catch (error) {
        return returnErrorResponse(callback, 500, 'An error occurred while adding destination. Error: ' + error);
    }
};

export const handleGetDestination = async (event, context, callback) => {
    try {
        const response = await getDestination(event.pathParameters.destinationId);
        return returnResponse(callback, 200, response);
    } catch (error) {
        return returnErrorResponse(callback, 500, 'An error occurred. Error: ' + error);
    }
};

export const handlePatchDestination = async (event, context, callback) => {

    if (!event.body) {
        return returnErrorResponse(callback, 400, 'Request body not provided');
    }

    const destination = JSON.parse(event.body);
    if (!destination.uuid || event.pathParameters.destinationId !== destination.uuid) {
        return returnErrorResponse(callback, 400, 'valid uuid must be specified');
    }

    if (!destination.imageUrls || !Array.isArray(destination.imageUrls)) {
        return returnErrorResponse(callback, 400, 'Valid imageUrls must be specified');
    }

    try {
        await patchImageUrls(destination);
        return returnResponse(callback, 200, { message: 'Successful' });
    } catch (error) {
        return returnErrorResponse(callback, 500, 'An error occurred while updating imageUrls. Error: ' + error);
    }
};

export const handleDeleteDestination = async (event, context, callback) => {
    try {
        await deleteDestination(event.pathParameters.destinationId);
        return returnResponse(callback, 204);
    } catch (error) {
        return returnErrorResponse(callback, 500, 'An error occurred while deleting destination. Error: ' + error);
    }
};

export const handleSearch = async (event, context, callback) => {
    const queryParams = event.queryStringParameters;

    try {
        const response = await searchDestinations(queryParams ? queryParams.q : null);
        return returnResponse(callback, 200, response);
    } catch (error) {
        return returnErrorResponse(callback, 500, 'An error occurred while searching destination. Error: ' + error);
    }
};

export const handleAddReview = async (event, context, callback, decodedToken) => {
    if (!event.body) {
        return returnErrorResponse(callback, 400, 'Review not provided');
    }

    const review = JSON.parse(event.body);
    if (!review.rating || !review.userId || !review.destinationId) {
        return returnErrorResponse(callback, 400, 'Rating, userId and destinationId are mandatory fields');
    }

    review.userFullName = decodedToken.name;

    try {
        await addReview(review);
        return returnResponse(callback, 201, review);
    } catch (error) {
        return returnErrorResponse(callback, 500, 'An error occurred while adding review. Error: ' + error);
    }
};

export const handleGetReviews = async (event, context, callback) => {
    const queryParams = event.queryStringParameters;

    if (!queryParams || !queryParams.destinationId) {
        return returnErrorResponse(callback, 400, 'destinationId should be specified in query parameter');
    }

    try {
        const response = await getReviewsForADestination(queryParams.destinationId);
        return returnResponse(callback, 200, response);
    } catch (error) {
        return returnErrorResponse(callback, 500, 'An error occurred while fetching reviews. Error: ' + error);
    }
};

export const handleOptionsRequest = (event, context, callback) => {
    return returnResponse(callback, 200, { status: 'OK' });
};