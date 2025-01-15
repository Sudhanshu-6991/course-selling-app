//const express = require('express')
const { Router, json } = require('express')
const { adminModel, courseModel } = require('../database/db');
const { adminMiddleware } = require('../Middleware/admin');
const jwt = require('jsonwebtoken');
// const JWT_ADMIN_SECRET = 'IloveNisha&Ireallywannamarryher';
const { JWT_ADMIN_SECRET } = require(`../config`);
const adminRouter = Router();
const { z } = require('zod');
const bcrypt = require('bcrypt');

adminRouter.post('/signin',async function(req,res){
  const email = req.body.email;
  const password = req.body.password;

  const admin = await adminModel.findOne({
     email : email,
  })

  if(!admin){
    res.json({
      msg : `Admin not found!`
    })
    return;
  }

  const decryptpassword =  await bcrypt.compare(password, admin.password);
   console.log(decryptpassword);
   console.log("DB pass : "+ admin.password);
   console.log("admin pass : "+ req.body.password);
   
  if(decryptpassword){
   const token  = jwt.sign({
    id: admin._id.toString()
   }, JWT_ADMIN_SECRET);

   res.json({
    token : token
   }) 

  }else{
    res.json({
      message : 'in-correct credentials'
    })
  }
})

adminRouter.post('/signup',async function(req,res){ 
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
    const hashpassword = await bcrypt.hash(password, 5);
  await adminModel.create({
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

adminRouter.post('/create_course',adminMiddleware,async function(req,res){ 
  const adminId = req.adminId;
  const { topic, price, description } = req.body;
  try {
    const course = await courseModel.create({
      topic,
      price,
      description,
      creatorId:adminId
    })
    
    res.json({
      msg : "course created successfully",
      course_id : course._id
    })  
  } catch (error) {
     res.json({
      msg : 'error found while creating the course'
     })
  }
  
})

adminRouter.put('/update_course',adminMiddleware,async function(req,res){
  const adminId = req.adminId;
  const foundcourse = await courseModel.findOne({
    creatorId : adminId
  })
  try {
    if(foundcourse){
      const { topic, price, description } = req.body;
      await courseModel.updateOne({
        topic,
        price,
        description,
      })
    }else{
      res.json({
        msg : `course not updated`
      })
    }  
  } catch (error) {
  res.json({
    msg : 'something went wrong'
  })
  }
  
  
})

adminRouter.post('/add_course_content',function(req,res){
})

module.exports = {
  adminRouter : adminRouter
}