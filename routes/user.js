const { Router } = require('express')
const { userModel, purchaseModel } = require('../database/db')
const bcrypt = require('bcrypt');
const jwt  = require('jsonwebtoken');
// const JWT_USER_SECRET = 'IwantToJoinMicrosoftThisYear2025';
const  { JWT_USER_SECRET } = require('../config')
const userRouter = Router();
const { z } = require('zod');
const { userMiddleware } = require('../Middleware/user');



userRouter.post('/signin',async function(req,res){
  const email = req.body.email;
  const password = req.body.password;

  const user = await userModel.findOne({
     email : email,
  })

  if(!user){
    res.json({
      msg : `User not found!`
    })
    return;
  }

  const decryptpassword =  await bcrypt.compare(password, user.password);

  if(decryptpassword){
   const token  = jwt.sign({
    id: user._id.toString()
   }, JWT_USER_SECRET);

   res.json({
    token : token
   }) 

  }else{
    res.json({
      message : 'in-correct credentials'
    })
  }
})

userRouter.post('/signup',async function(req,res){
    
    
    const requiredbody = z.object({
      email : z.string().min(3).max(70).email(),
      password : z.string().min(3).max(30).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, 'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character'),
      name : z.string().min(3).max(30)
    })

    const parsedbody = requiredbody.safeParse(req.body);
    
    if(!parsedbody.success){
       res.json({
        msg : 'Invalid format',
        error : parsedbody.error,
       }) 
       return; 
    }

    const email =  req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    
    try {
      const hashpassword = await bcrypt.hash(password, 7);
    await userModel.create({
        email : email,
        password : hashpassword,
        name : name
    })

    res.json({
        message : 'You signed up successfully'
      })
    } catch (error) {
      res.status(404).json({
         msg : 'User with this email address already exist!'
      })
    }
    

})

userRouter.get('/purchases',userMiddleware,async function(req, res){
    userid = req.userId;
    

    try {
      const allpurchasedcourses = await purchaseModel.find({
        userId : userid
      })
      if(allpurchasedcourses){
        res.json({
          allpurchasedcourses
        })
      }else{
        res.json({
          mag : `Sorry no course found!!`
        })
      }
    } catch (error) {
      res.json({
        msg : `Something went wrong!!`
      })
    }
    
})

module.exports = {
  userRouter : userRouter
}