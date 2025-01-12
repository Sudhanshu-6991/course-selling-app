//const express = require('express')
const { Router } = require('express')

const adminRouter = Router();
adminRouter.post('/signin',function(req,res){  
})

adminRouter.post('/signup',function(req,res){ 
})

adminRouter.post('/create_course',function(req,res){ 
})

adminRouter.post('/delete_course',function(req,res){ 
})

adminRouter.post('/add_course_content',function(req,res){
})

module.exports = {
  adminRouter : adminRouter
}