const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
 
  ans: [{ ansBy: String, answer: String , time:{
    type: String,
    default: Date,
  }, }],

  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  postedAt: {
    type: String,
    default: Date,
  },

  creator: {
    type: String,
    
  },
 
});

const UserSchema = new mongoose.Schema({
 
  Username:  {
    type: String,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  },
  
   Token: {
    type: String,
   
  },
 
});


const User = new mongoose.model("User", UserSchema);
const Blog = new mongoose.model("Blog", BlogSchema);



module.exports = {
   Blog, User 
};