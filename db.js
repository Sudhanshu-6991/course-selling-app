const mongoose = require('mongoose')
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
  teacher : String,
  ObjectId : ObjectId
})


const userModel = mongoose.model('users',user);
const adminModel = mongoose.model('admins',admin);
const courseModel = mongoose.model('courses',course);

module.exports = {
  userModel : userModel,
  adminModel : adminModel,
  courseModel : courseModel
}
