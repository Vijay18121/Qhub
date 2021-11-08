const router = require("express").Router();
const {Blog,User} = require("../models/Blog");
const {tokenGenerator} =require ('../helpers/token' );

router

.get('/register', function(req, res, next) { 
    res.render('register'); 
    
  })
  
  .post('/register', (req, res) => {
    const {Username ,Password,password2}  = req.body;
       
    User.findOne({Username},(err,a) => {
    
      if(a)
       {   res.write("<script>alert('Username Already Exist!!'); window.location.href = '/register'; </script>");
        }

    else 
     {
          const newUser = new User({Username ,Password});

              newUser
              .save()
              .then(() => {
               
                console.log("User registered Successfully!");
                res.write("<script>alert('Registered Successfully!!'); window.location.href = '/login'; </script>");
              })
              .catch((err) => console.log(err));
            }
      });

    })
    
    .get('/login', function(req, res) { 
      res.render('login'); 
      
 })
 
   .post('/login',async (req, res)=>{
 
     const  name = req.body.Username;
     const  password = req.body.password;
 
    User.findOne({Username: name},async(err,a) => {
     
     if(!err && a)
      {            
          console.log("User Found!"); 
       
       if(a.Password!=password) res.write("<script>alert('Invalid Username/Password'); window.location.href = '/login'; </script>");
        else
         { const allBlogs = await Blog.find();
      
          
     const token = await tokenGenerator(a.Username);   

      res.cookie('token',token);
      res.cookie('Username',a.Username);
   
      res.render("index",{ blogs: allBlogs ,token:a.Username});}
       }
 
 
      else res.write("<script>alert('Invalid Username/Password'); window.location.href = '/login'; </script>");
   });
      
 })

 .get("/logout", (req, res) => {

  res.clearCookie('token');
  res.clearCookie('Username');
  res.write("<script>alert('Logout!!'); window.location.href = '/'; </script>");
});
    



  module.exports = router;
