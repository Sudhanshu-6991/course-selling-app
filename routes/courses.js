const { Router } = require('express')
const coursesRouter = Router();
const { courseModel } = require('../database/db')
coursesRouter.post('/purchase',function(req,res){ 
  res.json({
    msg : `Purchase Route`
  })
})


coursesRouter.get('/preview',function(req,res){ 
  console.log('Reached preview router');

  res.json({
    msg : `preview end-point`
  })
})    

module.exports={
   coursesRouter : coursesRouter
}