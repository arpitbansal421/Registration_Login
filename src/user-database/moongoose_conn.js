const mongoose=require('mongoose')
const user_collection1=require('./userdata');
mongoose.connect("mongodb://127.0.0.1:27017/myuserdata",{useNewUrlParser:true,


useUnifiedTopology:true}).then(()=>console.log("Collection is successful for database")).
catch((err)=>console.log("No connections"));