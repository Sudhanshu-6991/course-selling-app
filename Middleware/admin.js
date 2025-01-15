const jwt = require(`jsonwebtoken`);
const { JWT_ADMIN_SECRET } = require('../config');

function adminMiddleware(req, res, next){
   const token = req.headers.token;

   const decodedtoken = jwt.verify(token, JWT_ADMIN_SECRET);

   if(decodedtoken){
      req.adminId = decodedtoken.id; 
      next();
   }else{
    res.status(403).json({
      msg : 'you are not signed in'
    })
   }
}

module.exports = {
  adminMiddleware
}