const jwt = require('jsonwebtoken')

function authorize(allowedRoles) {
  return (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization
    const token = authHeader?.split(' ')[1]

    const userRole = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET).role


      if (allowedRoles.includes(userRole)) {
        next();
      } else {
        res.status(403).json({ error: 'Forbidden' });
        
      }
    };
  }

  module.exports = { authorize };
  