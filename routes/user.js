const { Router } = require('express')


const userRouter = Router();

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

  const decryptpassword =  await bcrypt.compare(user.password, password);

  if(decryptpassword){
   const token  = jwt.sign({
    id: user._id.toString()
   }, JWT_SECRET);

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
        msg : 'Invalid format'
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

userRouter.get('/purchases', function(ewq, res){
    res.json({
      msg : 'This is purchase end point'
    })
})

module.exports = {
  userRouter : userRouter
}