const express=require('express');
const app=express();
const bodyparser=require('body-parser');
const path=require('path');

const bcrypt=require('bcryptjs');



require('./user-database/moongoose_conn');


app.use(bodyparser.urlencoded({
    extended:true
}))


app.use(express.json());



const port=8000;

// const user1_collection=require('./user-database/userdata');
const user_collection1 = require('./user-database/userdata');
let mainfolder=path.join(__dirname,'../');

app.use(express.static(mainfolder));
app.get('/',(req,res)=>{
    console.log(__dirname);
    console.log(mainfolder);
    res.send("home page");
    
})

app.get('/register',(req,res)=>{

    res.sendFile(mainfolder+"/register.html");
})

app.get('/login',(req,res)=>{

    res.sendFile(mainfolder+"/login.html");
})


app.post("/register", async (req,res)=>{
    
    try{

      

        // const name=await req.body.FullName;
        // console.log(name);
        // console.log(req.body);

        

        
        let user_data=await new user_collection1(req.body);

        if(user_data.password==user_data.confirm_password){

            let save_d=await user_data.save();
        // console.log(user_data.password);
        // console.log(user_data.confirm_password);
        
        res.status(201).send(save_d);}else{
            res.send('Passwords do not match');
        }

    }catch(e){
        console.log('error occured in the post request');
        res.status(400).send("Error in the file");
    }
});

app.post("/login",async(req,res)=>{
    //res.send("logged in");
    let usermail=req.body.email;
    let userpassword=req.body.password;
    //let mykey_password=await hashedpassword(userpassword);
    //console.log(mykey_password);

    let userdata=await user_collection1.findOne({email:usermail});

    if(userdata!=null){
        const bcrypt_password_match=await bcrypt.compare(userpassword,userdata.password);
        
        console.log(bcrypt_password_match);

        // res.send("email exits");
        if(bcrypt_password_match){
            res.send('Successfully loged in ');
        }

    }else{
        res.send("Incorrect password ");;
    }

    





})




app.listen(port,(req,res)=>{
    // console.log(`We are listening at ${port}`)

    console.log(`We are listening at port ${port}`);


})


