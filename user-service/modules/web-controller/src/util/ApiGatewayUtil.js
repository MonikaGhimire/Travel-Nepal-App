export const returnErrorResponse = (callback, statusCode, message) => {
    return returnResponse(callback, statusCode, {message: message});
};

export const returnResponse = (callback, statusCode, body) => {
    return callback(null, {
      statusCode: statusCode,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify(body)
    });
  };