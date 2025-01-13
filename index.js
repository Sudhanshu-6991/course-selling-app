const express  = require('express');
// const bcrypt = require('bcrypt');
// const jwt  = require('jsonwebtoken');
// const {userModel, adminModel, courseModel, purchaseModel} = require('./database/db');
// const JWT_SECRET = 'IwantToJoinMicrosoftThisYear2025';
const mongoose = require('mongoose');
// const { z } = require('zod');
const { userRouter } = require('./routes/user');
const { adminRouter } = require('./routes/admin');
const { coursesRouter } = require('./routes/courses');
//mongoose.connect('mongodb+srv://sudhanshu6991:vVtBzGsTTAMTQPns@test.r3snx.mongodb.net/course-selling-app');

const app = express();
app.use(express.json());


app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/courses", coursesRouter);


async function main(){
  await mongoose.connect('mongodb+srv://sudhanshu6991:vVtBzGsTTAMTQPns@test.r3snx.mongodb.net/course-selling-app');
  app.listen(3000);
  console.log('listen to port 3000');
  
}

main();






