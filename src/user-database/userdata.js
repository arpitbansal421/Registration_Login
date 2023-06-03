const mongoose = require('mongoose');

const bcrypt=require('bcryptjs');
const user_schema=new mongoose.Schema({

   FullName:{
    type:String,
    required:true,
    lowercase:true,

   },

   email:{
    type:String,
    required:true,
    unique:true,
    
   },
   phone:{

    type:Number,
    required:true,
    unique:true
   },
   password:{
    type:String,
    required:true
   },

   confirm_password:{
      type:String,
      required:true,


   }




})

user_schema.pre('save',async function(next){
   this.password=await bcrypt.hash(this.password,12);
   this.confirm_password=await bcrypt.hash(this.password,12);

})

const user_collection1=new mongoose.model('users_collection1',user_schema);
module.exports=user_collection1;