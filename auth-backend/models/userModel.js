import mongoose from "mongoose";

const UserSchema=new mongoose.Schema({
  name:{
    type:String,
    required:true,
  },
  email:{
    type:String,
    required:true,
    unique:true,
  },
  avatar:{
    type:String,
  

  }
,
phoneNumber:{
  type:String,
  
},
password:{
  type:String,
  
}

},{timestamps:true});

const User=new mongoose.model('user',UserSchema);
export default User;