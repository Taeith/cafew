const jsonWebToken = require('jsonwebtoken');

module.exports = (request, response, next) => {
  try {
    console.log('[OPEN] SECURITY');
    const token = request.headers.authorization.split(" ")[1];
    const decodedToken = jsonWebToken.verify(token, 'RANDOM_TOKEN_SECRET');
    const tokenUserId = decodedToken.userId;
    console.log('[INFO] Check User ID <' + request.params.id + ', ' + tokenUserId + '>');
    if (request.params.id == tokenUserId) {
      console.log('[SUCCESS] User ID VALID');
      next();
    } else {
      throw 'Invalid user ID';
    }
  } catch {
    console.log('[ERROR] User ID NOT VALID');
    response.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};