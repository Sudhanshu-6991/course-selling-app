const mongoose = require('mongoose')
//await mongoose.connect('mongodb+srv://sudhanshu6991:vVtBzGsTTAMTQPns@test.r3snx.mongodb.net/course-selling-app');
const schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;


const user = new schema({
  email : {type : String, unique : true},
  password : String,
  name :String
})

const admin = new schema({
  email : {type : String, unique : true},
  password : String,
  name : String
})

const course = new schema({
  topic : String,
  price : Number,
  description : String,
  creatorId : ObjectId,
  imageurl : String
})

const purchase = new schema({   
  courseId : ObjectId,
  userId : ObjectId
})



const userModel = mongoose.model('users',user);
const adminModel = mongoose.model('admins',admin);
const courseModel = mongoose.model('courses',course);
const purchaseModel = mongoose.model('purchases',purchase);

module.exports = {
  userModel : userModel,
  adminModel : adminModel,
  courseModel : courseModel,
  purchaseModel : purchaseModel
}
