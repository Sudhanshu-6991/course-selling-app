const { Router } = require('express')
const coursesRouter = Router();
const { userMiddleware } = require('../Middleware/user');
const { courseModel } = require('../database/db')
coursesRouter.post('/purchase',userMiddleware, async function(req,res){ 
    
      userID = req.userID;
      courseID = req.body.courseID;

      try {
        await courseModel.create({
          userID,
          courseID
        })
        res.json({
          msg : 'Sucessfully purchased the course!'
        })
      } catch (error) {
        res.json({
          msg : 'Something went wrong!'
        })
      }

   

  
})


coursesRouter.get('/preview',async function(req,res){ 
  
   
  const usercourses = await courseModel.find({})  

  try {
    if(usercourses){
      res.json({
        msg : 'All courses fetched',
        usercourses
      })
    }else{
      res.json({
        msg : 'No course found',
             })
    }
  } catch (error) {
    res.json({
      msg : 'Something went wrong!!'
    })
  }
  
})    

module.exports={
   coursesRouter : coursesRouter
}