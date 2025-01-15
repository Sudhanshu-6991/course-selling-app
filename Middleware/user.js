const jwt = require(`jsonwebtoken`);
const { JWT_USER_SECRET } = require('../config');

function userMiddleware(req, res, next){
   const token = req.headers.token;

   const decodedtoken = jwt.verify(token, JWT_USER_SECRET);

   if(decodedtoken){
      req.userId = decodedtoken.id; 
      next();
   }else{
    res.status(403).json({
      msg : 'you are not signed in'
    })
   }
}