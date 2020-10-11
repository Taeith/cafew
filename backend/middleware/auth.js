const jsonWebToken = require('jsonwebtoken');

module.exports = (request, response, next) => {
console.log('try to auth');  
  try {
    const token = request.headers.authorization.split(" ")[1];
    console.log('token = ' + token);
    const decodedToken = jsonWebToken.verify(token, 'RANDOM_TOKEN_SECRET');
    console.log('decodedToken = ' + decodedToken);
    const userId = decodedToken.userId;
    console.log('userId = ' + userId);
    if (request.body.userId && request.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      console.log('next');
      next();
    }
  } catch {
    console.log('bug');
    response.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};