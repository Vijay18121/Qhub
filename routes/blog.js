const router = require("express").Router();
const {Blog} = require("../models/Blog");
const authVerify = require("../helpers/authVerify");
const nodemailer = require('nodemailer');
require("dotenv").config();



const transporter = nodemailer.createTransport({
  service:'gmail',
  port: 465,
  host: "smtp.gmail.com",
  auth: {
      
      user: process.env.EMAIL ,
      pass: process.env.PASSWORD ,
  },
  secure: true, 
});



router

.get("/", async (req, res) => {
 
  const allBlogs = await Blog.find();
  const userInfo =req.cookies;
 
  res.render("index", { blogs: allBlogs ,token: userInfo.Username });
})

 
  .get("/blog/:id", async (req, res) => {
    const { id } = req.params;
    const getBlog = await Blog.findOne({ _id: id }); 
    const userInfo =req.cookies;
    res.render("particularBlog", { blog: getBlog ,token: userInfo.Username});
  })

  .get("/delete/:id", authVerify,async(req, res) => {
    const { id } = req.params;
    const getData = await Blog.findOne({ _id: id });
    const userInfo =req.cookies;
    if(getData.creator==userInfo.Username)  
     {Blog.deleteOne({ _id: id })
      .then(() => {
        console.log("Deleted blog successfully!");
        res.redirect("/");
      })
      .catch((err) => console.log(err));}
    else  res.write("<script> alert('Access Denied!!'); window.location.href = '/';</script>");

  })

  .get("/edit/:id",authVerify, async (req, res) => {
    const { id } = req.params;
   
    const getData = await Blog.findOne({ _id: id });
    
    const userInfo =req.cookies;
    if(getData.creator==userInfo.Username) res.render("editBlog", { blog: getData ,token: userInfo.Username });
    else  res.write("<script> alert('Access Denied!!'); window.location.href = '/';</script>");
  })


  .post("/edit/:id", (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    
    Blog.updateOne({ _id: id }, { title, content })
      .then(() => {
        console.log("successfully! updated the blog!");
        res.redirect("/");
      })
      .catch((err) => console.log(err));
  })
  
  .get("/reply/:id",authVerify, async (req, res) => {
    const { id } = req.params;
    const getBlog = await Blog.findOne({ _id: id });
    const userInfo =req.cookies;
    res.render("replyBlog", { blog: getBlog ,token: userInfo.Username });
     
  })

  .post("/reply/:id", async (req, res) => {
   const {id } = req.params;
   const userInfo =req.cookies;
  
   const obj={ ansBy:userInfo.Username, answer:req.body.content};

   Blog.updateOne({ _id: id },{$push: { ans:obj }}
    ).then(() => {
      console.log("successfully! Added our Answer!");
      res.redirect("/");
    })
    .catch((err) => console.log(err));
  })
  


  .get("/search", (req, res) => {
    
    const getData = Blog.findOne({title: "Google" })
      .then(() => {
        const userInfo =req.cookies;
        res.render("particularBlog", { blog: getData,token: userInfo.Username});
        console.log("Found successfully!");
       
      })
      .catch((err) => console.log(err));
   
    })

    .get('/About', function(req, res, next) { const userInfo =req.cookies;
      res.render('About', { token: userInfo.Username}); 
      
 })

    .get('/Contact', function(req, res, next) { const userInfo =req.cookies;
      res.render('Contact', { token: userInfo.Username}); 
      
 })

 
 .post('/Contact', (req, res) => {
  const {name,subject,email, text } = req.body;
  const content= "From : "+email+"\nName : "+name+"\nSubject : "+subject+"\nBody : "+ text;
  const mailData = {
      from: email,
      to: process.env.EMAIL,
      subject: subject,
      text: content,
     
  };

  transporter.sendMail(mailData, (error, info) => {
      if (error) {
          return console.log(error);
      }
     
      res.write("<script>alert(' Mail Successfully Sent! \\n \\n Thanks For Your Feedback!'); window.location.href = '/Contact'; </script>");
    
  });
})

;
  




module.exports = router;
